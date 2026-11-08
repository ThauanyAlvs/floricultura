'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'PEACH-2026-1482';

  return (
    <div className="container-shell py-20">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-[#EDE2D0] bg-white p-10 text-center shadow-soft">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Pedido confirmado</p>
        <h1 className="text-4xl text-brown">Sua compra foi registrada com sucesso.</h1>
        <div className="mt-6 rounded-[24px] bg-[#FAF8F3] p-6 text-left">
          <p className="text-sm text-[#43383A]">Número do pedido</p>
          <p className="mt-2 text-2xl font-semibold text-brown">{orderId}</p>
          <p className="mt-4 text-sm text-[#43383A]">Status: pagamento confirmado</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/meus-pedidos" className="rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white">Acompanhar pedido</Link>
          <Link href="/catalogo" className="rounded-full border border-[#EDE2D0] px-6 py-3 text-sm font-medium text-brown">Continuar comprando</Link>
        </div>
      </div>
    </div>
  );
}
