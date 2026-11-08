'use client';

import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, user, updateCartQuantity, removeFromCart, cartSubtotal } = useStore();
  const subtotal = cartSubtotal;
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  function handleCheckout() {
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  }

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Carrinho</p>
        <h1 className="text-4xl text-brown">Seu pedido</h1>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-[30px] border border-[#f1e2df] bg-white p-10 text-center shadow-soft">
          <p className="text-lg text-[#5d4b4a]">Seu carrinho está vazio.</p>
          <Link href="/catalogo" className="mt-5 inline-flex rounded-full bg-brown px-6 py-3 text-sm font-semibold text-white">Continuar comprando</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            {cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="flex flex-col gap-4 rounded-[28px] border border-[#f3e7e3] bg-white p-5 shadow-soft sm:flex-row">
                  <div className="relative h-28 w-full overflow-hidden rounded-[20px] sm:w-28">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-wine">{product.category}</p>
                      <h2 className="mt-2 text-xl text-brown">{product.name}</h2>
                      <p className="mt-2 text-sm text-[#6b504e]">{formatPrice(product.price)} un.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center overflow-hidden rounded-full border border-[#f1e2df] bg-[#fffaf8]">
                        <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="px-3 py-2"><Minus className="h-4 w-4" /></button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="px-3 py-2"><Plus className="h-4 w-4" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.productId)} className="rounded-full border border-[#f2e3df] p-2.5 text-[#7d434d]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="rounded-[30px] border border-[#f1e2df] bg-white p-6 shadow-soft">
            <h2 className="text-2xl text-brown">Resumo</h2>
            <div className="mt-6 space-y-4 text-sm text-[#5d4b4a]">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Frete</span><span>{formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span>Desconto</span><span>- {formatPrice(0)}</span></div>
              <div className="border-t border-[#f1e2df] pt-4 text-base font-semibold text-brown">
                <div className="flex justify-between"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
            <button onClick={handleCheckout} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brown px-5 py-3.5 text-sm font-semibold text-white">Prosseguir para o checkout</button>
            <Link href="/catalogo" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#f1e2df] px-5 py-3 text-sm font-medium text-brown">Continuar comprando</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
