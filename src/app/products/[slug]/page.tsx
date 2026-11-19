import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import { INITIAL_PRODUCTS } from "@/lib/mockData";
import ProductDetailClient from "@/components/ProductDetailClient";
import { formatNaira } from "@/lib/constants";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Merki Cares",
      description: "The requested skincare product could not be found.",
    };
  }

  const priceText = product.price_on_request || product.price === null 
    ? "Price on request" 
    : formatNaira(product.price);

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/images/product-bottle.png";

  return {
    title: `${product.name} (${priceText}) | Merki Cares Skincare Nigeria`,
    description: `${product.tagline || product.description.slice(0, 150)}. Order directly on WhatsApp (08109686444) or Instagram @merkicares. Fast nationwide delivery.`,
    openGraph: {
      title: `${product.name} | Merki Cares Skincare`,
      description: product.tagline || product.description.slice(0, 160),
      images: [
        {
          url: mainImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Merki Cares`,
      description: product.tagline || product.description.slice(0, 140),
      images: [mainImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same category or other products
  const allProducts = await getProducts();
  const related = allProducts.filter(
    (p) => p.id !== product.id && (p.category_name === product.category_name || p.featured)
  );

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
