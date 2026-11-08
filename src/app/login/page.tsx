'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível entrar.');
      }

      setUser(data.user);
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-[30px] border border-[#f1e2df] bg-white p-8 shadow-soft">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Login</p>
        <h1 className="text-4xl text-brown">Bem-vindo(a) novamente</h1>
        <p className="mt-3 text-sm text-[#6b4d4a]">Entre para acompanhar pedidos, favoritos e finalizar sua compra com segurança.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[#5f4745]">E-mail</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-full border border-[#f1e2df] bg-[#fffaf8] px-4 py-3 outline-none" placeholder="seu@email.com" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#5f4745]">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-full border border-[#f1e2df] bg-[#fffaf8] px-4 py-3 pr-12 outline-none"
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b4d4a]" aria-label="Mostrar ou ocultar senha">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="rounded-2xl bg-[#fbe8eb] px-3 py-2 text-sm text-[#7a3a46]">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-full bg-brown px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-[#6b4d4a]">
          <Link href="/recuperar-senha" className="text-wine">Esqueci a senha</Link>
          <Link href="/cadastro" className="font-medium text-brown">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}
