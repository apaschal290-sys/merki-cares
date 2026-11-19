import { Sparkles, Baby, Truck, ShieldCheck, HeartHandshake } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Sparkles,
      title: "Clean Botanicals",
      subtitle: "Zero harsh bleaches or fillers",
      color: "bg-brand-blush/40 text-brand-pinkDeep",
    },
    {
      icon: Baby,
      title: "Family & Baby Safe",
      subtitle: "Gentle for newborns & tired parents",
      color: "bg-amber-100/70 text-amber-800",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      subtitle: "Fast dispatch across all 36 states",
      color: "bg-blue-100/70 text-blue-800",
    },
    {
      icon: HeartHandshake,
      title: "WhatsApp Care",
      subtitle: "Instant human guidance & advice",
      color: "bg-emerald-100/70 text-emerald-800",
    },
  ];

  return (
    <section className="py-6 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-soft border border-[#F8C8D8]/20 flex items-center gap-3 transition-transform hover:-translate-y-0.5 duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${badge.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-brand-black leading-tight truncate">
                    {badge.title}
                  </span>
                  <span className="text-[11px] text-neutral-500 leading-snug line-clamp-1">
                    {badge.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

