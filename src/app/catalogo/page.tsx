'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { categories, products } from '@/data/products';
import { normalizeSearchQuery } from '@/lib/commerce';

const priceOptions = [
  { value: 'all', label: 'Todos os preços' },
  { value: 'under-50', label: 'Até R$ 50' },
  { value: '50-100', label: 'R$ 50 a R$ 100' },
  { value: '100-150', label: 'R$ 100 a R$ 150' },
  { value: '150-250', label: 'R$ 150 a R$ 250' },
  { value: 'over-250', label: 'Acima de R$ 250' },
];

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category') || 'Todos os produtos';
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [sortBy, setSortBy] = useState('relevancia');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 220);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const url = selectedCategory === 'Todos os produtos' ? '/catalogo' : `/catalogo?category=${encodeURIComponent(selectedCategory)}`;
    router.replace(url, { scroll: false });
  }, [selectedCategory, router]);

  const filteredProducts = useMemo(() => {
    const normalized = normalizeSearchQuery(debouncedQuery);

    const nextProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos os produtos' || product.category === selectedCategory || product.categories?.includes(selectedCategory);
      const searchText = `${product.name} ${product.description} ${product.category} ${product.tags.join(' ')} ${product.flowerTypes.join(' ')}`;
      const matchesSearch = !normalized || normalizeSearchQuery(searchText).includes(normalized);

      let matchesPrice = true;
      if (priceRange === 'under-50') matchesPrice = product.price <= 50;
      if (priceRange === '50-100') matchesPrice = product.price > 50 && product.price <= 100;
      if (priceRange === '100-150') matchesPrice = product.price > 100 && product.price <= 150;
      if (priceRange === '150-250') matchesPrice = product.price > 150 && product.price <= 250;
      if (priceRange === 'over-250') matchesPrice = product.price > 250;

      const matchesAvailability = availability === 'all' || (availability === 'available' ? product.stock > 0 : product.stock <= 0);
      return matchesCategory && matchesSearch && matchesPrice && matchesAvailability;
    });

    switch (sortBy) {
      case 'menor-preco':
        return [...nextProducts].sort((a, b) => a.price - b.price);
      case 'maior-preco':
        return [...nextProducts].sort((a, b) => b.price - a.price);
      case 'nome-asc':
        return [...nextProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'nome-desc':
        return [...nextProducts].sort((a, b) => b.name.localeCompare(a.name));
      case 'mais-recentes':
        return [...nextProducts].sort((a, b) => (Number(b.newArrival) || 0) - (Number(a.newArrival) || 0));
      default:
        return nextProducts;
    }
  }, [debouncedQuery, selectedCategory, sortBy, priceRange, availability]);

  return (
    <div className="container-shell py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <span className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Catálogo</span>
      </div>

      <div className="mb-8 rounded-[28px] border border-[#EDE2D0] bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#945D70]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar flores, buquês, categorias e ocasiões"
              className="w-full rounded-full border border-[#EDE2D0] bg-[#FAF8F3] py-3 pl-11 pr-4 outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-3 py-2">
              <SlidersHorizontal className="h-4 w-4 text-[#945D70]" />
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="bg-transparent outline-none">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] px-3 py-2 outline-none">
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="nome-asc">Nome A-Z</option>
              <option value="nome-desc">Nome Z-A</option>
              <option value="mais-recentes">Mais recentes</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] p-2">
            <label className="mb-2 block px-2 text-sm text-[#43383A]">Preço</label>
            <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)} className="w-full bg-transparent px-2 outline-none">
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="rounded-full border border-[#EDE2D0] bg-[#FAF8F3] p-2">
            <label className="mb-2 block px-2 text-sm text-[#43383A]">Disponibilidade</label>
            <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="w-full bg-transparent px-2 outline-none">
              <option value="all">Todos</option>
              <option value="available">Disponíveis</option>
              <option value="unavailable">Indisponíveis</option>
            </select>
          </div>
          <button onClick={() => { setQuery(''); setSelectedCategory('Todos os produtos'); setSortBy('relevancia'); setPriceRange('all'); setAvailability('all'); }} className="rounded-full border border-[#EDE2D0] bg-white px-5 py-3 text-sm font-medium text-brown">Limpar filtros</button>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-[#43383A]">{filteredProducts.length} produto(s) encontrados</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[30px] border border-[#EDE2D0] bg-white p-12 text-center shadow-soft">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-wine">Sem resultados</p>
          <h2 className="text-3xl text-brown">Não encontramos flores para sua pesquisa.</h2>
          <p className="mt-3 text-[#43383A]">Que tal explorar outras opções e descobrir um presente perfeito?</p>
          <button onClick={() => { setQuery(''); setSelectedCategory('Todos os produtos'); setPriceRange('all'); }} className="mt-6 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white">Ver todas as flores</button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
