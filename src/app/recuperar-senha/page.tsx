'use client';

import { useState } from 'react';

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível recuperar a senha.');
      setMessage(data.message || 'Se o e-mail estiver cadastrado, enviamos instruções de recuperação.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível recuperar a senha.');
    }
  }

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-[30px] border border-[#f1e2df] bg-white p-8 shadow-soft">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Recuperação</p>
        <h1 className="text-4xl text-brown">Recupere sua senha</h1>
        <p className="mt-3 text-sm text-[#6b4d4a]">Informe o e-mail da sua conta para receber o link de redefinição.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-[#5f4745]">E-mail</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-full border border-[#f1e2df] bg-[#fffaf8] px-4 py-3 outline-none" placeholder="seu@email.com" required />
          </div>
          {error && <p className="rounded-2xl bg-[#fbe8eb] px-3 py-2 text-sm text-[#7a3a46]">{error}</p>}
          {message && <p className="rounded-2xl bg-[#edf9f0] px-3 py-2 text-sm text-[#2f5f48]">{message}</p>}
          <button type="submit" className="w-full rounded-full bg-brown px-5 py-3.5 text-sm font-semibold text-white">Enviar link</button>
        </form>
      </div>
    </div>
  );
}
