'use client';

import { useEffect, useState } from 'react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch('/api/account', { credentials: 'include' });
        if (!response.ok) return;
        const data = await response.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      }
    }

    loadOrders();
  }, []);

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Meus pedidos</p>
        <h1 className="text-4xl text-brown">Histórico de compras</h1>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#EDE2D0] bg-white shadow-soft">
        <table className="w-full text-left text-sm text-[#43383A]">
          <thead className="bg-[#FAF8F3] text-[#43383A]">
            <tr>
              <th className="px-5 py-4">Pedido</th>
              <th className="px-5 py-4">Data</th>
              <th className="px-5 py-4">Valor</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-[#43383A]">Ainda não há pedidos registrados.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-[#EDE2D0]">
                  <td className="px-5 py-4 font-medium text-brown">{order.id}</td>
                  <td className="px-5 py-4">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-5 py-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total || 0)}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-peach/30 px-2.5 py-1 text-xs font-semibold text-brown">{order.status}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
