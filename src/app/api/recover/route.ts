import { NextResponse } from 'next/server';
import { readStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = String(data.email || '').trim().toLowerCase();
    const store = await readStore();
    const user = store.users.find((entry) => entry.email.toLowerCase() === email);

    if (!user) {
      return NextResponse.json({ error: 'Se o e-mail estiver cadastrado, enviaremos instruções de recuperação.' }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: 'Se o e-mail estiver cadastrado, enviaremos instruções de recuperação.',
    });
  } catch {
    return NextResponse.json({ error: 'Não foi possível solicitar a redefinição de senha.' }, { status: 500 });
  }
}
