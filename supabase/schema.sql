-- ==============================================================================
-- MERKI CARES - SUPABASE DATABASE SCHEMA & POLICIES
-- ==============================================================================
-- A modern, family-first skincare catalog website in Nigeria.
-- Orders take place via WhatsApp (08109686444) and Instagram (@merkicares).
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    price NUMERIC(12, 2), -- Can be NULL when price_on_request is true
    price_on_request BOOLEAN DEFAULT FALSE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL DEFAULT 'Face',
    skin_concerns TEXT[] DEFAULT '{}'::TEXT[], -- e.g. ARRAY['acne', 'dry skin', 'dark spots', 'baby-safe']
    description TEXT NOT NULL,
    benefits TEXT[] DEFAULT '{}'::TEXT[],
    how_to_use TEXT,
    ingredients TEXT,
    nafdac_number TEXT, -- Optional NAFDAC registration number
    images TEXT[] DEFAULT '{}'::TEXT[],
    in_stock BOOLEAN DEFAULT TRUE NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_concerns ON public.products USING GIN(skin_concerns);

-- 5. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 7. Public Read Access (Anyone can view products and categories on storefront)
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
CREATE POLICY "Allow public read access to categories"
    ON public.categories FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
CREATE POLICY "Allow public read access to products"
    ON public.products FOR SELECT
    USING (true);

-- 8. Admin Write Access (Only authenticated users / admin can insert, update, delete)
DROP POLICY IF EXISTS "Allow authenticated users to manage categories" ON public.categories;
CREATE POLICY "Allow authenticated users to manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to manage products" ON public.products;
CREATE POLICY "Allow authenticated users to manage products"
    ON public.products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 9. SUPABASE STORAGE BUCKET CONFIGURATION
-- ==============================================================================
-- Run this in Supabase SQL editor to create the 'products' bucket and allow uploads:

INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated admin can upload product images" ON storage.objects;
CREATE POLICY "Authenticated admin can upload product images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated admin can update product images" ON storage.objects;
CREATE POLICY "Authenticated admin can update product images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Authenticated admin can delete product images" ON storage.objects;
CREATE POLICY "Authenticated admin can delete product images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'products');

-- ==============================================================================
-- 10. SEED DATA (CATEGORIES & REALISTIC NIGERIAN SKINCARE PRODUCTS)
-- ==============================================================================

-- Seed Categories
INSERT INTO public.categories (id, name, slug, description, order_index)
VALUES
    ('11111111-1111-1111-1111-111111111101', 'Face', 'face', 'Targeted facial serums, hydrators and cleansers', 1),
    ('11111111-1111-1111-1111-111111111102', 'Body', 'body', 'Nourishing scrubs, glowing butters and body polishes', 2),
    ('11111111-1111-1111-1111-111111111103', 'Baby & Kids', 'baby-kids', 'Ultra-mild, hypoallergenic care for babies, toddlers & children', 3),
    ('11111111-1111-1111-1111-111111111104', 'Hair & Scalp', 'hair-scalp', 'Scalp reviving oils and restorative botanical elixirs', 4)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Seed Sample Products
