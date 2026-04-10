export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  products?: Product[];
  order: number;
  isActive: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  price?: number | null;
  oldPrice?: number | null;
  sku?: string | null;
  inStock: boolean;
  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
  productId: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  productId: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  isPublished: boolean;
  publishedAt?: Date | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string | null;
  order: number;
  type: 'supplier' | 'client';
  isActive: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  description?: string | null;
  image: string;
  file?: string | null;
  order: number;
  isActive: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'image' | 'json';
  group: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  status: 'new' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Slide {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  image: string;
  videoUrl?: string | null;
  buttonText?: string | null;
  buttonUrl?: string | null;
  order: number;
  isActive: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: string;
  social: {
    vk?: string;
    telegram?: string;
    youtube?: string;
  };
}
