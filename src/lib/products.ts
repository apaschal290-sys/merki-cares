import { Product, Category, AdminStats } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "./mockData";
import { createClient } from "./supabase/client";

const LOCAL_STORAGE_PRODUCTS_KEY = "merki_products_cache";
const LOCAL_STORAGE_CATEGORIES_KEY = "merki_categories_cache";

// Fast flag: If remote Supabase tables are not yet migrated (PGRST205),
// bypass remote fetches so pages load instantaneously on local/seed data.
let supabaseSchemaMissing = false;

async function withTimeout<T>(promise: Promise<T>, ms = 1500): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

function getLocalStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return INITIAL_PRODUCTS;
  }
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (!item) {
      window.localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

function setLocalStoredProducts(products: Product[]): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }
}

function getLocalStoredCategories(): Category[] {
  if (typeof window === "undefined") {
    return INITIAL_CATEGORIES;
  }
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    if (!item) {
      window.localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

function setLocalStoredCategories(categories: Category[]): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error("Failed to save categories to localStorage:", e);
    }
  }
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  if (supabase && !supabaseSchemaMissing) {
    try {
      const result = await withTimeout(
        supabase.from("categories").select("*").order("order_index", { ascending: true })
      );
      if (result?.error) {
        if (result.error.code === "PGRST205" || result.error.message?.includes("schema cache")) {
          supabaseSchemaMissing = true;
        }
      } else if (result?.data && result.data.length > 0) {
        return result.data as Category[];
      }
    } catch (err) {
      console.warn("Supabase categories fetch error, using local fallback:", err);
    }
  }
  return getLocalStoredCategories();
}

export async function getProducts(options?: {
  categorySlug?: string;
  skinConcern?: string;
  search?: string;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  const supabase = createClient();

  let products: Product[] = [];

  if (supabase && !supabaseSchemaMissing) {
    try {
      let query = supabase.from("products").select("*");

      if (options?.featuredOnly) {
        query = query.eq("featured", true);
      }
      if (options?.inStockOnly) {
        query = query.eq("in_stock", true);
      }
      if (options?.categorySlug && options.categorySlug !== "all") {
        query = query.ilike("category_name", `%${options.categorySlug}%`);
      }
      if (options?.skinConcern && options.skinConcern !== "all") {
        query = query.contains("skin_concerns", [options.skinConcern]);
      }
      if (options?.search && options.search.trim() !== "") {
        const term = options.search.trim();
        query = query.or(`name.ilike.%${term}%,tagline.ilike.%${term}%,description.ilike.%${term}%`);
      }

      const result = await withTimeout(query.order("created_at", { ascending: false }));
      if (result?.error) {
        if (result.error.code === "PGRST205" || result.error.message?.includes("schema cache")) {
          supabaseSchemaMissing = true;
        }
      } else if (result?.data && result.data.length > 0) {
        products = result.data as Product[];
        return products;
      }
    } catch (err) {
      console.warn("Supabase products fetch failed, using local storage:", err);
    }
  }

  // Fallback to local / mock dataset with client-side filtering
  products = getLocalStoredProducts();

  if (options?.featuredOnly) {
    products = products.filter((p) => p.featured);
  }

  if (options?.inStockOnly) {
    products = products.filter((p) => p.in_stock);
  }

  if (options?.categorySlug && options.categorySlug !== "all") {
    const slug = options.categorySlug.toLowerCase().replace("-", " ");
    products = products.filter((p) =>
      p.category_name.toLowerCase().includes(slug) ||
      (options.categorySlug === "baby-kids" && p.category_name.toLowerCase().includes("baby")) ||
      (options.categorySlug === "hair-scalp" && p.category_name.toLowerCase().includes("hair"))
    );
  }

  if (options?.skinConcern && options.skinConcern !== "all") {
    const concern = options.skinConcern.toLowerCase();
    products = products.filter((p) =>
      p.skin_concerns.some((c) => c.toLowerCase() === concern)
    );
  }

  if (options?.search && options.search.trim() !== "") {
    const term = options.search.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.tagline && p.tagline.toLowerCase().includes(term)) ||
        p.description.toLowerCase().includes(term) ||
        p.category_name.toLowerCase().includes(term) ||
        p.skin_concerns.some((c) => c.toLowerCase().includes(term))
    );
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient();
  if (supabase && !supabaseSchemaMissing) {
    try {
      const result = await withTimeout(
        supabase.from("products").select("*").eq("slug", slug).single()
      );
      if (result?.error) {
        if (result.error.code === "PGRST205" || result.error.message?.includes("schema cache")) {
          supabaseSchemaMissing = true;
        }
      } else if (result?.data) {
        return result.data as Product;
      }
    } catch (err) {
      console.warn("Supabase getProductBySlug error, using fallback:", err);
    }
  }

  const all = getLocalStoredProducts();
  return all.find((p) => p.slug === slug) || null;
}

