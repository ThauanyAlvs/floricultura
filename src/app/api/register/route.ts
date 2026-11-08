import { NextResponse } from 'next/server';
import { type StoreUser } from '@/lib/store';
import { hashPassword, readStore, writeStore } from '@/lib/store';
import { validateCustomerRegistration } from '@/lib/commerce';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = {
      fullName: String(data.fullName || ''),
      email: String(data.email || ''),
      phone: String(data.phone || ''),
      password: String(data.password || ''),
      confirmPassword: String(data.confirmPassword || ''),
    };

    const errors = validateCustomerRegistration(payload);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Dados inválidos.', details: errors }, { status: 400 });
    }

    const store = await readStore();
    const normalizedEmail = payload.email.trim().toLowerCase();
    const alreadyExists = store.users.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (alreadyExists) {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 });
    }

    const user: StoreUser = {
      id: `user-${Date.now()}`,
      fullName: payload.fullName.trim(),
      email: normalizedEmail,
      phone: payload.phone.trim(),
      passwordHash: hashPassword(payload.password),
      role: 'customer',
      createdAt: new Date().toISOString(),
      emailVerified: false,
      marketingConsent: false,
      privacyAccepted: true,
    };

    store.users.push(user);
    await writeStore(store);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Não foi possível concluir o cadastro.' }, { status: 500 });
  }
}


