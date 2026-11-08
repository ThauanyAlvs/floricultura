import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] items-center justify-center py-24">
      <div className="text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-wine">404</p>
        <h1 className="text-5xl text-brown">Página não encontrada</h1>
        <p className="mt-4 max-w-xl text-lg text-[#43383A]">
          A página que você procura não existe ou foi movida. Volte para a loja e continue escolhendo o presente perfeito.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
