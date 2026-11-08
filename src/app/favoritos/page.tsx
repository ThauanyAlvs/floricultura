'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function FavoritesPage() {
  const { favorites } = useStore();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  if (!favoriteProducts.length) {
    return (
      <div className="container-shell py-20">
        <div className="mx-auto max-w-2xl rounded-[30px] border border-[#EDE2D0] bg-white p-10 text-center shadow-soft">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Favoritos</p>
          <h1 className="text-4xl text-brown">Você ainda não salvou nenhum presente.</h1>
          <p className="mt-3 text-[#43383A]">Explore nossa seleção e salve os arranjos que mais combinam com você.</p>
          <Link href="/catalogo" className="mt-6 inline-flex rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white">Explorar catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-shell py-16">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Meus favoritos</p>
        <h1 className="text-4xl text-brown">Suas flores preferidas</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
