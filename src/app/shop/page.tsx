"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Search, X, SlidersHorizontal, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";
import { CATEGORIES_LIST, SKIN_CONCERNS, BRAND } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialConcern = searchParams.get("concern") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedConcern, setSelectedConcern] = useState<string>(initialConcern);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const all = await getProducts();
      setProducts(all);
      setLoading(false);
    }
    loadData();
  }, []);

  // Update state when URL searchParams change
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
    const con = searchParams.get("concern");
    if (con) setSelectedConcern(con);
  }, [searchParams]);

  // Client-side filtering & sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      const targetSlug = selectedCategory.toLowerCase();
      result = result.filter((p) => {
        const cat = p.category_name.toLowerCase();
        if (targetSlug === "face") return cat.includes("face");
        if (targetSlug === "body") return cat.includes("body");
        if (targetSlug === "baby-kids" || targetSlug === "baby") return cat.includes("baby") || cat.includes("kid");
        if (targetSlug === "hair-scalp" || targetSlug === "hair") return cat.includes("hair") || cat.includes("scalp");
        return cat.includes(targetSlug);
      });
    }

    // Skin concern filter
    if (selectedConcern && selectedConcern !== "all") {
      const concernLower = selectedConcern.toLowerCase();
      result = result.filter((p) =>
        p.skin_concerns?.some((c) => c.toLowerCase() === concernLower)
      );
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.in_stock);
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const term = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.tagline && p.tagline.toLowerCase().includes(term)) ||
          p.description.toLowerCase().includes(term) ||
          p.category_name.toLowerCase().includes(term) ||
          p.skin_concerns?.some((c) => c.toLowerCase().includes(term))
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedConcern, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedConcern("all");
    setSearchQuery("");
    setInStockOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pb-16">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-blush/40 text-brand-pinkDeep text-xs font-bold">
            <Sparkles className="w-3 h-3 text-brand-pink" />
            <span>Botanical Dispensary</span>
          </span>
          <span className="text-xs text-neutral-500 font-medium">
            • Direct WhatsApp Orders
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
          Our Skincare Catalogue
        </h1>
        <p className="text-sm text-neutral-600 mt-1 max-w-xl">
          Clean, gentle formulas crafted for Nigerian parents, delicate babies, and adult skin routines. Click any product to order directly on WhatsApp.
        </p>
      </div>

      {/* Search Bar & Stock Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search serum, colloidal oat butter, sunscreen, scrub..."
            className="w-full h-12 pl-11 pr-10 rounded-full bg-white border border-[#F8C8D8]/50 text-sm text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-pink/40 shadow-soft transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-brand-black"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Quick Stock Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-1">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-200 peer-checked:bg-brand-whatsapp rounded-full relative transition-colors">
              <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 peer-checked:translate-x-4 transition-transform shadow-xs"></div>
            </div>
            <span className="text-xs font-bold text-brand-black">In Stock Only</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-3 rounded-full bg-white border border-[#F8C8D8]/50 text-xs font-bold text-neutral-700 focus:outline-none shadow-soft"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Category Chips (Horizontal Scroll on Mobile) */}
      <div className="mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
          Filter by Category:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  isSelected
                    ? "bg-brand-black text-white shadow-soft"
                    : "bg-white text-neutral-700 border border-[#F8C8D8]/50 hover:bg-brand-blushLight"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skin Concern Filter Chips */}
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
          Filter by Skin Concern:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SKIN_CONCERNS.map((concern) => {
            const isSelected = selectedConcern === concern.id;
            return (
              <button
                key={concern.id}
                onClick={() => setSelectedConcern(concern.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  isSelected
                    ? "bg-brand-pink text-white shadow-soft font-bold"
                    : "bg-white text-neutral-600 border border-[#F8C8D8]/30 hover:border-brand-pink"
                }`}
              >
                {concern.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Reset Button */}
      <div className="flex items-center justify-between py-2 mb-4 border-b border-neutral-200/60 text-xs text-neutral-600">
        <span>
          Showing <strong className="text-brand-black">{filteredProducts.length}</strong> skincare formulas
        </span>
        {(selectedCategory !== "all" || selectedConcern !== "all" || searchQuery || inStockOnly) && (
          <button
            onClick={resetFilters}
            className="text-brand-pink hover:text-brand-pinkDeep font-bold flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 py-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-4 h-72 animate-pulse flex flex-col justify-between">
              <div className="bg-neutral-200 aspect-square rounded-2xl w-full"></div>
              <div className="h-4 bg-neutral-200 rounded mt-3"></div>
              <div className="h-3 bg-neutral-100 rounded mt-1"></div>
              <div className="h-8 bg-neutral-200 rounded-full mt-3"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 text-center shadow-soft border border-[#F8C8D8]/40 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-brand-blush/40 flex items-center justify-center mx-auto text-brand-pink mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-brand-black mb-1">
            No products match your filters
          </h3>
          <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
            We couldn't find any products matching your selected category or concern. Try resetting your search or ask Merki directly for a bespoke solution!
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={resetFilters}
              className="py-2.5 px-5 rounded-full bg-brand-black text-white text-xs font-bold shadow-soft hover:bg-brand-pink transition-colors"
            >
              Reset All Filters
            </button>
            <a
              href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I'm%20looking%20for%20a%20specific%20skincare%20product%20not%20listed%20on%20the%20site.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-brand-whatsapp text-white text-xs font-bold shadow-soft hover:bg-brand-whatsappHover transition-colors"
            >
              Ask on WhatsApp ({BRAND.phoneDisplay})
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs text-neutral-500 mt-3">Loading Merki Cares Catalogue...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
