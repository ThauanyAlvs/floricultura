import { NextResponse } from 'next/server';
import { readStore, verifyPassword } from '@/lib/store';
import { signSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = String(data.email || '').trim().toLowerCase();
    const password = String(data.password || '');

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    const store = await readStore();
    const user = store.users.find((entry) => entry.email.toLowerCase() === email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
    }

    const safeUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const response = NextResponse.json({ success: true, user: safeUser });
    const token = signSession(user.id);

    response.cookies.set('peach_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Não foi possível realizar o login.' }, { status: 500 });
  }
}
