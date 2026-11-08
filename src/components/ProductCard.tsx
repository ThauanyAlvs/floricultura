'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <article className="card-surface group overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.newArrival && <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-wine">Novo</span>}
          {product.featured && <span className="rounded-full bg-peach px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brown">Destaque</span>}
        </div>
        <button
          aria-label="Adicionar aos favoritos"
          onClick={() => toggleFavorite(product.id)}
          className={`absolute right-4 top-4 rounded-full p-2.5 backdrop-blur ${favorite ? 'bg-wine text-white' : 'bg-white/80 text-brown'}`}
        >
          <Heart className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-wine/80">{product.category}</p>
            <Link href={`/produto/${product.id}`} className="mt-2 block text-xl font-semibold text-brown">
              {product.name}
            </Link>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-wine">{formatPrice(product.price)}</p>
            {product.oldPrice && <p className="text-xs text-[#9a7b79] line-through">{formatPrice(product.oldPrice)}</p>}
          </div>
        </div>
        <p className="text-sm leading-6 text-[#6d5150]">{product.shortDescription}</p>
        <div className="flex gap-3">
          <button onClick={() => addToCart(product, 1)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brown px-4 py-3 text-sm font-semibold text-white transition hover:bg-wine">
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </button>
          <Link href={`/produto/${product.id}`} className="rounded-full border border-[#f0e1dc] px-4 py-3 text-sm font-medium text-brown">
            Ver mais
          </Link>
        </div>
      </div>
    </article>
  );
}
