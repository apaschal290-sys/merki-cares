import Image from "next/image";
import { Instagram, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function InstagramSection() {
  const posts = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpTxRuJ8U03jhe3-cd5VnQAU7_VjWShx0a7N89L0upPzmnUyPC9wuJhubCNcFmmLys8BBDzjcFsn5WuSUfYfgKPCrL8lxdxNWpYmmJv__udbhfOZ0v-DMTAxsOwG8ZJFvCqLXeBSbvUf7TfAgU-d0Cqte9bc8fCLlnVo5Aph5MPbEbH0Z5leWttlEW8pAYyEonYLSVR1Hcooks0_t879-7nudLKMtlqvAeHDohtXM",
      caption: "Luna Serum morning ritual ✨",
      likes: "142",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNylPS2mHZkUt2ivz8hSBNaItbLuraix-7DhemiDHGdBvfQUYcq1k4wFq_j3VR_OcVxWOnaNHGF3iDrihyAUc9MfqwRwnIzkeeDIlQOfD9usNlKKlURp-DXNWDNxfZvgk_PQaWd7GG352PgGiWfDAHgDUdcjk2LWGKXDMZtqRUCIQmTh1zN7A5vr0VHYpyk1lmsgOiFFNKDyp_Q9pKvEdSgUYJzOfMExorXgZZzus",
      caption: "Baby bath time calm & comfort 🤍",
      likes: "219",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKl8adz0Y65tjKeFaYKcTo-XsrXbpBVUPmRTbX3d-WJJIIXhgMw85igVP_-BAdGNIyv7R98Sa24MfjkWXLeKmi-Zd8dq-n1JeFSh7RHHhtYnu7Haw_hgMw0HCA5cfnMTiV1KwxP7wRAebjVe8TBo-3rXEsie6i5UKgL8o2vv0W-uNG9GhwVWp030EkkVU7Ui1ljdfz0BiWWSN-TctzfKY7MllkpjqlB3yxYofsYaI",
      caption: "Our gentle botanical formulation room 🌿",
      likes: "305",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZmiPZa8z803oPmBxSJiO_Sk9eJwOscjpILp5C6XNKN_EmG6UMIT4Oq9bdcmSGVe62XIZRBdjCAZu0AGFHNZucQj8vOs9fga8nXl_KmK0dpQl-kFmWhHlK-X_MAYCiVhKza7c4vOGuCefvEAgnujfCWbLRK-GT8i--UepdpAr-WYCQ5pZl795RdHaA_lpGPZ_PMCNrIWxhhCzdH_-0YsW7WmCwbUhi8BwN1bGD2sM",
      caption: "Barrier repair for glowing, happy skin 🌸",
      likes: "188",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-transparent via-[#F8C8D8]/15 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/15 text-brand-pink text-xs font-bold mb-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>Join our community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
              Follow Us @{BRAND.instagramHandle}
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-md">
              Real Nigerian routines, parenting self-care moments, and honest skincare tips from our clinic to your vanity.
            </p>
          </div>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-black text-white hover:bg-brand-pink text-xs font-bold shadow-soft transition-all active:scale-95 shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* 4-Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-surfaceLow shadow-soft block"
            >
              <Image
                src={post.src}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                <p className="text-xs font-medium line-clamp-2 leading-snug">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-brand-blush">
                  <Heart className="w-3 h-3 fill-brand-blush" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

