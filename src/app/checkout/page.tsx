'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { isValidBrazilianPhone } from '@/lib/commerce';

const emptyAddress = {
  name: '',
  phone: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  reference: '',
  notes: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user, cart, cartSubtotal, getProductById, clearCart } = useStore();
  const [address, setAddress] = useState(emptyAddress);
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    const loadAddresses = async () => {
      try {
        const response = await fetch('/api/addresses', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setSavedAddresses(data.addresses || []);
        }
      } catch {
        // ignore when no saved addresses exist.
      }
    };

    loadAddresses();
  }, [router, user]);

  const shipping = cartSubtotal > 0 ? 25 : 0;
  const total = cartSubtotal + shipping;

  async function handleCepLookup() {
    const cep = address.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      setMessage('Informe um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setMessage('CEP não encontrado. Verifique o número e tente novamente.');
        return;
      }

      setAddress((current) => ({
        ...current,
        street: data.logradouro || current.street,
        district: data.bairro || current.district,
        city: data.localidade || current.city,
        state: data.uf || current.state,
      }));
      setMessage('CEP preenchido automaticamente. Revise os campos antes de concluir.');
    } catch {
      setMessage('Não foi possível consultar o CEP no momento.');
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    const requiredFields = ['name', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state'];
    const missing = requiredFields.filter((field) => !String((address as any)[field]).trim());

    if (missing.length > 0 || !isValidBrazilianPhone(address.phone)) {
      setMessage('Preencha os dados obrigatórios do endereço e informe um telefone válido.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const payload = {
        paymentMethod,
        notes: address.notes,
        items: cart.map((item) => {
          const product = getProductById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: product?.price || 0,
          };
        }),
        address,
      };

      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
      }

      const paymentResponse = await fetch('/api/checkout/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderId: data.order.id }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Pagamento não confirmado.');
      }

      clearCart();
      router.push(`/pedido-confirmado?orderId=${data.order.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível processar o pedido.');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Checkout</p>
        <h1 className="text-4xl text-brown">Finalize sua compra</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <div>
            <h2 className="mb-4 text-2xl text-brown">1. Dados de entrega</h2>
            {savedAddresses.length > 0 && (
              <div className="mb-4 space-y-2">
                {savedAddresses.map((entry) => (
                  <button key={entry.id} type="button" onClick={() => setAddress({ ...entry })} className="flex w-full items-center justify-between rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 text-left text-sm text-[#43383A]">
                    <span>{entry.street}, {entry.number} - {entry.city}/{entry.state}</span>
                    <span className="text-xs uppercase tracking-[0.14em] text-wine">{entry.isMain ? 'Principal' : 'Salvar'}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <input value={address.name} onChange={(event) => setAddress((current) => ({ ...current, name: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Nome do destinatário" />
              <input value={address.phone} onChange={(event) => setAddress((current) => ({ ...current, phone: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Telefone de contato" />
            </div>

            <div className="mt-4 flex gap-3">
              <input value={address.cep} onChange={(event) => setAddress((current) => ({ ...current, cep: event.target.value }))} className="flex-1 rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="CEP" />
              <button type="button" onClick={handleCepLookup} className="rounded-full bg-[#EDE2D0] px-5 py-3 text-sm font-semibold text-brown">Buscar CEP</button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input value={address.street} onChange={(event) => setAddress((current) => ({ ...current, street: event.target.value }))} className="md:col-span-2 rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Rua / Logradouro" />
              <input value={address.number} onChange={(event) => setAddress((current) => ({ ...current, number: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Número" />
              <input value={address.complement} onChange={(event) => setAddress((current) => ({ ...current, complement: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Complemento" />
              <input value={address.district} onChange={(event) => setAddress((current) => ({ ...current, district: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Bairro" />
              <input value={address.city} onChange={(event) => setAddress((current) => ({ ...current, city: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Cidade" />
              <input value={address.state} onChange={(event) => setAddress((current) => ({ ...current, state: event.target.value }))} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Estado" />
              <input value={address.reference} onChange={(event) => setAddress((current) => ({ ...current, reference: event.target.value }))} className="md:col-span-2 rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Ponto de referência" />
              <textarea value={address.notes} onChange={(event) => setAddress((current) => ({ ...current, notes: event.target.value }))} className="md:col-span-2 min-h-[110px] rounded-[24px] border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Mensagem para acompanhar as flores" />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl text-brown">2. Pagamento</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3"><input type="radio" name="payment" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} /> PIX</label>
              <label className="flex items-center gap-3"><input type="radio" name="payment" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} /> Cartão de crédito</label>
              <label className="flex items-center gap-3"><input type="radio" name="payment" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} /> Cartão de débito</label>
            </div>
          </div>

          {message && <p className="rounded-2xl bg-[#EDE2D0] px-3 py-2 text-sm text-[#682C40]">{message}</p>}

          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-wine px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Processando...' : 'Confirmar pedido'}</button>
        </form>

        <aside className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Resumo do pedido</h2>
          <div className="mt-5 space-y-4">
            {cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div key={item.productId} className="flex items-center justify-between gap-3 text-sm text-[#43383A]">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <p>{product.name}</p>
                      <p className="text-xs text-[#43383A]">Qtde: {item.quantity}</p>
                    </div>
                  </div>
                  <span>{formatPrice(product.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-3 text-sm text-[#43383A] border-t border-[#EDE2D0] pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
            <div className="flex justify-between"><span>Frete</span><span>{formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-semibold text-brown"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>

          <div className="mt-6 rounded-[22px] bg-[#FAF8F3] p-4 text-sm text-[#43383A]">
            <p className="font-semibold text-brown">Entrega</p>
            <p className="mt-2">{address.street || 'Endereço ainda não informado'}</p>
            <p>{address.city || 'Cidade'} / {address.state || 'Estado'}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
