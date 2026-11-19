"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MessageCircle, 
  Instagram, 
  Heart, 
  Sparkles, 
  Truck, 
  CreditCard, 
  ChevronDown, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck,
  Baby
} from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AboutAndContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How do I place an order on Merki Cares?",
      a: "We keep ordering wonderfully personal! Simply tap any 'Order on WhatsApp' button across our catalogue. It opens your WhatsApp with a pre-filled message specifying the product and price. We'll confirm item availability, take your delivery address, and provide account details for payment.",
    },
    {
      q: "How does payment work if there's no checkout button?",
      a: "Payment is made via direct Bank Transfer to our official Merki Cares business account once your order details and delivery fees are agreed upon in WhatsApp chat. We verify your transfer immediately and issue an instant dispatch receipt.",
    },
    {
      q: "Where do you deliver to and how much does it cost?",
      a: "We deliver nationwide across all 36 Nigerian states! Within Lagos, riders dispatch same-day or next-day (₦2,500 – ₦4,000 depending on mainland or island location). Outside Lagos, we deliver via reliable interstate park delivery or GIG/Peace logistics (₦3,500 – ₦5,500, taking 2 to 4 business days).",
    },
    {
      q: "Are Merki Cares formulas safe for babies and newborns?",
      a: "Yes! Our Baby & Kids collection (including our Baby Calming Oat & Shea Cocoon) is strictly formulated with organic Grade-A Nilotica shea butter, colloidal oatmeal, and pure calendula. They are 100% free of artificial perfumes, petroleum, phthalates, and harsh chemicals, and pediatrician tested.",
    },
    {
      q: "What products do you recommend for post-pregnancy dark spots or melasma?",
      a: "Postpartum dark spots and hormonal hyperpigmentation are very common! We recommend pairing our Clarifying Niacinamide & Zinc Glow Elixir with the Luna Hydrating Renewal Serum and Hydra-Shield SPF 50 Mineral Sunscreen. Chat with Merki on WhatsApp for a personalized routine tailored to whether you are currently nursing.",
    },
    {
      q: "Are your products registered with NAFDAC?",
      a: "Yes, our formulations adhere strictly to NAFDAC safety guidelines and quality manufacturing practices in Nigeria. Our key commercial lines carry individual NAFDAC registration numbers visible on product packaging and detail pages.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 pb-20">
      {/* 1. Header Banner */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-blush/40 text-brand-pinkDeep text-xs font-bold mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 text-brand-pink" />
          <span>Rooted in Care • Lagos, Nigeria</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
          Our Story & How to Reach Us
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
          Created with tender love for weary parents, busy adults, and delicate skin across Nigeria. No artificial stress, no robotic checkouts—just honest care and human conversation.
        </p>
      </section>

      {/* 2. Brand Story Card with Apothecary Photo */}
      <section className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-card border border-[#F8C8D8]/40 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-brand-surfaceLow shadow-soft">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNylPS2mHZkUt2ivz8hSBNaItbLuraix-7DhemiDHGdBvfQUYcq1k4wFq_j3VR_OcVxWOnaNHGF3iDrihyAUc9MfqwRwnIzkeeDIlQOfD9usNlKKlURp-DXNWDNxfZvgk_PQaWd7GG352PgGiWfDAHgDUdcjk2LWGKXDMZtqRUCIQmTh1zN7A5vr0VHYpyk1lmsgOiFFNKDyp_Q9pKvEdSgUYJzOfMExorXgZZzus"
              alt="Merki Cares handcrafted gentle botanical remedies on cozy woven linen"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-black shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-whatsapp animate-pulse"></span>
              <span>Small-batch Botanicals</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
              Why Merki Cares Was Born
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight leading-snug">
              "Your vanity should be a sigh of relief, not another chore on your checklist."
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Merki Cares began from a simple truth: adult life and parenting in Nigeria are deeply rewarding, but they leave your skin exhausted. Between humid Lagos traffic, erratic power, and sleepless nights with teething toddlers, nobody has time for a complex 10-step routine filled with harsh bleaching chemicals.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We formulated mindful, clean botanical skincare designed to deliver instant barrier relief, calm hyperpigmentation gently, and safely nourish your family. When you order from us, you aren't talking to a computer—you're chatting with a human who genuinely cares about your skin.
            </p>

            <div className="p-3.5 bg-brand-surfaceLow rounded-2xl flex items-center gap-3 border border-brand-blush/20">
              <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center shrink-0 text-brand-pink">
                <Heart className="w-4 h-4" />
              </div>
              <p className="text-xs text-neutral-700 italic">
                "Skin that feels loved, heals faster." — Founder, Merki Cares
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Delivery & Payment Information Pillars */}
      <section className="mb-14">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
            Hassle-Free & Clear
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-1">
            Delivery & Payment Guide
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Everything you need to know about getting your Merki Cares package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Lagos Delivery */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-blush/40 flex items-center justify-center text-brand-pinkDeep">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-brand-black">
              Lagos Fast Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Orders placed before 12:00 PM are dispatched for same-day delivery via reliable bike couriers. Island & Mainland delivery ranges from ₦2,500 to ₦4,000 depending on exact address.
            </p>
          </div>

          {/* Card 2: Interstate Delivery */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-brand-black">
              Nationwide States Delivery
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We ship across Abuja, Port Harcourt, Ibadan, Enugu, Kano, and all 36 states via park logistics (Peace, ABC, Young Shall Grow) or doorstep courier (GIG Logistics) within 2–4 business days.
            </p>
          </div>

          {/* Card 3: Bank Payment */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-[#F8C8D8]/40 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-brand-black">
              Safe Bank Transfer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              No credit card numbers or risky payment portals required. You transfer directly to our verified Merki Cares bank account once your order details are confirmed on WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Connect With Us / Action Buttons Banner */}
      <section className="bg-gradient-to-r from-brand-charcoal to-[#111111] text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 mb-14 shadow-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blush">
              Have A Skin Concern?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Talk Directly with Merki Cares
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
              Whether you are battling adult acne, post-baby skin changes, or choosing a safe balm for your infant, we're right here to chat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`${BRAND.whatsappBaseUrl}?text=Hello%20Merki%20Cares!%20I'm%20reaching%20out%20for%20a%20skin%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-whatsapp transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp ({BRAND.phoneDisplay})</span>
            </a>

            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand-blush" />
              <span>Instagram @{BRAND.instagramHandle}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ Accordion) */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Everything you want to know about our products, delivery, and ingredients.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#F8C8D8]/40 shadow-soft overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-brand-black hover:text-brand-pink transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-pink shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-pink" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

