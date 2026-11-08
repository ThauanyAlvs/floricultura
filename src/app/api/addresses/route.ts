import { NextRequest, NextResponse } from 'next/server';
import { readSessionUserId } from '@/lib/auth';
import { readStore } from '@/lib/store';

export async function GET(request: NextRequest) {
  const userId = readSessionUserId(request.headers.get('cookie'));
  if (!userId) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    addresses: store.addresses.filter((entry) => entry.userId === user.id),
    orders: store.orders.filter((entry) => entry.userId === user.id),
  });
}
