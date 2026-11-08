import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_FILE = path.join(process.cwd(), 'data', 'store.json');

export type StoreUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  createdAt: string;
  emailVerified: boolean;
  marketingConsent: boolean;
  privacyAccepted: boolean;
};

export type StoreAddress = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  reference: string;
  notes: string;
  isMain: boolean;
};

export type StoreData = {
  users: StoreUser[];
  addresses: StoreAddress[];
  favorites: Array<{ userId: string; productId: string }>;
  carts: Array<{ userId: string; productId: string; quantity: number }>;
  orders: Array<any>;
};

const adminHash = hashPassword('Admin@123456');

const defaultData: StoreData = {
  users: [
    {
      id: 'admin-1',
      fullName: 'Admin PEACH',
      email: 'admin@peachflowers.com',
      phone: '(11) 99999-0000',
      passwordHash: adminHash,
      role: 'admin',
      createdAt: new Date().toISOString(),
      emailVerified: true,
      marketingConsent: false,
      privacyAccepted: true,
    },
  ],
  addresses: [],
  favorites: [],
  carts: [],
  orders: [],
};

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const derived = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(derived));
}

async function ensureFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

export async function readStore() {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw) as StoreData;
}

export async function writeStore(data: StoreData) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