INSERT INTO public.products (
    id, name, slug, tagline, price, price_on_request, category_id, category_name,
    skin_concerns, description, benefits, how_to_use, ingredients, nafdac_number,
    images, in_stock, featured
)
VALUES
(
    '22222222-2222-2222-2222-222222222201',
    'Luna Hydrating Renewal Serum',
    'luna-hydrating-renewal-serum',
    'Hyaluronic nectar & Rosehip infusion for deeply plumped, glowing skin',
    14500,
    FALSE,
    '11111111-1111-1111-1111-111111111101',
    'Face',
    ARRAY['dry skin', 'sensitive skin', 'dark spots'],
    'Luna Hydrating Renewal Serum is our best-selling daily moisture infusion crafted specifically for weary adult skin and nursing parents whose hydration is constantly depleted. Formulated with dual-molecular weight botanical Hyaluronic Acid, Cold-Pressed Rosehip Nectar, and Soothing Aloe Vera, this featherlight elixir sinks in effortlessly without greasy stickiness.',
    ARRAY[
        'Restores deep bouncy hydration to exhausted, dry facial skin',
        'Soothes redness and post-cleansing skin tightness',
        'Helps fade fine dehydration lines around the mouth and eyes',
        'Safe for pregnant and nursing mothers'
    ],
    'Apply 3-4 drops morning and night to clean, damp face and neck. Gently press with open palms until absorbed. Follow immediately with your Merki Cares moisturizer or facial oil.',
    'Pure Distilled Aqua, Rosa Canina (Cold-Pressed Rosehip) Seed Oil, Sodium Hyaluronate (Multi-Molecular Hyaluronic Acid), Vegetable Glycerin, Aloe Barbadensis Leaf Juice, Panthenol (Vitamin B5), Tocopherol (Vitamin E), Centella Asiatica (Gotu Kola) Extract, Geogard ECT (Natural Eco-Certified Preservative).',
    'NAFDAC Reg No: 04-8921',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDpTxRuJ8U03jhe3-cd5VnQAU7_VjWShx0a7N89L0upPzmnUyPC9wuJhubCNcFmmLys8BBDzjcFsn5WuSUfYfgKPCrL8lxdxNWpYmmJv__udbhfOZ0v-DMTAxsOwG8ZJFvCqLXeBSbvUf7TfAgU-d0Cqte9bc8fCLlnVo5Aph5MPbEbH0Z5leWttlEW8pAYyEonYLSVR1Hcooks0_t879-7nudLKMtlqvAeHDohtXM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCJpEn0kLWQWjMWCQ2OMpHtRpFrjMxHTWDs6qoQSlASTyWATgzmRNH6KzpZXlKIxx-Fy8AQaIj1QA0jvszj0-oH_3Y2aUEWyAWQBwRfnO9uc9jt36TDuYqxq4gMIsNqHJ4h0-fr1HqD0oa6oMMhtP9i_M5SZMnrh4IJ_GDDwpNEy0au514s5iUTt9SwZncUATjQlbZJ6m2AHqqBEBL9M586bDU_5qiDKQnk7sWPlL4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCZmiPZa8z803oPmBxSJiO_Sk9eJwOscjpILp5C6XNKN_EmG6UMIT4Oq9bdcmSGVe62XIZRBdjCAZu0AGFHNZucQj8vOs9fga8nXl_KmK0dpQl-kFmWhHlK-X_MAYCiVhKza7c4vOGuCefvEAgnujfCWbLRK-GT8i--UepdpAr-WYCQ5pZl795RdHaA_lpGPZ_PMCNrIWxhhCzdH_-0YsW7WmCwbUhi8BwN1bGD2sM'
    ],
    TRUE,
    TRUE
),
(
    '22222222-2222-2222-2222-222222222202',
    'Clarifying Niacinamide & Zinc Glow Elixir',
    'clarifying-niacinamide-zinc-glow-elixir',
    'Pore-refining, acne-calming treatment that fades dark blemishes',
    13000,
    FALSE,
    '11111111-1111-1111-1111-111111111101',
    'Face',
    ARRAY['acne', 'dark spots'],
    'An intentional formulation targeting Nigerian climate heat, humidity, congestion, and stubborn post-inflammatory hyperpigmentation. Featuring 5% Niacinamide paired with 1% Zinc PCA and Licorice Root, it curbs excess sebum and gently fades dark marks without stripping your skin barrier.',
    ARRAY[
        'Balances excess sebum production in warm, humid weather',
        'Fades stubborn dark spots left behind by breakouts',
        'Minimizes the look of enlarged congested pores',
        'Prevents new breakouts while respecting your natural skin flora'
    ],
    'Smooth 2-3 drops over cleansed skin each morning before sunscreen and at night before cream. Avoid direct contact with eyes.',
    'Deionized Water, Niacinamide (Vitamin B3 5%), Zinc PCA, Glycyrrhiza Glabra (Licorice Root) Extract, Green Tea (Camellia Sinensis) Hydrosol, Allantoin, Hydroxyethylcellulose, Phenoxyethanol (and) Ethylhexylglycerin.',
    'NAFDAC Reg No: 04-7712',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBt0ztMpom6Hp3J3cNZxNbJ9mNSk357BwKJ93jL6MfQ6jMrdDaMAJ8lolscMA4VP0qn1KLTsgaOBzfp-1sgQKT8C5AeFX9eL3MoCnmzYAHj0rXSmRI5P1LCp_V0PTV-CkoG-6zt9ZQqsN1FAF_UBUGW1ufkcRhfd3SaYPbvP2A3hxd8jXnKDH1H-alFqx0TSq3hsPKd_B99fiw4NAD0HuUjLMIygz6Z0P8Ih_KzDd0'
    ],
    TRUE,
    TRUE
),
(
    '22222222-2222-2222-2222-222222222203',
    'Baby Calming Oat & Shea Butter Cocoon',
    'baby-calming-oat-shea-butter-cocoon',
    'Ultra-gentle pediatrician-tested moisture barrier for newborns and toddlers',
    9500,
    FALSE,
    '11111111-1111-1111-1111-111111111103',
    'Baby & Kids',
    ARRAY['baby-safe', 'dry skin'],
    'Every baby deserves the softest, safest protection. This pediatrician-approved whipped butter combines colloidal oatmeal, Grade-A Nilotica raw shea butter, and organic calendula oil. It provides immediate comforting relief for cradle cap, diaper friction, heat rash, and childhood eczema.',
    ARRAY[
        '100% Fragrance-free and hypoallergenic for newborns and sensitive kids',
        'Soothes irritated diaper rash, heat rash, and dry patches within hours',
        'Locks in bath hydration with non-greasy organic Nilotica shea butter',
        'Free from parabens, mineral oils, petroleum, or artificial dyes'
    ],
    'Warm a coin-sized scoop between clean palms and gently massage over baby’s body and face right after bath time. Reapply to dry cheeks, knees, or diaper areas as needed.',
    'Organic Butyrospermum Parkii (Grade-A Nilotica Shea) Butter, Avena Sativa (Colloidal Oatmeal) Flour, Calendula Officinalis Flower Infusion in Sweet Almond Oil, Simmondsia Chinensis (Jojoba) Oil, Tocopherol (Pure Vitamin E).',
    'NAFDAC Reg No: 04-9043',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNylPS2mHZkUt2ivz8hSBNaItbLuraix-7DhemiDHGdBvfQUYcq1k4wFq_j3VR_OcVxWOnaNHGF3iDrihyAUc9MfqwRwnIzkeeDIlQOfD9usNlKKlURp-DXNWDNxfZvgk_PQaWd7GG352PgGiWfDAHgDUdcjk2LWGKXDMZtqRUCIQmTh1zN7A5vr0VHYpyk1lmsgOiFFNKDyp_Q9pKvEdSgUYJzOfMExorXgZZzus'
    ],
    TRUE,
    TRUE
),
(
    '22222222-2222-2222-2222-222222222204',
    'Radiant Turmeric & Kojic Acid Body Glow Polish',
    'radiant-turmeric-kojic-acid-body-glow-polish',
    'Non-staining whipped sugar polish for even, luminous velvet skin',
    11500,
    FALSE,
    '11111111-1111-1111-1111-111111111102',
    'Body',
    ARRAY['dark spots', 'dry skin'],
    'A beloved Nigerian vanity essential! Specially formulated not to leave stubborn yellow sink stains, this creamy sugar polish blends high-potency Kasturi turmeric with plant-derived Kojic dipalmitate, sweet orange oil, and organic cane sugar to polish away rough dead skin, strawberry legs, and dark knees.',
    ARRAY[
        'Gently buffs away stubborn dead skin on elbows, knees, and inner thighs',
        'Fades body discoloration and keratosis pilaris (rough bumpy skin)',
        'Leaves skin feeling butter-soft and glowing after a single shower',
        'Formulated with non-staining botanical turmeric extract'
    ],
    'Stir gently before use. In the shower, massage onto wet skin using circular upward motions. Let sit for 2-3 minutes to allow Kojic acid absorption, then rinse thoroughly with warm water.',
    'Raw Cane Sucrose, Butyrospermum Parkii Butter, Vitis Vinifera (Grape) Seed Oil, Curcuma Aromatica (Wild Kasturi Turmeric) Extract, Kojic Dipalmitate, Citrus Sinensis (Sweet Orange) Peel Oil, Emulsifying Wax, Vitamin E.',
    'NAFDAC Reg No: 04-6204',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKl8adz0Y65tjKeFaYKcTo-XsrXbpBVUPmRTbX3d-WJJIIXhgMw85igVP_-BAdGNIyv7R98Sa24MfjkWXLeKmi-Zd8dq-n1JeFSh7RHHhtYnu7Haw_hgMw0HCA5cfnMTiV1KwxP7wRAebjVe8TBo-3rXEsie6i5UKgL8o2vv0W-uNG9GhwVWp030EkkVU7Ui1ljdfz0BiWWSN-TctzfKY7MllkpjqlB3yxYofsYaI'
    ],
    TRUE,
    TRUE
),
(
    '22222222-2222-2222-2222-222222222205',
    'Rosehip & Ceramide Barrier Recovery Cream',
    'rosehip-ceramide-barrier-recovery-cream',
    'Deep nourishment and calm for compromised, stinging, or peeling skin',
    16000,
    FALSE,
    '11111111-1111-1111-1111-111111111101',
    'Face',
    ARRAY['dry skin', 'sensitive skin'],
    'A rich yet breathable lipid recovery cream formulated with a 3:1:1 ratio of skin-identical Ceramides, Botanical Cholesterol, and Essential Fatty Acids. It immediately halts stinging, replenishes moisture reservoirs, and repairs damaged barriers caused by harsh bleaching products or over-exfoliation.',
    ARRAY[
        'Rebuilds the outermost lipid defense against dryness and irritation',
        'Stops uncomfortable tingling and tight flaking instantly',
        'Rich cushion texture with a peaceful, velvety matte finish',
        'Zero fragrance or irritating alcohol'
    ],
    'Warm a pea-sized amount between fingertips and smooth across clean skin as the final moisturizing step morning and evening.',
    'Aqua, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Squalane, Rosa Rubiginosa Seed Oil, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Phenoxyethanol.',
    'NAFDAC Reg No: 04-5188',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCZmiPZa8z803oPmBxSJiO_Sk9eJwOscjpILp5C6XNKN_EmG6UMIT4Oq9bdcmSGVe62XIZRBdjCAZu0AGFHNZucQj8vOs9fga8nXl_KmK0dpQl-kFmWhHlK-X_MAYCiVhKza7c4vOGuCefvEAgnujfCWbLRK-GT8i--UepdpAr-WYCQ5pZl795RdHaA_lpGPZ_PMCNrIWxhhCzdH_-0YsW7WmCwbUhi8BwN1bGD2sM'
    ],
    TRUE,
    FALSE
),
(
    '22222222-2222-2222-2222-222222222206',
    'Botanical Rosemary & Castor Hair Growth Drops',
    'botanical-rosemary-castor-hair-growth-drops',
    'Restorative postpartum hairline and crown densifying scalp treatment',
    10500,
    FALSE,
    '11111111-1111-1111-1111-111111111104',
    'Hair & Scalp',
    ARRAY['dry skin', 'sensitive skin'],
    'Formulated especially for new mothers experiencing postpartum hair shedding, edge thinning from protective styles, and itchy dry scalp. Powered by steamed Rosemary essential oil, cold-pressed Jamaican Black Castor Oil, Peppermint, and Biotin to reactivate sluggish follicles.',
    ARRAY[
        'Invigorates microcirculation to wake up sleeping hair follicles',
        'Visibly fills in sparse postpartum edges and fragile temples',
        'Soothes itchy scalp and prevents dandruff flaking under braids',
        'Lightweight non-greasy carrier oil base'
    ],
    'Part hair into sections and drop 3-5 drops directly onto the scalp and edges. Massage firmly with fingertips for 3-5 minutes. Use 3-4 times weekly or as an overnight hot oil treatment.',
    'Ricinus Communis (Castor) Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Mentha Piperita (Peppermint) Oil, Simmondsia Chinensis Seed Oil, Biotin, Tocopherol, Lavandula Angustifolia Oil.',
    'NAFDAC Reg No: 04-3389',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDthB1tVG5oWI7umgRJcB-exIV3T3bppGDbyAdA51juKmHTqok3UeM7FyjK5d0v-_biJKtRTiXP6SnIKmzpYiPw--o-D4T5d_9GHOlroWEhCLWInzzfdOoBzsYCV-BOhbzutfH6L76tNZYx1Y1lvxi2d3w1kEBEPcpi6mwsz6742jlA4CQjGs34I55E2iWg0fwetCz3QM3ckG86FRaC4KBjCdNzyeboIyBOeWXKAik'
    ],
    TRUE,
    FALSE
),
(
    '22222222-2222-2222-2222-222222222207',
    'Hydra-Shield Invisible Daily SPF 50',
    'hydra-shield-invisible-daily-spf-50',
    'Broad-spectrum mineral sun protection with zero white cast for African skin',
    15000,
    FALSE,
    '11111111-1111-1111-1111-111111111101',
    'Face',
    ARRAY['dark spots', 'sensitive skin', 'baby-safe'],
    'The Holy Grail daily sunscreen engineered specifically for Nigerian and melanin-rich skin. Completely invisible with zero ghostly white cast, zero eye stinging, and zero greasy shine. Guards against tropical UV rays and prevents hyperpigmentation from worsening.',
    ARRAY[
        'Broad Spectrum UVA/UVB PA++++ physical shield',
        '100% Invisible finish—zero white cast on deep skin tones',
        'Sweat and water-resistant for up to 80 minutes',
        'Infused with Hyaluronic acid and Vitamin E for all-day comfort'
    ],
    'Apply generously as the final step of your daytime routine at least 15 minutes before sun exposure. Reapply every 2 hours if outdoors or swimming.',
    'Micronized Zinc Oxide 12%, Distilled Water, Caprylic/Capric Triglyceride, Niacinamide, Sodium Hyaluronate, Tocopherol Acetate, Silica, Phenoxyethanol.',
    'NAFDAC Reg No: 04-9915',
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD6uByDGCjNbs3hnScivrXHNCiUppqQOq4yth0sQYkUl-DFY1Xk-WcR2Ocjz2FvVdh1unakm8IJf2XEL4EBknJfcfpsWR8PWsZYaRWuwjg6wKWuCXD6YNGfQFii6QLpT9dQv7krcUwXaB27d1LFVfPjndd2F_b9yD48SaMknbbxQZE5r05TEByD5DITGIz-YVE37ybAQsRzAKmRtLL_oK4NGe0ErUOrkc6vDujJE7s'
    ],
    FALSE, -- OUT OF STOCK BADGE TEST
    TRUE
),
(
    '22222222-2222-2222-2222-222222222208',
    'Bespoke Bridal & Maternity Skin Concierge Kit',
    'bespoke-bridal-maternity-skin-concierge-kit',
    'Customized pregnancy-safe or wedding-day routine curated personally by Merki',
    NULL,
    TRUE, -- PRICE ON REQUEST TEST
    '11111111-1111-1111-1111-111111111101',
    'Face',
    ARRAY['sensitive skin', 'baby-safe', 'dark spots'],
    'Preparing for motherhood or walking down the aisle? Receive a dedicated 1-on-1 skin evaluation with Merki via WhatsApp. We craft a bespoke 4-part regimen tailored specifically to your hormonal changes, wedding countdown, or pregnancy sensitivities.',
    ARRAY[
        'Personal 1-on-1 skin consultation directly on WhatsApp with Merki',
        'Customized formulation blend adapted to your trimesters or wedding timeline',
        'Includes cleanser, targeted elixir, barrier butter, and weekly treatment mask',
        'Complimentary direct shipping anywhere in Nigeria'
    ],
    'Tap Order / Inquire on WhatsApp to connect directly with Merki. We will send a brief 5-question skin diagnostic before packaging your custom kit.',
    'Customized selection of botanicals including Rosehip, Cold-Pressed Baobab, Colloidal Oats, Niacinamide, and Calendula based on individual diagnostic.',
    NULL,
    ARRAY[
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKl8adz0Y65tjKeFaYKcTo-XsrXbpBVUPmRTbX3d-WJJIIXhgMw85igVP_-BAdGNIyv7R98Sa24MfjkWXLeKmi-Zd8dq-n1JeFSh7RHHhtYnu7Haw_hgMw0HCA5cfnMTiV1KwxP7wRAebjVe8TBo-3rXEsie6i5UKgL8o2vv0W-uNG9GhwVWp030EkkVU7Ui1ljdfz0BiWWSN-TctzfKY7MllkpjqlB3yxYofsYaI'
    ],
    TRUE,
    FALSE
)
ON CONFLICT (slug) DO UPDATE
SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    price = EXCLUDED.price,
    price_on_request = EXCLUDED.price_on_request,
    category_id = EXCLUDED.category_id,
    category_name = EXCLUDED.category_name,
    skin_concerns = EXCLUDED.skin_concerns,
    description = EXCLUDED.description,
    benefits = EXCLUDED.benefits,
    how_to_use = EXCLUDED.how_to_use,
    ingredients = EXCLUDED.ingredients,
    nafdac_number = EXCLUDED.nafdac_number,
    images = EXCLUDED.images,
    in_stock = EXCLUDED.in_stock,
    featured = EXCLUDED.featured;

