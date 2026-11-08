import crypto from 'crypto';

const SESSION_SECRET = process.env.AUTH_SECRET || 'peach-flowers-local-secret';

export function signSession(userId: string) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`${userId}.${expiresAt}`).digest('hex');
  return `${userId}.${expiresAt}.${signature}`;
}

export function readSessionUserId(cookieHeader?: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(';').find((entry) => entry.trim().startsWith('peach_session='));
  if (!match) return null;
  const rawToken = decodeURIComponent(match.split('=').slice(1).join('='));
  if (!rawToken) return null;

  const [userId, expiresAt, signature] = rawToken.split('.');
  if (!userId || !expiresAt || !signature) return null;

  const isValid = Number(expiresAt) > Date.now();
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(`${userId}.${expiresAt}`).digest('hex');

  return isValid && signature === expected ? userId : null;
}
