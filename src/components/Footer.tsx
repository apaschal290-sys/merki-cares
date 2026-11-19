import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { MessageCircle, Instagram, Sparkles, Heart, Shield, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-14 pb-24 md:pb-14 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-pink to-brand-blush flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Merki Cares
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Warm, honest botanical skincare thoughtfully formulated for busy parents, delicate baby skin, and everyday adult wellness in Nigeria.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={BRAND.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-brand-whatsapp text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-brand-pink text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blush">
              Catalogue Pages
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop All Skincare
                </Link>
              </li>
              <li>
                <Link href="/shop?category=face" className="hover:text-white transition-colors">
                  Facial Serums & Elixirs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=baby-kids" className="hover:text-white transition-colors">
                  Baby & Kids Cocoon
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Story & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery & Ordering Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blush">
              Delivery & Orders
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-white">Lagos Delivery:</strong> Same-day or next-day direct dispatch (₦2,500 – ₦4,000 depending on area).
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-white">Interstate Delivery:</strong> Reliable park pickup / GIG / Peace across all Nigerian states (2–4 business days).
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong className="text-white">Payment:</strong> Instant Bank Transfer confirmed on WhatsApp before dispatch.
            </p>
          </div>

          {/* WhatsApp Direct Line & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blush">
              Order Directly
            </h4>
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-brand-whatsapp animate-pulse"></span>
                <span>Direct WhatsApp Line</span>
              </div>
              <p className="text-xs text-neutral-400">
                Call or chat with Merki:
              </p>
              <a
                href={BRAND.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-extrabold text-brand-whatsapp hover:underline"
              >
                {BRAND.phoneDisplay}
              </a>
              <p className="text-[10px] text-neutral-500">
                Instagram DM: @{BRAND.instagramHandle}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {BRAND.name}. Formulated with love in Lagos, Nigeria.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-neutral-400">
              NAFDAC-conscious botanical formulas
            </span>
            <span className="text-neutral-700">•</span>
            <Link
              href="/admin"
              className="text-neutral-500 hover:text-brand-blush flex items-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

