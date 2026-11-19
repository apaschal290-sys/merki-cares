# Merki Cares — Mobile-First Skincare Catalogue 🌸

A complete, mobile-first e-commerce-style catalogue website built for **Merki Cares**, a family-first botanical skincare brand in Nigeria.

Customers do **not** log in or pay on the site. Every order and consultation happens friction-free directly through **WhatsApp** (`08109686444`) or **Instagram** (`@merkicares`).

---

## 🌿 Brand & Design System

- **Colours**:
  - Soft Blush Pink: `#F8C8D8`
  - Deep Pink Accent: `#E75480`
  - Charcoal / Soft Black: `#111111` / `#2C2C2C`
  - Warm Porcelain Canvas: `#FBF9F5` / `#FDFBF7`
  - WhatsApp Green (Action): `#25D366`
- **Typography**: Plus Jakarta Sans (with Poppins/Nunito fallbacks)
- **Tone**: Warm, friendly, caring, restorative, parent-reassuring
- **Mobile-First Layout**: Full-width hero, rounded cards (`rounded-3xl`), soft ambient shadows, generous whitespace, large touch targets, and sticky bottom navigation.

---

## 📱 Customer Pages (4 Core Routes)

1. **Home (`/`)**:
   - Full-width hero banner with warm apothecary framing.
   - Reassurance chip (*"Online for skin advice"*).
   - High-contrast **"Order on WhatsApp (08109686444)"** CTA button.
   - Trust Badges (100% Clean Botanicals, Parent & Kids Safe, Nationwide Delivery, WhatsApp Care).
   - Featured Essentials product grid.
   - Category navigation cards (Face, Body, Baby & Kids, Hair & Scalp).
   - Dedicated Instagram community highlight section (`@merkicares`).

2. **Shop Catalogue (`/shop`)**:
   - Interactive category chips (*All, Face, Body, Baby & Kids, Hair & Scalp*).
   - Skin-concern filters (*Acne & Blemishes, Dry & Dehydrated, Dark Spots & Glow, Baby-Safe, Sensitive Skin*).
   - Real-time search bar with clear button.
   - "In Stock Only" toggle switch.
   - Sort selector (Featured First, Price Low-High, Price High-Low, Alphabetical).
   - Dynamic product grid with "Out of Stock" badges and "Price on Request" support.

3. **Product Detail (`/products/[slug]`)**:
   - Large photo display with interactive multi-angle thumbnail gallery switcher.
   - Name, tagline, and price formatted in Naira (`₦`).
   - "Price on request" display for bespoke consultation kits.
   - Optional **NAFDAC Registration Number** badge (e.g. `NAFDAC Reg No: 04-8921`).
   - **Pre-filled "Order on WhatsApp" button**:
     > *"Hello Merki Cares, I want to order Luna Hydrating Renewal Serum – ₦14,500. Please confirm availability."*
   - Instagram DM inquiry button.
   - Deep dive tabs: *Why You'll Love It*, *Key Benefits Checklist*, *How to Apply*, and *Full Botanical Ingredients*.
   - Delivery & bank payment reassurance box.
   - "You May Also Like" related product recommendations.

4. **About & Contact (`/about`)**:
   - Brand origin story: *"Why Merki Cares was born"*.
   - Founder note snippet.
   - Delivery and payment information:
     - Lagos same-day and next-day bike dispatch.
     - Nationwide interstate delivery across all 36 states via park logistics or GIG.
     - Safe bank transfer upon order confirmation.
   - Direct consultation trigger buttons for WhatsApp and Instagram.
   - Frequently Asked Questions (FAQ) accordion.

---

## ⚡ Key Features

- **Conversational Commerce**: Every product card and detail page automatically formats a pre-filled WhatsApp message with product name, price, and availability check.
- **Sticky Floating WhatsApp Button**: Always accessible at the bottom right of all customer pages, complete with an interactive gentle prompt (*"Have questions for your skin? Chat with us"*).
- **Sticky Mobile Bottom Navigation**: 4 clean thumb-reachable tabs (*Home, Shop, About, WhatsApp*).
- **Out of Stock & Price on Request**: Clear visual cues and non-intrusive pre-order notification button for restocks.
- **Performance & SEO**:
  - Next.js 14 App Router with Server Side Rendering and static caching.
  - Next/Image optimization and lazy loading.
  - OpenGraph tags, dynamic product metadata, and search engine meta descriptions.

---

## 🛠️ Admin Dashboard (`/admin`)

Password-protected single admin portal designed in the same blush pink and charcoal aesthetic, fully usable on a mobile phone:
- **Bento Overview**: Total products count, In-Stock count, Out-of-Stock count, and Featured items count.
- **WhatsApp Sync Widget**: Quick status of incoming customer inquiries.
- **Product Management**: Searchable product table/cards with live stock toggle, edit, and delete.
- **Add / Edit Product Drawer**:
  - Multiple photo upload (Supabase Storage bucket upload or image URL input).
  - Product name, slug auto-generator, tagline, price in Naira.
  - "Price on request" toggle.
  - Category dropdown selector.
  - Multi-select skin concern chips (*acne, dry skin, dark spots, baby-safe, sensitive skin, etc.*).
  - Description, benefits (one per line), how to use, full ingredients.
  - NAFDAC number input.
  - In-stock and Feature-on-home toggles.
- **Category Manager**: Add, inspect, and delete categories.

---

## 🚀 Supabase Setup (Database, Storage & Auth)

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. In your Supabase dashboard, go to **Project Settings** -> **API** to copy:
   - `Project URL`
   - `anon public key`

### 2. Run Database Migration & Seed
1. In your Supabase dashboard, open the **SQL Editor**.
2. Copy and paste the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Click **Run**.
   - This creates the `categories` and `products` tables.
   - Sets up performance indexes and triggers.
   - Enables Row Level Security (RLS) with public read access and authenticated admin write access.
   - Creates the `products` public storage bucket.
   - Seeds 8 realistic Nigerian skincare products (including Bestsellers, Out-of-Stock tests, and Price-on-Request consultation kits).

### 3. Create Admin User
1. In the Supabase dashboard, go to **Authentication** -> **Users**.
2. Click **Add User** -> **Create User**.
3. Enter your admin email (e.g. `admin@merkicares.com`) and a secure password.
4. Toggle "Auto Confirm User" to on.

### 4. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_WHATSAPP_NUMBER=2348109686444
NEXT_PUBLIC_INSTAGRAM_HANDLE=merkicares
```

> **Note:** The storefront includes an intelligent local fallback layer with the 8 sample products. Even before connecting Supabase, the entire website and admin panel run smoothly in preview mode!

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) to view the Admin Dashboard.

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **Add New** -> **Project**.
3. Import your repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`: your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: your Supabase Anon Key
5. Click **Deploy**. Vercel will build and deploy your site with global edge CDN caching!

---

## 📞 Merki Cares Contact Info

- **WhatsApp**: [wa.me/2348109686444](https://wa.me/2348109686444) (`08109686444`)
- **Instagram**: [instagram.com/merkicares](https://instagram.com/merkicares) (`@merkicares`)
- **Location**: Lagos, Nigeria

