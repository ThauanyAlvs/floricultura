import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('peach_session', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(0),
  });
  return response;
}
