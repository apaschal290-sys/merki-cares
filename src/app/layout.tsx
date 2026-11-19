import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/constants";

export const viewport: Viewport = {
  themeColor: "#F8C8D8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Merki Cares | Gentle Skincare Catalogue for Parents & Adults Nigeria",
    template: "%s | Merki Cares",
  },
  description:
    "Discover pure, gentle botanical skincare for tired parents, busy adults, and tender baby skin in Nigeria. Order directly on WhatsApp (08109686444) or Instagram @merkicares. Fast nationwide delivery.",
  keywords: [
    "Merki Cares",
    "skincare Nigeria",
    "gentle baby skincare Lagos",
    "order skincare on whatsapp Nigeria",
    "hyaluronic serum Nigeria",
    "colloidal oatmeal baby butter Nigeria",
    "postpartum skincare Nigeria",
  ],
  authors: [{ name: "Merki Cares" }],
  creator: "Merki Cares",
  publisher: "Merki Cares",
  metadataBase: new URL("https://merkicares.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://merkicares.com",
    siteName: "Merki Cares Skincare",
    title: "Merki Cares | Gentle Skincare Catalogue",
    description:
      "Nourishing botanical essentials formulated lovingly for delicate parental skin, tired complexions, and busy adult mornings in Nigeria. Chat & order directly on WhatsApp.",
    images: [
      {
        url: "/images/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Merki Cares Gentle Skincare Essentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merki Cares | Gentle Skincare Catalogue",
    description: "Gentle skincare for parents & adults in Nigeria. Order directly on WhatsApp (08109686444).",
    images: ["/images/hero-home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF9F5] text-[#1B1C1A] selection:bg-[#F8C8D8] selection:text-[#111111] antialiased">
        <Navbar />
        <main className="flex-1 pt-24 sm:pt-28 pb-16 md:pb-0">
          {children}
        </main>
        <FloatingWhatsApp />
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}

