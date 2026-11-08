'use client';

import Link from 'next/link';
import { Heart, Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function Header() {
  const { cartCount, favorites, user } = useStore();

  return (
    <header className="sticky top-0 z-50 border-b border-[#B69A70]/40 bg-white backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-[#EDE2D0] p-2 md:hidden" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="text-2xl font-bold tracking-[0.12em] text-wine">
            PEACH FLOWERS
          </Link>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-brown md:flex">
          <Link href="/">Início</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/categorias">Categorias</Link>
          <Link href="/sobre">Sobre nós</Link>
          <Link href="/contato">Contato</Link>
        </nav>

        <div className="flex items-center gap-3 text-brown">
          <button className="rounded-full border border-[#EDE2D0] p-2.5" aria-label="Pesquisar">
            <Search className="h-4 w-4" />
          </button>
          <Link href="/favoritos" className="relative rounded-full border border-[#EDE2D0] p-2.5" aria-label="Favoritos">
            <Heart className="h-4 w-4" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[10px] text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link href="/carrinho" className="relative rounded-full border border-[#EDE2D0] p-2.5" aria-label="Carrinho">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-peach px-1 text-[10px] text-brown">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href={user ? '/minha-conta' : '/login'} className="rounded-full border border-[#EDE2D0] p-2.5" aria-label="Minha conta">
            <User className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
