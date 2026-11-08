'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function MyAccountPage() {
  const { user, setUser } = useStore();
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setUser({ ...user, name: fullName, email, phone: phone || user.phone });
    setMessage('Dados atualizados com sucesso.');
  }

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Minha conta</p>
        <h1 className="text-4xl text-brown">Perfil e Preferências</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Meu perfil</h2>
          <div className="mt-5 space-y-4">
            <input value={fullName} onChange={(event) => setFullName(event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Nome completo" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="E-mail" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Telefone" />
            {message && <p className="text-sm text-[#2d6a46]">{message}</p>}
            <button type="submit" className="rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white">Salvar alterações</button>
          </div>
        </form>

        <div className="rounded-[28px] border border-[#EDE2D0] bg-white p-6 shadow-soft">
          <h2 className="text-2xl text-brown">Alterar senha</h2>
          <div className="mt-5 space-y-4">
            <input type="password" className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Senha atual" />
            <input type="password" className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Nova senha" />
            <input type="password" className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3" placeholder="Confirmar nova senha" />
            <button className="rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white">Atualizar senha</button>
          </div>
        </div>
      </div>
    </div>
  );
}
