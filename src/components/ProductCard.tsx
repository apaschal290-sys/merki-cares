"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatNaira, buildWhatsAppOrderUrl } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppOrderUrl(
    product.name,
    product.price,
    product.price_on_request
  );

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/images/product-bottle.png";

  return (
    <div className="group bg-white rounded-3xl p-3 sm:p-4 shadow-soft hover:shadow-card transition-all duration-300 border border-[#F8C8D8]/30 flex flex-col justify-between relative overflow-hidden">
      {/* Top Image & Badges */}
      <div>
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-brand-surfaceLow mb-3">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-brand-pink text-white text-[10px] sm:text-xs font-bold tracking-tight shadow-sm">
                Bestseller
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-brand-black text-[10px] font-semibold tracking-tight shadow-xs">
              {product.category_name}
            </span>
          </div>

          {/* Stock Status Badge */}
          <div className="absolute top-2 right-2 z-10">
            {product.in_stock ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50/95 backdrop-blur-md text-rose-700 text-[10px] font-bold shadow-xs">
                <AlertCircle className="w-3 h-3 text-rose-500" />
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-1 px-1">
          {/* Skin Concerns Chips */}
          {product.skin_concerns && product.skin_concerns.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {product.skin_concerns.slice(0, 2).map((concern) => (
                <span
                  key={concern}
                  className="text-[10px] text-neutral-500 bg-brand-surfaceLow px-2 py-0.5 rounded-full capitalize"
                >
                  {concern}
                </span>
              ))}
            </div>
          )}

          <Link href={`/products/${product.slug}`} className="group-hover:text-brand-pink transition-colors">
            <h3 className="font-bold text-sm sm:text-base text-brand-black line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {product.tagline && (
            <p className="text-xs text-neutral-500 line-clamp-1 leading-relaxed">
              {product.tagline}
            </p>
          )}

          {/* Price Display */}
          <div className="mt-2 flex items-baseline justify-between">
            {product.price_on_request || product.price === null ? (
              <span className="text-sm font-bold text-brand-pink italic">
                Price on request
              </span>
            ) : (
              <span className="text-base sm:text-lg font-extrabold text-brand-black tracking-tight">
                {formatNaira(product.price)}
              </span>
            )}

            <Link
              href={`/products/${product.slug}`}
              className="text-xs text-neutral-400 hover:text-brand-pink flex items-center gap-0.5 transition-colors"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Order Action Button */}
      <div className="mt-3.5 pt-2 border-t border-neutral-100/80">
        {product.in_stock ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-full bg-brand-whatsapp text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-brand-whatsappHover active:scale-98 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="truncate">
              {product.price_on_request ? "Inquire on WhatsApp" : "Order on WhatsApp"}
            </span>
          </a>
        ) : (
          <a
            href={`${whatsappUrl}&text=${encodeURIComponent(`Hello Merki Cares, I noticed ${product.name} is currently out of stock. When will it be restocked?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-neutral-500" />
            <span>Notify Me When In Stock</span>
          </a>
        )}
      </div>
    </div>
  );
}

