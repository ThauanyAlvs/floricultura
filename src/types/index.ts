export type ProductCategory =
  | 'Rosas'
  | 'Girassóis'
  | 'Flores do campo'
  | 'Buquês variados'
  | 'Arranjos florais'
  | 'Flores em vasos'
  | 'Presentes e chocolates'
  | 'Flores românticas'
  | 'Flores para aniversários'
  | 'Flores premium'
  | 'Flores até R$ 100';

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categories?: string[];
  price: number;
  oldPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  stock: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  sizes?: string[];
  flowerTypes: string[];
  quantityText?: string;
  maintenance?: string;
  tags: string[];
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'admin';
};
