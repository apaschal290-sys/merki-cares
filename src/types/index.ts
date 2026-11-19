export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order_index?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  price: number | null;
  price_on_request: boolean;
  category_id?: string;
  category_name: string;
  skin_concerns: string[];
  description: string;
  benefits: string[];
  how_to_use?: string;
  ingredients?: string;
  nafdac_number?: string;
  images: string[];
  in_stock: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AdminStats {
  totalProducts: number;
  inStockCount: number;
  outOfStockCount: number;
  featuredCount: number;
}

