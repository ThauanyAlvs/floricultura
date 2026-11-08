import { NextRequest, NextResponse } from 'next/server';
import { readSessionUserId } from '@/lib/auth';
import { readStore, writeStore } from '@/lib/store';
import { computeCartSummary } from '@/lib/commerce';

export async function POST(request: NextRequest) {
  const userId = readSessionUserId(request.headers.get('cookie'));
  if (!userId) {
    return NextResponse.json({ error: 'Autenticação obrigatória para finalizar a compra.' }, { status: 401 });
  }

  const payload = await request.json();
  const address = payload.address || {};
  const items = Array.isArray(payload.items) ? payload.items : [];

  const required = ['name', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state'];
  const missing = required.filter((field) => !String(address[field] || '').trim());

  if (missing.length > 0 || items.length === 0) {
    return NextResponse.json({ error: 'Dados de entrega incompletos ou carrinho vazio.', missing }, { status: 400 });
  }

  const summary = computeCartSummary(items.map((item: { productId: string; quantity: number; unitPrice: number }) => ({
    productId: item.productId,
    quantity: Number(item.quantity || 0),
    unitPrice: Number(item.unitPrice || 0),
  })));

  const store = await readStore();
  const order = {
    id: `PEACH-${Date.now()}`,
    userId,
    status: 'pending_payment',
    createdAt: new Date().toISOString(),
    items,
    address,
    subtotal: summary.subtotal,
    shipping: summary.shipping,
    total: summary.total,
    paymentMethod: payload.paymentMethod || 'pix',
    notes: payload.notes || '',
  };

  store.orders.push(order);
  await writeStore(store);

  return NextResponse.json({ success: true, order });
}

