import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles, Heart, Baby, CheckCircle2, ShieldCheck, Instagram } from "lucide-react";
import { BRAND, formatNaira } from "@/lib/constants";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import InstagramSection from "@/components/InstagramSection";

export const revalidate = 60; // Refresh every 60 seconds

export default async function HomePage() {
  const featuredProducts = await getProducts({ featuredOnly: true });
  // Also get some top products if featured count is low
  const allProducts = await getProducts();
  const displayProducts = featuredProducts.length > 0 ? featuredProducts.slice(0, 4) : allProducts.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 pt-2 pb-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blush/40 border border-brand-blush text-brand-pinkDeep text-xs font-bold w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
              <span>Gentle, Honest Care for Parents & Grown-Ups</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-[1.15]">
              Skin care made soft, kind, and wonderfully simple.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Nourishing botanical essentials formulated lovingly for delicate parental skin, tired complexions, and busy adult mornings in Nigeria. No complicated logins or checkout friction—order right on WhatsApp.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I%20would%20like%20to%20order%20from%20your%20skincare%20catalogue.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 rounded-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-whatsapp active:scale-98 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>Order on WhatsApp ({BRAND.phoneDisplay})</span>
              </a>

              <Link
                href="/shop"
                className="py-4 px-6 rounded-full bg-white hover:bg-brand-blushLight border border-brand-blush/60 text-brand-black text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-soft transition-all"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="w-4 h-4 text-brand-pink" />
              </Link>
            </div>

            {/* Reassurance Micro-Copy */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-whatsapp" />
                Instant WhatsApp replies
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-whatsapp" />
                Custom tailored skin advice
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-whatsapp" />
                Same-day Lagos dispatch
              </span>
            </div>
          </div>

          {/* Hero Right Media / Visual Card */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-brand-surfaceLow shadow-card border border-[#F8C8D8]/50">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKl8adz0Y65tjKeFaYKcTo-XsrXbpBVUPmRTbX3d-WJJIIXhgMw85igVP_-BAdGNIyv7R98Sa24MfjkWXLeKmi-Zd8dq-n1JeFSh7RHHhtYnu7Haw_hgMw0HCA5cfnMTiV1KwxP7wRAebjVe8TBo-3rXEsie6i5UKgL8o2vv0W-uNG9GhwVWp030EkkVU7Ui1ljdfz0BiWWSN-TctzfKY7MllkpjqlB3yxYofsYaI"
                alt="Soft morning sunlight bathing Merki Cares botanical skincare flatlay"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Overlaid Floating Reassurance Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-brand-black text-xs font-bold shadow-soft">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-whatsapp animate-pulse"></span>
                  <span>Online for Skin Advice</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brand-pinkDeep text-xs font-semibold shadow-soft">
                  <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                  <span>100% Botanicals</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-pink">
              Curated With Love
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-1">
              Featured Skincare Essentials
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Top daily picks loved by Nigerian parents and wellness seekers.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-brand-pink hover:text-brand-pinkDeep transition-colors"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid (2 columns on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-white border border-brand-blush text-brand-black text-xs font-bold shadow-soft"
          >
            <span>Explore All Skincare Products ({allProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-pink" />
          </Link>
        </div>
      </section>

      {/* 4. EXPLORE BY ROUTINE / CATEGORY CARDS */}
      <section className="py-10 bg-white border-y border-[#F8C8D8]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-pink">
              Tailored For Your Family
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-1">
              Shop by Category
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Every formula is purposefully designed to heal, protect, and glow gently.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: "Face Care",
                desc: "Hydrating elixirs, serums & cleansers",
                href: "/shop?category=face",
                bg: "from-[#F8C8D8]/40 to-[#FCEBEB]",
                badge: "Adult Glow",
              },
              {
                title: "Body Care",
                desc: "Turmeric glow scrubs & whipped butters",
                href: "/shop?category=body",
                bg: "from-amber-100/50 to-orange-50",
                badge: "Even Tone",
              },
              {
                title: "Baby & Kids",
                desc: "Colloidal oat cocoons & cradle cap care",
                href: "/shop?category=baby-kids",
                bg: "from-rose-100/50 to-pink-50",
                badge: "Hypoallergenic",
              },
              {
                title: "Hair & Scalp",
                desc: "Rosemary & castor postpartum drops",
                href: "/shop?category=hair-scalp",
                bg: "from-emerald-100/40 to-teal-50",
                badge: "Regrowth",
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className={`group p-4 sm:p-5 rounded-3xl bg-gradient-to-br ${cat.bg} border border-[#F8C8D8]/30 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/80 text-[10px] font-bold text-neutral-700 mb-3 shadow-xs">
                    {cat.badge}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-brand-black group-hover:text-brand-pink transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-brand-black group-hover:text-brand-pink transition-colors gap-1">
                  <span>Shop range</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY MERKI CARES HIGHLIGHT */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-gradient-to-br from-brand-charcoal to-[#111111] text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/20 text-brand-blush text-xs font-bold mb-3">
              <Heart className="w-3.5 h-3.5 text-brand-pink" />
              <span>The Merki Cares Difference</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              "No complicated logins. Just caring advice and formulas that work."
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              In Nigeria, your skin goes through a lot: hot tropical humidity, harsh tap water, and stressful workdays. We formulated gentle botanical remedies that hydrate, calm, and protect without the stress of artificial fragrances, toxic hydroquinone, or complicated web checkouts.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I'd%20like%20to%20get%20a%20free%20routine%20recommendation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-sm flex items-center justify-center gap-2 shadow-whatsapp transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Merki on WhatsApp</span>
              </a>
              <Link
                href="/about"
                className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Read Our Story & FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM COMMUNITY SECTION */}
      <InstagramSection />
    </div>
  );
}

