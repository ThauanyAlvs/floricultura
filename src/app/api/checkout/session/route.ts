import { NextRequest, NextResponse } from 'next/server';
import { readSessionUserId } from '@/lib/auth';
import { readStore, writeStore } from '@/lib/store';

export async function GET(request: NextRequest) {
  const userId = readSessionUserId(request.headers.get('cookie'));
  if (!userId) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const store = await readStore();
  return NextResponse.json({ addresses: store.addresses.filter((entry) => entry.userId === userId) });
}

export async function POST(request: NextRequest) {
  const userId = readSessionUserId(request.headers.get('cookie'));
  if (!userId) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const payload = await request.json();
  const required = ['name', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state'];
  const missing = required.filter((field) => !String(payload[field] || '').trim());

  if (missing.length > 0) {
    return NextResponse.json({ error: 'Preencha todos os campos obrigatórios do endereço.', missing }, { status: 400 });
  }

  const store = await readStore();
  const address = {
    id: payload.id || `address-${Date.now()}`,
    userId,
    name: String(payload.name).trim(),
    phone: String(payload.phone).trim(),
    cep: String(payload.cep).replace(/\D/g, ''),
    street: String(payload.street).trim(),
    number: String(payload.number).trim(),
    complement: String(payload.complement || '').trim(),
    district: String(payload.district).trim(),
    city: String(payload.city).trim(),
    state: String(payload.state).trim(),
    reference: String(payload.reference || '').trim(),
    notes: String(payload.notes || '').trim(),
    isMain: Boolean(payload.isMain),
  };

  const existingIndex = store.addresses.findIndex((entry) => entry.id === address.id && entry.userId === userId);
  if (existingIndex >= 0) {
    store.addresses[existingIndex] = address;
  } else {
    store.addresses.push(address);
  }

  await writeStore(store);
  return NextResponse.json({ success: true, address });
}
