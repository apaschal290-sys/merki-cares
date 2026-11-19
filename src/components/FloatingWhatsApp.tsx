"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultUrl = `${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I%20have%20a%20question%20about%20your%20skincare%20products%20and%20would%20like%20to%20order.`;

  return (
    <div className="fixed bottom-20 md:bottom-7 right-4 md:right-7 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {/* Friendly Reassurance Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto max-w-[240px] bg-white rounded-2xl p-3 shadow-float border border-[#F8C8D8]/60 text-xs text-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss message"
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-brand-black mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-whatsapp animate-pulse"></span>
            <span>Online Skincare Support</span>
          </div>
          <p className="text-[11px] leading-tight text-neutral-600 mb-2">
            Need advice for your baby or skin concerns? Chat directly with us.
          </p>
          <a
            href={defaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] font-bold text-brand-whatsapp hover:underline"
          >
            Start Chat on WhatsApp →
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Circular Button */}
      <a
        href={defaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (08109686444)"
        className="pointer-events-auto w-14 h-14 rounded-full bg-brand-whatsapp text-white flex items-center justify-center shadow-whatsapp hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-7 h-7 fill-white group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
}

