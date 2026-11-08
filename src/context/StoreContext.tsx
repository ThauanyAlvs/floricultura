'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '@/data/products';
import { Product } from '@/types';

type CartEntry = { productId: string; quantity: number };
type User = { id: string; name: string; email: string; phone?: string; role: 'customer' | 'admin' } | null;

const CART_KEY = 'peach-cart';
const FAVORITES_KEY = 'peach-favorites';
const USER_KEY = 'peach-user';

const StoreContext = createContext<{
  cart: CartEntry[];
  favorites: string[];
  user: User;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  setUser: (user: User) => void;
  clearCart: () => void;
  logout: () => void;
  cartCount: number;
  cartSubtotal: number;
  getProductById: (id: string) => Product | undefined;
}>({
  cart: [],
  favorites: [],
  user: null,
  addToCart: () => undefined,
  updateCartQuantity: () => undefined,
  removeFromCart: () => undefined,
  toggleFavorite: () => undefined,
  isFavorite: () => false,
  setUser: () => undefined,
  clearCart: () => undefined,
  logout: () => undefined,
  cartCount: 0,
  cartSubtotal: 0,
  getProductById: () => undefined,
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [user, setUserState] = useState<User>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedCart = localStorage.getItem(CART_KEY);
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((current) => {
      const nextQuantity = Math.max(1, Math.min(quantity, product.stock));
      const existing = current.find((item) => item.productId === product.id);

      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: Math.min(item.quantity + nextQuantity, product.stock) } : item,
        );
      }

      return [...current, { productId: product.id, quantity: nextQuantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find((item) => item.id === productId);
    const allowedQuantity = product ? Math.min(quantity, product.stock) : quantity;

    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: allowedQuantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]));
  };

  const isFavorite = (productId: string) => favorites.includes(productId);
  const setUser = (nextUser: User) => setUserState(nextUser);
  const clearCart = () => setCart([]);
  const logout = async () => {
    setUserState(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_KEY);
      try {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      } catch {
        // noop: logout local flow is enforced even if the backend request fails.
      }
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const getProductById = (id: string) => products.find((product) => product.id === id);

  const value = useMemo(
    () => ({ cart, favorites, user, addToCart, updateCartQuantity, removeFromCart, toggleFavorite, isFavorite, setUser, clearCart, logout, cartCount, cartSubtotal, getProductById }),
    [cart, favorites, user, cartCount, cartSubtotal],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

