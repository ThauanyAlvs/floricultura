'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { isStrongPassword, validateCustomerRegistration } from '@/lib/commerce';

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateCustomerRegistration(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!isStrongPassword(form.password)) {
      setErrors((current) => ({ ...current, password: 'A senha deve ter pelo menos 12 caracteres, incluindo letras, números e símbolo.' }));
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível criar a conta.');
      }

      router.push('/login?redirect=/checkout');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-xl rounded-[30px] border border-[#EDE2D0] bg-white p-8 shadow-soft">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Cadastro</p>
        <h1 className="text-4xl text-brown">Crie sua conta</h1>
        <p className="mt-3 text-sm text-[#43383A]">Faça parte da PEACH FLOWERS e aproveite descontos, favoritos e pedidos com segurança.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#43383A]">Nome completo</label>
            <input type="text" value={form.fullName} onChange={(event) => handleChange('fullName', event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 outline-none" placeholder="Seu nome" required />
            {errors.fullName && <p className="mt-2 text-sm text-[#682C40]">{errors.fullName}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#43383A]">E-mail</label>
            <input type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 outline-none" placeholder="seu@email.com" required />
            {errors.email && <p className="mt-2 text-sm text-[#682C40]">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#43383A]">Telefone</label>
            <input type="tel" value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 outline-none" placeholder="(11) 99999-9999" required />
            {errors.phone && <p className="mt-2 text-sm text-[#682C40]">{errors.phone}</p>}
          </div>
          <div className="relative">
            <label className="mb-2 block text-sm text-[#43383A]">Senha</label>
            <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => handleChange('password', event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 pr-12 outline-none" placeholder="Crie uma senha forte" required />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-[52%] text-[#43383A]" aria-label="Mostrar senha">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            {errors.password && <p className="mt-2 text-sm text-[#682C40]">{errors.password}</p>}
          </div>
          <div className="relative">
            <label className="mb-2 block text-sm text-[#43383A]">Confirmação</label>
            <input type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(event) => handleChange('confirmPassword', event.target.value)} className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-4 py-3 pr-12 outline-none" placeholder="Repita sua senha" required />
            <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-3 top-[52%] text-[#43383A]" aria-label="Mostrar confirmação da senha">
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            {errors.confirmPassword && <p className="mt-2 text-sm text-[#682C40]">{errors.confirmPassword}</p>}
          </div>

          {submitError && <p className="md:col-span-2 rounded-2xl bg-[#EDE2D0] px-3 py-2 text-sm text-[#682C40]">{submitError}</p>}
          <button type="submit" disabled={loading} className="md:col-span-2 mt-2 w-full rounded-full bg-wine px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
        </form>

        <p className="mt-6 text-center text-sm text-[#43383A]">Já tem conta? <Link href="/login" className="font-medium text-wine">Entrar</Link></p>
      </div>
    </div>
  );
}
