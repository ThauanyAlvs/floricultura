import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Se o e-mail estiver cadastrado, enviamos instruções de recuperação.',
  });
}
