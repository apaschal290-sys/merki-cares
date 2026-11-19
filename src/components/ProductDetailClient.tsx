"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { 
  MessageCircle, 
  Instagram, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  AlertCircle,
  Share2,
  Check
} from "lucide-react";
import { Product } from "@/types";
import { BRAND, formatNaira, buildWhatsAppOrderUrl } from "@/lib/constants";
import ProductCard from "./ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const images = product.images && product.images.length > 0
    ? product.images
    : ["/images/product-bottle.png"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const whatsappUrl = buildWhatsAppOrderUrl(
    product.name,
    product.price,
    product.price_on_request
  );

  const instagramInquiryUrl = `${BRAND.instagramUrl}`;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: `${product.name} | Merki Cares`,
        text: `Check out ${product.name} on Merki Cares Skincare!`,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pb-20">
      {/* Top Breadcrumb & Share Navigation */}
      <div className="flex items-center justify-between mb-6">
        <NextLink
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-600 hover:text-brand-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Skincare Catalogue</span>
        </NextLink>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F8C8D8]/50 text-xs font-semibold text-neutral-700 hover:bg-brand-blushLight shadow-soft transition-colors"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-brand-pink" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>

      {/* Main 2-Column Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* Main Large Display Image */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-brand-surfaceLow shadow-card border border-[#F8C8D8]/40 flex items-center justify-center">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={`${product.name} angle ${activeImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
            />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.featured && (
                <span className="px-3 py-1 rounded-full bg-brand-pink text-white text-xs font-bold shadow-soft">
                  Bestseller
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-black text-xs font-bold shadow-soft">
                {product.category_name}
              </span>
            </div>

            {/* Stock Tag */}
            <div className="absolute top-4 right-4 z-10">
              {product.in_stock ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow-soft">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  Ready to Dispatch
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-soft">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Currently Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Multiple View Thumbnail Switcher */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto p-1 no-scrollbar">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-brand-surfaceLow border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-brand-pink shadow-soft scale-102"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Detail Information & WhatsApp Order Action */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Category & NAFDAC Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-brand-pink">
                Merki Cares Botanicals • {product.category_name}
              </span>
              {product.nafdac_number && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.nafdac_number}</span>
                </span>
              )}
            </div>

            {/* Product Name & Tagline */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-sm sm:text-base text-neutral-600 mt-1 leading-relaxed">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-3xl bg-white border border-[#F8C8D8]/50 shadow-soft flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                  Retail Price
                </span>
                {product.price_on_request || product.price === null ? (
                  <span className="text-2xl font-extrabold text-brand-pink italic">
                    Price on request
                  </span>
                ) : (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-brand-black tracking-tight">
                      {formatNaira(product.price)}
                    </span>
                    <span className="text-xs text-neutral-500">
                      (Naira)
                    </span>
                  </div>
                )}
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-600 block">
                  {product.in_stock ? "Available for Order" : "Pre-order on WhatsApp"}
                </span>
                <span className="text-[11px] text-neutral-400">
                  Lagos & Interstate shipping
                </span>
              </div>
            </div>

            {/* Skin Concerns Tags */}
            {product.skin_concerns && product.skin_concerns.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Formulated for Concerns:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.skin_concerns.map((concern) => (
                    <span
                      key={concern}
                      className="px-3 py-1 rounded-full bg-brand-blush/40 text-brand-pinkDeep text-xs font-semibold capitalize"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-whatsapp active:scale-98 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>
                  {product.price_on_request
                    ? "Inquire on WhatsApp (08109686444)"
                    : `Order on WhatsApp – ${formatNaira(product.price)}`}
                </span>
              </a>

              <a
                href={`${BRAND.instagramUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-white hover:bg-brand-blushLight border border-brand-blush/60 text-brand-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-soft transition-all"
              >
                <Instagram className="w-4 h-4 text-brand-pink" />
                <span>Inquire on Instagram (@{BRAND.instagramHandle})</span>
              </a>
            </div>

            {/* Pre-filled Message Note */}
            <p className="text-center text-[11px] text-neutral-500 leading-normal">
              💬 Tapping "Order on WhatsApp" automatically opens WhatsApp with:
              <br />
              <em className="text-neutral-700 font-medium">
                "{product.price_on_request || product.price === null 
                  ? `Hello Merki Cares, I want to inquire about ${product.name}. Please confirm price and availability.`
                  : `Hello Merki Cares, I want to order ${product.name} – ${formatNaira(product.price)}. Please confirm availability.`}"
              </em>
            </p>

            {/* Trust Reassurance Box */}
            <div className="bg-brand-surfaceLow rounded-2xl p-4 text-xs space-y-2 border border-[#F8C8D8]/20">
              <div className="flex items-center gap-2 text-brand-black font-bold">
                <Truck className="w-4 h-4 text-brand-whatsapp" />
                <span>Delivery & Payment Information</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                • <strong>Lagos:</strong> Same-day dispatch to all mainland & island locations.
                <br />
                • <strong>States:</strong> Direct park parcel delivery or GIG courier across Nigeria (2–4 days).
                <br />
                • <strong>Payment:</strong> Simple bank transfer to Merki Cares official account upon chat confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Deep Dive Tabs / Accordion Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Section 1: Detailed Description & Benefits */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-4">
          <div className="flex items-center gap-2 text-brand-pink font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Why You'll Love It</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>
          {product.benefits && product.benefits.length > 0 && (
            <div className="pt-2 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-brand-black mb-2 uppercase tracking-wider">
                Key Benefits:
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-whatsapp shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 2: How to Use */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-4">
          <div className="flex items-center gap-2 text-brand-black font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-brand-pink" />
            <span>How to Apply</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
            {product.how_to_use || "Apply a small amount to clean, damp skin morning and night. Gently massage in upward circular motions until fully absorbed. Suitable for everyday parental routines."}
          </p>
          <div className="p-3 bg-brand-blush/30 rounded-2xl text-[11px] text-brand-pinkDeep font-medium">
            💡 <strong>Merki's Tip:</strong> For best results, use right after a warm shower or bath when skin pores are receptive to botanical hydration.
          </div>
        </div>

        {/* Section 3: Ingredients & Purity */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-4">
          <div className="flex items-center gap-2 text-brand-black font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Full Ingredients</span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed break-words font-mono">
            {product.ingredients || "Pure Botanical Distillates, Cold-Pressed Vegetable Oils, Natural Moisturizing Factors, Vitamin Complex, Eco-Certified Preservative System."}
          </p>
          <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 leading-snug">
            ✓ 100% Free from hydroquinone, harsh mercury, corticosteroids, parabens, and synthetic dyes.
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-neutral-200/60">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-pink">
                Pair It With
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-black tracking-tight mt-1">
                You May Also Like
              </h2>
            </div>
            <NextLink
              href="/shop"
              className="text-xs font-bold text-brand-pink hover:underline"
            >
              View full shop →
            </NextLink>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
