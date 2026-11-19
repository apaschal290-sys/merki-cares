export const BRAND = {
  name: "Merki Cares",
  shortName: "Merki Cares",
  phoneDisplay: "08109686444",
  phoneRaw: "2348109686444",
  instagramHandle: "merkicares",
  instagramUrl: "https://instagram.com/merkicares",
  whatsappBaseUrl: "https://wa.me/2348109686444",
  tagline: "Gentle Botanical Care for Adults, Parents & Babies",
  location: "Lagos, Nigeria (Nationwide Delivery)",
  deliveryNote: "Orders confirmed on WhatsApp. Bank transfer payment upon confirmation.",
};

export const SKIN_CONCERNS = [
  { id: "all", label: "All Concerns" },
  { id: "acne", label: "Acne & Blemishes" },
  { id: "dry skin", label: "Dry & Dehydrated" },
  { id: "dark spots", label: "Dark Spots & Glow" },
  { id: "baby-safe", label: "Baby-Safe & Gentle" },
  { id: "sensitive skin", label: "Sensitive & Eczema" },
];

export const CATEGORIES_LIST = [
  { id: "all", name: "All Skincare", slug: "all" },
  { id: "face", name: "Face", slug: "face" },
  { id: "body", name: "Body", slug: "body" },
  { id: "baby-kids", name: "Baby & Kids", slug: "baby-kids" },
  { id: "hair-scalp", name: "Hair & Scalp", slug: "hair-scalp" },
];

export function formatNaira(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "Price on request";
  }
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function buildWhatsAppOrderUrl(productName: string, price: number | null, priceOnRequest: boolean): string {
  let message = "";
  if (priceOnRequest || price === null) {
    message = `Hello Merki Cares, I want to inquire about ${productName}. Please confirm price and availability.`;
  } else {
    message = `Hello Merki Cares, I want to order ${productName} – ${formatNaira(price)}. Please confirm availability.`;
  }
  return `${BRAND.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppConsultUrl(): string {
  const message = `Hello Merki Cares! I would like to get a personalized skincare recommendation for myself/my family.`;
  return `${BRAND.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

