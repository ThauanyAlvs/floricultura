import Link from 'next/link';

export default function HomePage() {
  const categories = [
    { title: 'Buquês de rosas', slug: 'Rosas', image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80' },
    { title: 'Flores variadas', slug: 'Buquês variados', image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80' },
    { title: 'Arranjos em vaso', slug: 'Flores em vasos', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80' },
    { title: 'Presentes românticos', slug: 'Presentes e chocolates', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80' },
  ];

  const featured = [
    'rosa-individual',
    'mini-buque-delicado',
    'buque-12-rosas',
  ].map((id) => ({
    id,
    name: 'Produto destacado',
    price: 89.9,
    oldPrice: 129.9,
    category: 'Rosas',
    description: 'Selecionado com carinho para presentear em qualquer ocasião.',
    shortDescription: 'Presentes delicados e sofisticados.',
    images: ['https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80'],
    stock: 12,
    flowerTypes: ['Rosa'],
    tags: ['rosa'],
    slug: 'produto-destacado',
  }));

  return (
    <>
      <section className="bg-rose-glow border-b border-[#f3eae5]">
        <div className="container-shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-wine">PEACH FLOWERS</p>
            <h1 className="max-w-xl text-5xl leading-tight text-brown md:text-6xl">Flores para todos os momentos especiais.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#604b49]">Descubra a delicadeza de presentear com flores. Buquês e arranjos preparados com carinho para tornar cada ocasião inesquecível.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/catalogo" className="inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-wine">Explorar coleção</Link>
              <Link href="/catalogo?category=Flores%20do%20campo" className="rounded-full border border-[#eadad4] bg-white/70 px-6 py-3.5 text-sm font-semibold text-brown">Ver categorias</Link>
            </div>
          </div>
          <div className="relative">
            <div className="card-surface relative overflow-hidden p-3">
              <img src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80" alt="Buquê de flores" className="h-[560px] w-full rounded-[26px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="flex items-center justify-between gap-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Categorias</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link href={`/catalogo?category=${encodeURIComponent(category.slug)}`} key={category.title} className="group overflow-hidden rounded-[28px] border border-[#f3e9e3] bg-white shadow-soft">
              <div className="relative h-72 overflow-hidden">
                <img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2c2b]/60 to-transparent" />
                <span className="absolute bottom-5 left-5 text-xl font-semibold text-white">{category.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="card-surface group overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-wine/80">{product.category}</p>
                    <Link href={`/produto/${product.id}`} className="mt-2 block text-xl font-semibold text-brown">{product.name}</Link>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-wine">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#6d5150]">{product.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
