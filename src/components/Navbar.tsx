"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  Instagram, 
  ShieldCheck, 
  ShoppingBag,
  Heart
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop Skincare", href: "/shop" },
    { name: "About & Contact", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#F8C8D8]/40 shadow-sm transition-all">
        {/* Top Announcement Bar */}
        <div className="bg-[#111111] text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-whatsapp animate-pulse"></span>
          <span>Fast Nationwide Delivery Across Nigeria • Order Directly on WhatsApp</span>
          <span className="hidden sm:inline text-white/50">•</span>
          <span className="hidden sm:inline text-brand-blush">Lagos Same-Day Dispatch</span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-pink to-brand-blush flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-black leading-none group-hover:text-brand-pink transition-colors">
                Merki Cares
              </span>
              <span className="text-[10px] tracking-wider uppercase text-neutral-500 font-medium mt-0.5">
                Gentle Skincare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? "bg-brand-pink/15 text-brand-pink font-bold"
                      : "text-neutral-700 hover:text-brand-black hover:bg-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              aria-label="Search Catalog"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-brand-pink hover:bg-brand-blushLight shadow-sm transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @merkicares"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-brand-pink hover:bg-brand-blushLight shadow-sm transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Desktop WhatsApp CTA */}
            <a
              href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I'd%20like%20to%20inquire%20about%20your%20skincare%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-brand-whatsapp text-white text-xs font-bold shadow-whatsapp hover:bg-brand-whatsappHover transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp: {BRAND.phoneDisplay}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-800 shadow-sm hover:bg-brand-blushLight transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#F8C8D8]/50 px-6 py-5 shadow-lg flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? "bg-brand-blush/30 text-brand-pink font-bold"
                      : "text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-brand-pink"></span>}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <a
                href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I%20would%20like%20to%20order%20or%20ask%20for%20skincare%20advice.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-full bg-brand-whatsapp text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat & Order on WhatsApp</span>
              </a>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-center text-xs text-neutral-500 hover:text-brand-black transition-colors"
              >
                Admin Store Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

