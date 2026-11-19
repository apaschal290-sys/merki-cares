"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, MessageCircle, Info, Shield } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function BottomNav() {
  const pathname = usePathname();

  // If in admin dashboard, we let admin have its own navigation
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const items = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Sparkles,
      isActive: pathname.startsWith("/shop") || pathname.startsWith("/products"),
    },
    {
      label: "About",
      href: "/about",
      icon: Info,
      isActive: pathname.startsWith("/about"),
    },
    {
      label: "WhatsApp",
      href: `${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I'm%20visiting%20your%20catalogue%20and%20would%20like%20to%20order%20or%20ask%20a%20question.`,
      icon: MessageCircle,
      isExternal: true,
      highlight: true,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#F8C8D8]/50 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl text-brand-whatsapp active:scale-95 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-brand-whatsapp/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 fill-brand-whatsapp text-brand-whatsapp" />
                </div>
                <span className="text-[11px] font-bold text-brand-whatsapp">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                item.isActive
                  ? "text-brand-pink font-bold"
                  : "text-neutral-500 hover:text-brand-black"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  item.isActive ? "bg-brand-blush/40" : "bg-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              </div>
              <span className="text-[11px] tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