export async function getAdminStats(): Promise<AdminStats> {
  const products = await getProducts();
  return {
    totalProducts: products.length,
    inStockCount: products.filter((p) => p.in_stock).length,
    outOfStockCount: products.filter((p) => !p.in_stock).length,
    featuredCount: products.filter((p) => p.featured).length,
  };
}

export async function saveProduct(product: Partial<Product>): Promise<Product> {
  const supabase = createClient();
  const slug =
    product.slug ||
    (product.name || "product")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const payload: Product = {
    id: product.id || crypto.randomUUID(),
    name: product.name || "Untitled Product",
    slug,
    tagline: product.tagline || "",
    price: product.price_on_request ? null : product.price ?? 0,
    price_on_request: Boolean(product.price_on_request),
    category_id: product.category_id,
    category_name: product.category_name || "Face",
    skin_concerns: product.skin_concerns || [],
    description: product.description || "",
    benefits: product.benefits || [],
    how_to_use: product.how_to_use || "",
    ingredients: product.ingredients || "",
    nafdac_number: product.nafdac_number || "",
    images: product.images && product.images.length > 0
      ? product.images
      : ["/images/product-bottle.png"],
    in_stock: product.in_stock ?? true,
    featured: product.featured ?? false,
    created_at: product.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const result = await withTimeout(
        supabase.from("products").upsert(payload, { onConflict: "slug" }).select().single()
      );
      if (result && !result.error && result.data) {
        return result.data as Product;
      }
    } catch (err) {
      console.warn("Supabase upsert error, updating local store:", err);
    }
  }

  // Local storage update
  const current = getLocalStoredProducts();
  const index = current.findIndex((p) => p.id === payload.id || p.slug === payload.slug);
  if (index >= 0) {
    current[index] = payload;
  } else {
    current.unshift(payload);
  }
  setLocalStoredProducts(current);
  return payload;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const result = await withTimeout(supabase.from("products").delete().eq("id", id));
      if (result && !result.error) {
        return true;
      }
    } catch (err) {
      console.warn("Supabase delete product error:", err);
    }
  }

  const current = getLocalStoredProducts().filter((p) => p.id !== id);
  setLocalStoredProducts(current);
  return true;
}

export async function toggleProductStock(id: string, inStock: boolean): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const result = await withTimeout(
        supabase.from("products").update({ in_stock: inStock }).eq("id", id)
      );
      if (result && !result.error) {
        return true;
      }
    } catch (err) {
      console.warn("Supabase toggle stock error:", err);
    }
  }

  const current = getLocalStoredProducts().map((p) =>
    p.id === id ? { ...p, in_stock: inStock } : p
  );
  setLocalStoredProducts(current);
  return true;
}

export async function saveCategory(category: Partial<Category>): Promise<Category> {
  const supabase = createClient();
  const slug =
    category.slug ||
    (category.name || "category")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const payload: Category = {
    id: category.id || crypto.randomUUID(),
    name: category.name || "New Category",
    slug,
    description: category.description || "",
    order_index: category.order_index ?? 99,
  };

  if (supabase) {
    try {
      const result = await withTimeout(
        supabase.from("categories").upsert(payload, { onConflict: "slug" }).select().single()
      );
      if (result && !result.error && result.data) {
        return result.data as Category;
      }
    } catch (err) {
      console.warn("Supabase category save error:", err);
    }
  }

  const current = getLocalStoredCategories();
  const idx = current.findIndex((c) => c.id === payload.id || c.slug === payload.slug);
  if (idx >= 0) {
    current[idx] = payload;
  } else {
    current.push(payload);
  }
  setLocalStoredCategories(current);
  return payload;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = createClient();
  if (supabase) {
    try {
      const result = await withTimeout(
        supabase.from("categories").delete().eq("id", id)
      );
      if (result && !result.error) {
        return true;
      }
    } catch (err) {
      console.warn("Supabase category delete error:", err);
    }
  }

  const current = getLocalStoredCategories().filter((c) => c.id !== id);
  setLocalStoredCategories(current);
  return true;
}
