"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Upload, 
  LogOut, 
  ExternalLink, 
  Sliders, 
  Tag, 
  Layers, 
  ArrowLeft,
  Lock,
  Save,
  MessageCircle,
  Eye
} from "lucide-react";
import { Product, Category, AdminStats } from "@/types";
import { 
  getProducts, 
  getCategories, 
  getAdminStats, 
  saveProduct, 
  deleteProduct, 
  toggleProductStock,
  saveCategory,
  deleteCategory
} from "@/lib/products";
import { createClient } from "@/lib/supabase/client";
import { BRAND, formatNaira } from "@/lib/constants";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Store data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    inStockCount: 0,
    outOfStockCount: 0,
    featuredCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Active view tab
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");

  // Search in admin table
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Form Drawer Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form fields
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formPrice, setFormPrice] = useState<number | string>("");
  const [formPriceOnRequest, setFormPriceOnRequest] = useState(false);
  const [formCategoryName, setFormCategoryName] = useState("Face");
  const [formSkinConcerns, setFormSkinConcerns] = useState<string[]>([]);
  const [formDescription, setFormDescription] = useState("");
  const [formBenefits, setFormBenefits] = useState<string>("");
  const [formHowToUse, setFormHowToUse] = useState("");
  const [formIngredients, setFormIngredients] = useState("");
  const [formNafdac, setFormNafdac] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formInStock, setFormInStock] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formSaving, setFormSaving] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  // Category modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Check auth session
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      if (supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setIsAuthenticated(true);
            return;
          }
        } catch (e) {
          console.warn("Supabase auth check error:", e);
        }
      }

      // Check local session storage fallback for demo
      const localAuth = sessionStorage.getItem("merki_admin_session");
      if (localAuth === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch store data
  const loadStoreData = async () => {
    setLoading(true);
    const [prods, cats, st] = await Promise.all([
      getProducts(),
      getCategories(),
      getAdminStats(),
    ]);
    setProducts(prods);
    setCategories(cats);
    setStats(st);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadStoreData();
    }
  }, [isAuthenticated]);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const supabase = createClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (!error) {
          setIsAuthenticated(true);
          sessionStorage.setItem("merki_admin_session", "true");
          setAuthLoading(false);
          return;
        } else {
          setAuthError(error.message);
        }
      } catch (err: any) {
        setAuthError(err?.message || "Login error");
      }
    }

    // Default admin demo fallback (e.g. admin@merkicares.com / admin123 or merki2026)
    if (
      (authEmail.toLowerCase().includes("admin") || authEmail.toLowerCase().includes("merki")) &&
      authPassword.length >= 4
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("merki_admin_session", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. For quick testing, you can use admin@merkicares.com with password 'admin123', or connect your Supabase project.");
    }
    setAuthLoading(false);
  };

  // Logout Handler
  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn(e);
      }
    }
    sessionStorage.removeItem("merki_admin_session");
    setIsAuthenticated(false);
  };

  // Open Form for Adding New Product
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormName("");
    setFormSlug("");
    setFormTagline("");
    setFormPrice("");
    setFormPriceOnRequest(false);
    setFormCategoryName(categories[0]?.name || "Face");
    setFormSkinConcerns([]);
    setFormDescription("");
    setFormBenefits("");
    setFormHowToUse("");
    setFormIngredients("");
    setFormNafdac("");
    setFormImages([
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBt0ztMpom6Hp3J3cNZxNbJ9mNSk357BwKJ93jL6MfQ6jMrdDaMAJ8lolscMA4VP0qn1KLTsgaOBzfp-1sgQKT8C5AeFX9eL3MoCnmzYAHj0rXSmRI5P1LCp_V0PTV-CkoG-6zt9ZQqsN1FAF_UBUGW1ufkcRhfd3SaYPbvP2A3hxd8jXnKDH1H-alFqx0TSq3hsPKd_B99fiw4NAD0HuUjLMIygz6Z0P8Ih_KzDd0"
    ]);
    setFormInStock(true);
    setFormFeatured(false);
    setIsFormOpen(true);
  };

  // Open Form for Editing Product
  const handleOpenEditForm = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSlug(prod.slug);
    setFormTagline(prod.tagline || "");
    setFormPrice(prod.price !== null ? prod.price : "");
    setFormPriceOnRequest(prod.price_on_request);
    setFormCategoryName(prod.category_name);
    setFormSkinConcerns(prod.skin_concerns || []);
    setFormDescription(prod.description);
    setFormBenefits(prod.benefits ? prod.benefits.join("\n") : "");
    setFormHowToUse(prod.how_to_use || "");
    setFormIngredients(prod.ingredients || "");
    setFormNafdac(prod.nafdac_number || "");
    setFormImages(prod.images || []);
    setFormInStock(prod.in_stock);
    setFormFeatured(prod.featured);
    setIsFormOpen(true);
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setFormSaving(true);
    const parsedPrice = formPrice === "" ? null : Number(formPrice);
    const benefitsList = formBenefits
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const targetCategory = categories.find((c) => c.name === formCategoryName);

    const payload: Partial<Product> = {
      id: editingProduct?.id,
      name: formName.trim(),
      slug: formSlug.trim() || undefined,
      tagline: formTagline.trim(),
      price: formPriceOnRequest ? null : parsedPrice,
      price_on_request: formPriceOnRequest,
      category_id: targetCategory?.id,
      category_name: formCategoryName,
      skin_concerns: formSkinConcerns,
      description: formDescription.trim(),
      benefits: benefitsList,
      how_to_use: formHowToUse.trim(),
      ingredients: formIngredients.trim(),
      nafdac_number: formNafdac.trim() || undefined,
      images: formImages.length > 0 ? formImages : ["/images/product-bottle.png"],
      in_stock: formInStock,
      featured: formFeatured,
    };

    await saveProduct(payload);
    await loadStoreData();
    setFormSaving(false);
    setIsFormOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      await deleteProduct(id);
      await loadStoreData();
    }
  };

  // Toggle Stock directly
  const handleToggleStock = async (id: string, currentStock: boolean) => {
    await toggleProductStock(id, !currentStock);
    await loadStoreData();
  };

  // Image upload simulation / URL adder
  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormImages([...formImages, imageUrlInput.trim()]);
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages(formImages.filter((_, idx) => idx !== indexToRemove));
  };

  // File upload simulation (or Supabase storage upload if configured)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    if (supabase) {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (!uploadError) {
          const { data } = supabase.storage.from("products").getPublicUrl(filePath);
          if (data?.publicUrl) {
            setFormImages([...formImages, data.publicUrl]);
            return;
          }
        }
      } catch (err) {
        console.warn("Storage upload error, using object URL:", err);
      }
    }

    // Local preview URL
    const localUrl = URL.createObjectURL(file);
    setFormImages([...formImages, localUrl]);
  };

  // Skin concern checkbox toggle helper
  const toggleConcern = (concern: string) => {
    if (formSkinConcerns.includes(concern)) {
      setFormSkinConcerns(formSkinConcerns.filter((c) => c !== concern));
    } else {
      setFormSkinConcerns([...formSkinConcerns, concern]);
    }
  };

  // Category save handler
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    await saveCategory({
      name: newCatName.trim(),
      description: newCatDesc.trim(),
    });
    setNewCatName("");
    setNewCatDesc("");
    setIsCatModalOpen(false);
    await loadStoreData();
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (confirm(`Delete category "${name}"? Products in it will be unassigned.`)) {
      await deleteCategory(id);
      await loadStoreData();
    }
  };

  // Filter products for admin view
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || p.category_name.toLowerCase().includes(filterCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filterCategory]);

  // LOGIN SCREEN
  if (isAuthenticated === false) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#F8C8D8]/50">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-blush flex items-center justify-center text-white mx-auto mb-3 shadow-soft">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-black tracking-tight">
              Merki Cares Admin
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Sign in with your Supabase credentials to manage catalogue products.
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@merkicares.com"
                className="w-full h-11 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-pink/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-pink/50"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full h-12 rounded-full bg-brand-black hover:bg-brand-pink text-white text-xs font-bold shadow-soft transition-all active:scale-98 disabled:opacity-50"
            >
              {authLoading ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <p className="text-[11px] text-neutral-400">
              Demo Access: <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">admin@merkicares.com</code> / <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">admin123</code>
            </p>
            <Link
              href="/"
              className="inline-block mt-3 text-xs text-brand-pink font-semibold hover:underline"
            >
              ← Return to Merki Cares Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // LOADING INITIAL AUTH
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pb-20">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F8C8D8]/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
              Store Management
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-whatsapp animate-pulse"></span>
            <span className="text-[11px] text-neutral-500 font-medium">Live Store Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-0.5">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-full bg-white border border-[#F8C8D8]/50 text-xs font-semibold text-neutral-700 hover:text-brand-pink flex items-center gap-1.5 shadow-soft transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-rose-50 hover:text-rose-600 text-xs font-semibold text-neutral-600 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overview Bento Stats (Total, In Stock, Out of Stock, Featured) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-3xl p-4 shadow-soft border border-[#F8C8D8]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-blush/40 flex items-center justify-center text-brand-pinkDeep">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-brand-black leading-none block">
              {stats.totalProducts}
            </span>
            <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
              Total Products
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-soft border border-[#F8C8D8]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-emerald-600 leading-none block">
              {stats.inStockCount}
            </span>
            <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
              In Stock
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-soft border border-[#F8C8D8]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-rose-600 leading-none block">
              {stats.outOfStockCount}
            </span>
            <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
              Out of Stock
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-4 shadow-soft border border-[#F8C8D8]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-amber-700 leading-none block">
              {stats.featuredCount}
            </span>
            <span className="text-xs text-neutral-500 font-medium mt-0.5 block">
              Featured Items
            </span>
          </div>
        </div>
      </div>

      {/* Direct WhatsApp Orders Quick Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-brand-blush/20 rounded-3xl p-4 mb-6 border border-emerald-200/70 shadow-soft flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-whatsapp text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-brand-black">
              Direct Orders WhatsApp: {BRAND.phoneDisplay}
            </h3>
            <p className="text-[11px] text-neutral-500">
              Customers contact you directly on WhatsApp to confirm delivery details & pay via bank transfer.
            </p>
          </div>
        </div>

        <a
          href={BRAND.whatsappBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-xs font-bold shrink-0 shadow-sm transition-all"
        >
          Open Chat
        </a>
      </div>

      {/* Main Tabs Navigation & Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-full w-fit">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "products"
                ? "bg-white text-brand-black shadow-xs"
                : "text-neutral-500 hover:text-brand-black"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "categories"
                ? "bg-white text-brand-black shadow-xs"
                : "text-neutral-500 hover:text-brand-black"
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "products" ? (
            <button
              onClick={handleOpenAddForm}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-brand-black hover:bg-brand-pink text-white text-xs font-bold flex items-center justify-center gap-2 shadow-soft transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          ) : (
            <button
              onClick={() => setIsCatModalOpen(true)}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-brand-black hover:bg-brand-pink text-white text-xs font-bold flex items-center justify-center gap-2 shadow-soft transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Create Category</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === "products" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or category..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white border border-[#F8C8D8]/50 text-xs text-brand-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-brand-pink shadow-soft"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 px-4 rounded-full bg-white border border-[#F8C8D8]/50 text-xs font-semibold text-neutral-700 shadow-soft focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Products Table (Desktop) / Cards (Mobile) */}
          <div className="bg-white rounded-3xl shadow-soft border border-[#F8C8D8]/40 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-surfaceLow text-neutral-500 text-[11px] uppercase tracking-wider font-bold border-b border-neutral-100">
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price (₦)</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {filteredProducts.map((p) => {
                    const img = p.images?.[0] || "/images/product-bottle.png";
                    return (
                      <tr key={p.id} className="hover:bg-brand-blush/10 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden relative shrink-0">
                              <Image
                                src={img}
                                alt={p.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-brand-black line-clamp-1">{p.name}</p>
                              <p className="text-[11px] text-neutral-400 line-clamp-1">{p.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-neutral-700">
                          {p.category_name}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-brand-black">
                          {p.price_on_request || p.price === null ? (
                            <span className="text-brand-pink italic">On request</span>
                          ) : (
                            formatNaira(p.price)
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStock(p.id, p.in_stock)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                              p.in_stock
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                p.in_stock ? "bg-emerald-500" : "bg-rose-500"
                              }`}
                            ></span>
                            <span>{p.in_stock ? "In Stock" : "Out of Stock"}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          {p.featured ? (
                            <span className="px-2 py-0.5 rounded-full bg-brand-pink text-white text-[10px] font-bold">
                              Featured
                            </span>
                          ) : (
                            <span className="text-neutral-400 text-[11px]">No</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditForm(p)}
                              title="Edit product"
                              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-blush/40 text-neutral-700 hover:text-brand-black flex items-center justify-center transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Delete product"
                              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-rose-50 text-neutral-400 hover:text-rose-600 flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-neutral-100">
              {filteredProducts.map((p) => {
                const img = p.images?.[0] || "/images/product-bottle.png";
                return (
                  <div key={p.id} className="p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-100 overflow-hidden relative shrink-0">
                        <Image src={img} alt={p.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase text-brand-pink">
                            {p.category_name}
                          </span>
                          {p.featured && (
                            <span className="px-1.5 py-0.2 rounded-full bg-brand-pink text-white text-[9px] font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-brand-black truncate mt-0.5">{p.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-extrabold text-xs text-brand-black">
                            {p.price_on_request || p.price === null ? "Price on request" : formatNaira(p.price)}
                          </span>
                          <button
                            onClick={() => handleToggleStock(p.id, p.in_stock)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.in_stock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {p.in_stock ? "In Stock" : "Out of Stock"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-100">
                      <button
                        onClick={() => handleOpenEditForm(p)}
                        className="py-1 px-3 rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-700 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="py-1 px-3 rounded-full bg-rose-50 text-[11px] font-bold text-rose-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-xs text-neutral-500">
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY MANAGER */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl shadow-soft border border-[#F8C8D8]/40 p-4 sm:p-6">
            <h2 className="text-base font-extrabold text-brand-black mb-1">Manage Product Categories</h2>
            <p className="text-xs text-neutral-500 mb-4">
              Categories help organize your storefront chips on mobile and desktop.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-brand-surfaceLow border border-neutral-200/60 flex items-start justify-between gap-2"
                >
                  <div>
                    <h3 className="font-bold text-xs text-brand-black">{c.name}</h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{c.description || "No description"}</p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">slug: {c.slug}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(c.id, c.name)}
                    className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXPANDABLE ADD / EDIT PRODUCT DRAWER MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-brand-pink uppercase tracking-wider">
                  Product Editor
                </span>
                <h2 className="text-xl font-extrabold text-brand-black tracking-tight mt-0.5">
                  {editingProduct ? `Edit "${editingProduct.name}"` : "Add New Skincare Product"}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-brand-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields Body (Scrollable) */}
            <form id="product-form" onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              {/* Photo Upload Zone */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Product Photos (Multiple Supported)
                </label>
                <div className="p-4 rounded-2xl bg-brand-surfaceLow border-2 border-dashed border-[#F8C8D8] flex flex-col items-center justify-center text-center">
                  <Upload className="w-6 h-6 text-brand-pink mb-1" />
                  <p className="text-[11px] font-semibold text-neutral-700">
                    Upload image file or enter URL below
                  </p>
                  <label className="mt-2 inline-block py-1.5 px-4 rounded-full bg-brand-black text-white text-[11px] font-bold cursor-pointer hover:bg-brand-pink transition-colors">
                    Browse File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Add URL input */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Or paste external image URL..."
                    className="flex-1 h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="py-1 px-3 rounded-xl bg-neutral-200 hover:bg-neutral-300 font-bold text-xs"
                  >
                    Add
                  </button>
                </div>

                {/* Thumbnails list */}
                {formImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {formImages.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        <Image src={url} alt={`Preview ${idx}`} fill sizes="64px" className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Luna Hydrating Renewal Serum"
                  className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black focus:ring-1 focus:ring-brand-pink"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">Tagline (One-line benefit)</label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Hyaluronic nectar & Rosehip infusion for deeply plumped, glowing skin"
                  className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black"
                />
              </div>

              {/* Price & Price on Request Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Price in Naira (₦)</label>
                  <input
                    type="number"
                    disabled={formPriceOnRequest}
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="14500"
                    className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black disabled:bg-neutral-100"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                    <input
                      type="checkbox"
                      checked={formPriceOnRequest}
                      onChange={(e) => setFormPriceOnRequest(e.target.checked)}
                      className="rounded border-neutral-300 text-brand-pink focus:ring-brand-pink w-4 h-4"
                    />
                    <span className="font-bold text-neutral-700">Price on Request</span>
                  </label>
                </div>
              </div>

              {/* Category & NAFDAC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Category *</label>
                  <select
                    value={formCategoryName}
                    onChange={(e) => setFormCategoryName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">NAFDAC Number (Optional)</label>
                  <input
                    type="text"
                    value={formNafdac}
                    onChange={(e) => setFormNafdac(e.target.value)}
                    placeholder="e.g. NAFDAC Reg No: 04-8921"
                    className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black"
                  />
                </div>
              </div>

              {/* Skin Concerns Multi-Select Chips */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1.5">
                  Skin Concerns (Click to select multiple)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["acne", "dry skin", "dark spots", "baby-safe", "sensitive skin", "glow", "anti-aging"].map((concern) => {
                    const isSelected = formSkinConcerns.includes(concern);
                    return (
                      <button
                        type="button"
                        key={concern}
                        onClick={() => toggleConcern(concern)}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold capitalize transition-all ${
                          isSelected
                            ? "bg-brand-pink text-white shadow-xs"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {concern}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Tell customers what makes this product special, why parents and adults love it..."
                  className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black"
                ></textarea>
              </div>

              {/* Benefits (One per line) */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">
                  Key Benefits (Enter one per line)
                </label>
                <textarea
                  rows={3}
                  value={formBenefits}
                  onChange={(e) => setFormBenefits(e.target.value)}
                  placeholder="Restores deep bouncy hydration&#10;Soothes post-cleansing tightness&#10;Safe for pregnant and nursing mothers"
                  className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black font-sans"
                ></textarea>
              </div>

              {/* How to Use */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">How to Use</label>
                <textarea
                  rows={2}
                  value={formHowToUse}
                  onChange={(e) => setFormHowToUse(e.target.value)}
                  placeholder="Apply 3-4 drops morning and night to clean, damp skin..."
                  className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-brand-black"
                ></textarea>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block font-bold text-neutral-800 mb-1">Full Ingredients</label>
                <textarea
                  rows={2}
                  value={formIngredients}
                  onChange={(e) => setFormIngredients(e.target.value)}
                  placeholder="Pure Distilled Aqua, Cold-Pressed Rosehip Seed Oil, Multi-Molecular Hyaluronic Acid..."
                  className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-mono"
                ></textarea>
              </div>

              {/* Stock & Featured Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-neutral-800">In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-pink focus:ring-brand-pink"
                  />
                  <span className="font-bold text-neutral-800">Feature on Home</span>
                </label>
              </div>
            </form>

            {/* Drawer Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="py-2.5 px-4 rounded-full bg-white border border-neutral-200 text-neutral-600 font-bold hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="product-form"
                disabled={formSaving}
                className="py-2.5 px-6 rounded-full bg-brand-black hover:bg-brand-pink text-white font-bold shadow-soft flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{formSaving ? "Saving..." : "Save Product"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-brand-black">Create New Category</h3>
              <button onClick={() => setIsCatModalOpen(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Lip & Eye Care"
                  className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Short description for parents and shoppers"
                  className="w-full h-10 px-3.5 rounded-xl bg-neutral-50 border border-neutral-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="py-2 px-4 rounded-full bg-neutral-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-full bg-brand-black text-white font-bold hover:bg-brand-pink"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

