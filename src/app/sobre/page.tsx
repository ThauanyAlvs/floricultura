import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-[30px] border border-[#EDE2D0] bg-white p-3 shadow-soft">
          <img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80" alt="Floricultura PEACH" className="h-full min-h-[480px] w-full rounded-[24px] object-cover" />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Sobre nós</p>
          <h1 className="text-4xl text-brown md:text-5xl">A arte de presentear com flores.</h1>
          <p className="mt-6 text-lg leading-8 text-[#43383A]">
            A PEACH FLOWERS nasceu para transformar sentimentos em experiências encantadoras. Cada composição é preparada com atenção aos detalhes, buscando criar presentes que emocionam, acolhem e tornam momentos especiais ainda mais memoráveis.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] bg-[#FAF8F3] p-5">
              <p className="text-3xl font-semibold text-brown">12+</p>
              <p className="mt-2 text-sm text-[#43383A]">anos de cuidado floral</p>
            </div>
            <div className="rounded-[24px] bg-[#FAF8F3] p-5">
              <p className="text-3xl font-semibold text-brown">7k+</p>
              <p className="mt-2 text-sm text-[#43383A]">presentes entregues</p>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/catalogo" className="rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white">Ver catálogo</Link>
            <Link href="/contato" className="rounded-full border border-[#EDE2D0] px-6 py-3 text-sm font-medium text-brown">Fale conosco</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
