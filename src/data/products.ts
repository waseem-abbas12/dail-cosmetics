import type { Product, ProductReview } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'dail-premium-herbal-hair-oil',
    name: 'Dail Premium Herbal Hair Oil (100% Organic)',
    urduName: 'ڈیل پریمیم ہربل ہیئر آئل (100٪ خالص آرگینک)',
    tagline: 'Export Quality 120ml botanical infusion for acute hair fall control, root strengthening, and rapid regrowth.',
    category: 'hair-oil',
    concern: ['Hair Fall', 'Follicle Regrowth', 'Hair Thinning'],
    price: 1850,
    originalPrice: 2200,
    rating: 4.95,
    reviewCount: 540,
    badge: 'Best Seller',
    volume: '120 ml / 4.0 fl oz',
    image: '/images/dail_hair_oil.jpg',
    galleryImages: [
      '/images/dail_hair_oil.jpg',
      '/images/dail_packaging.jpg',
      'https://images.unsplash.com/photo-1608248597359-54817d3d0f04?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dail Premium Herbal Hair Oil is crafted with 100% pure organic herbal actives including mountain Rosemary, wild Amla, Bhringraj, Shikakai, and cold-pressed Kalonji (Black Seed) oil. Formulated to modern export quality standards, free from cheap mineral oil, silicones, and harmful parabens. Stops hair shedding and revitalizes dormant hair follicles within 14 days.',
    benefits: [
      '100% Organic formula with Export Quality certification',
      'Targets active hair shedding at root level and thickens thinning strands',
      'Infused with cold-pressed rosemary bio-actives to stimulate micro-circulation',
      'Non-sticky, rapid absorbing texture with natural soothing herbal aroma'
    ],
    keyIngredients: [
      { name: 'Mountain Rosemary & Mint', description: 'Clinically proven follicle stimulant that increases cellular metabolism in weak hair roots.' },
      { name: 'Wild Amla & Shikakai', description: 'Natural vitamin C powerhouse to strengthen keratin and prevent premature greying.' },
      { name: 'Cold-Pressed Kalonji (Black Seed)', description: 'Subcontinental prophetic herb rich in thymoquinone to deeply nourish scalp microbiome.' },
      { name: 'Bhringraj & Fenugreek (Methi)', description: 'Traditional herbs that soothe scalp heat and accelerate healthy anagen growth cycle.' }
    ],
    howToUse: [
      'Warm 6-10 drops of Dail Premium Herbal Hair Oil in clean palms.',
      'Massage deeply into the scalp in circular motions for 5 to 7 minutes.',
      'Leave on for at least 2 hours, or overnight for intensive restoration.',
      'Wash off with mild sulfate-free shampoo. Repeat 3 times weekly.'
    ],
    fullIngredients: 'Cold-Pressed Sweet Almond Oil, Virgin Coconut Oil, Wild Amla Extract, Bhringraj Leaf Extract, Rosemary Leaf Essential Oil, Kalonji (Nigella Sativa) Seed Oil, Shikakai Extract, Fenugreek Seed Infusion, Castor Oil, Vitamin E.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-beauty-cream',
    name: 'Dail Beauty Cream (Without Steroid)',
    urduName: 'ڈیل بیوٹی کریم (بغیر اسٹیرائیڈ - 5 ڈے پلان)',
    tagline: 'Export Quality 5-Day Beauty Plan. Anti-Aging + Anti-Acne. Make your skin bright, soft, fresh, healthy & glowing without harmful steroids.',
    category: 'cream',
    concern: ['Radiant Glow', 'Uneven Skin Tone', 'Dull Skin'],
    price: 1450,
    originalPrice: 1800,
    rating: 4.9,
    reviewCount: 420,
    badge: '100% Organic',
    volume: 'Export Quality Tin Tub',
    image: '/images/dail_beauty_cream.jpg',
    galleryImages: [
      '/images/dail_beauty_cream.jpg',
      '/images/dail_packaging.jpg',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Unlike commercial whitening creams that damage skin with dangerous steroids and mercury, Dail Beauty Cream is strictly formulated WITHOUT STEROIDS. It combines natural botanical brightening bio-actives, nourishing plant waxes, and antioxidant vitamins to achieve a visibly radiant, soft, fresh, and healthy lit-from-within glow.',
    benefits: [
      'STRICTLY WITHOUT STEROID — Safe for everyday use without thinning the skin',
      '5-Day Beauty Plan: Visible freshness, smoothness, and refined skin texture',
      'Dual Action: Anti-Aging cell renewal + Anti-Acne oil balancing',
      'Export Quality manufacturing with signature gold-sealed round tub lid'
    ],
    keyIngredients: [
      { name: 'Botanical Skin Brighteners', description: 'Gentle plant-derived arbutin and saffron extracts that safely fade dark spots.' },
      { name: 'Niacinamide (Vitamin B3)', description: 'Controls excess oil, minimizes pores, and clears blemishes.' },
      { name: 'Pure Vitamin E & Almond Emulsion', description: 'Protects against UV photo-damage and replenishes moisture barrier.' },
      { name: 'Aloe Vera & Chamomile Gel', description: 'Calms redness, irritation, and inflammation.' }
    ],
    howToUse: [
      'Wash face gently with lukewarm water and pat dry.',
      'Take a small pearl amount of Dail Beauty Cream.',
      'Dab across face and neck; gently massage with fingertips in upward motion.',
      'Use nightly before sleeping for optimal 5-day brightening results.'
    ],
    fullIngredients: 'Deionized Water, Botanical Squalane, Stearic Acid, Niacinamide, Pure Vitamin E, Alpha Arbutin, Licorice Root Extract, Aloe Barbadensis Leaf Juice, Kashmiri Saffron Stigma Extract, Zinc Oxide, Mild Natural Fragrance.',
    inStock: true,
    modelType: 'jar'
  },
  {
    id: 'dail-hand-and-foot-whitening-cream',
    name: 'Dail Hand & Foot Whitening Cream (Without Steroid)',
    urduName: 'ڈیل ہینڈ اینڈ فٹ وائٹننگ کریم (بغیر اسٹیرائیڈ)',
    tagline: 'Export Quality 3-Action Repair (Moisturizing, Multi-Effect, Repair) for dry, tanned, and rough hands and feet.',
    category: 'cream',
    concern: ['Deep Moisture', 'Radiant Glow', 'Uneven Skin Tone'],
    price: 1350,
    originalPrice: 1650,
    rating: 4.88,
    reviewCount: 312,
    badge: 'Top Rated',
    volume: '3-Action Repair Jar',
    image: '/images/dail_hand_foot.jpg',
    galleryImages: [
      '/images/dail_hand_foot.jpg',
      '/images/dail_packaging.jpg'
    ],
    description: 'Specifically crafted for the rougher skin of hands and feet that endure hard water, sun exposure, and chores. Dail Hand & Foot Whitening Cream works through a 3-Action system: deep cellular moisturizing, multi-effect brightening, and barrier repair—all without steroids.',
    benefits: [
      'Formulated WITHOUT STEROIDS — safe, sustainable brightening',
      '3-Action Formula: Deep Moisturization, Multi-Effect Brightening, Barrier Repair',
      'Softens dark knuckles, cracked heels, and sun-tanned feet',
      'Fast absorbing and non-greasy finish'
    ],
    keyIngredients: [
      { name: 'Shea & Cocoa Butter', description: 'Rich emollients that seal in hydration on thick cuticle and heel skin.' },
      { name: 'Urea & Lactic Acid', description: 'Gently exfoliates dead hardened skin cells for smooth velvety touch.' },
      { name: 'Rose Petal Infusion', description: 'Imparts a youthful pinkish radiance and soothing floral nourishment.' }
    ],
    howToUse: [
      'Cleanse hands and feet thoroughly.',
      'Apply generously to knuckles, heels, and dark spots.',
      'Massage until completely absorbed.',
      'Best applied at bedtime for overnight intensive hydration.'
    ],
    fullIngredients: 'Purified Aqua, Butyrospermum Parkii (Shea Butter), Cocoa Seed Butter, Glycerin, Lactic Acid, Urea, Niacinamide, Rose Damascena Distillate, Allantoin, Glyceryl Stearate, Tocopherol.',
    inStock: true,
    modelType: 'jar'
  },
  {
    id: 'dail-complete-trio-set',
    name: 'Dail Complete 3-in-1 Beauty & Hair Regimen Box',
    urduName: 'ڈیل مکمل 3-ان-1 ہیئر اینڈ بیوٹی سیٹ',
    tagline: 'The full Export Quality trio: 100% Organic Herbal Hair Oil (120ml) + Dail Beauty Cream + Hand & Foot Cream.',
    category: 'bundles',
    concern: ['Hair Fall', 'Radiant Glow', 'Deep Moisture', 'Complete Care'],
    price: 4199,
    originalPrice: 5200,
    rating: 5.0,
    reviewCount: 680,
    badge: 'Best Seller',
    volume: 'Complete Trio (120ml Oil + Beauty Cream + Hand & Foot)',
    image: '/images/dail_packaging.jpg',
    galleryImages: [
      '/images/dail_packaging.jpg',
      '/images/dail_hair_oil.jpg',
      '/images/dail_beauty_cream.jpg',
      '/images/dail_hand_foot.jpg'
    ],
    description: 'Our most in-demand value set. Get all 3 signature Dail Cosmetics formulations in one complete package: the 100% Organic Herbal Hair Oil (120ml), the steroid-free 5-Day Dail Beauty Cream, and the Hand & Foot 3-Action Whitening Cream. Save Rs. 1,001 with free courier delivery nationwide across Pakistan.',
    benefits: [
      'Includes all 3 full-size Dail Cosmetics export-quality formulations',
      'Saves Rs. 1,001 over buying individual products',
      'Free nationwide delivery with Cash On Delivery anywhere in Pakistan',
      'Complete head-to-toe steroid-free organic beauty routine'
    ],
    keyIngredients: [
      { name: 'Dail Herbal Hair Oil (120ml)', description: 'Full size 100% organic hair growth and fall control elixir.' },
      { name: 'Dail Beauty Cream (5-Day Plan)', description: 'Full size steroid-free anti-aging & anti-acne radiance cream.' },
      { name: 'Dail Hand & Foot Cream', description: 'Full size 3-action moisturizing and brightening repair jar.' }
    ],
    howToUse: [
      'Morning: Cleanse and apply light layer of Dail Beauty Cream.',
      'Evening: Massage Dail Herbal Hair Oil into scalp 3 nights a week.',
      'Bedtime: Apply Dail Hand & Foot Cream to knuckles and heels.'
    ],
    fullIngredients: 'See individual product listings for complete ingredient profiles.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-rosemary-scalp-mist',
    name: 'Dail Pure Rosemary & Mint Scalp Hydro-Mist',
    urduName: 'ڈیل روزمیری ہائیڈرو مسٹ',
    tagline: '100% steam-distilled fresh rosemary water for daily zero-grease root energizing.',
    category: 'hair-care',
    concern: ['Follicle Regrowth', 'Daily Maintenance', 'Hair Thinning'],
    price: 1650,
    originalPrice: 1950,
    rating: 4.88,
    reviewCount: 290,
    badge: 'New',
    volume: '120 ml / 4.0 fl oz',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Steam-distilled pure rosemary water formulated for daily spray directly onto hair roots. Non-greasy, refreshing, and stimulates hair density without needing a wash.',
    benefits: [
      'Spray daily without washing — completely non-sticky & lightweight',
      'Invigorates scalp circulation with a refreshing cooling mint tingle',
      'Controls mid-day scalp sebum and eliminates sweat odor'
    ],
    keyIngredients: [
      { name: 'Steam-Distilled Rosemary Hydrosol', description: 'Botanical waters rich in rosmarinic acid to stimulate scalp vitality.' },
      { name: 'Field Peppermint Water', description: 'Provides instantaneous cooling relief and invigorates blood circulation.' }
    ],
    howToUse: [
      'Spray directly onto scalp 4-6 times daily. Tap in gently with fingertips.'
    ],
    fullIngredients: '100% Pure Steam Distilled Rosmarinus Officinalis (Rosemary) Hydrosol, Peppermint Leaf Water, Biotin.',
    inStock: true,
    modelType: 'spray'
  },
  {
    id: 'dail-vitamin-c-face-wash',
    name: 'Dail Vitamin C & Neem Radiance Face Wash',
    urduName: 'ڈیل وٹامن سی اینڈ نیم ریڈیئنس فیس واش',
    tagline: 'Deep pore purification, instant brightening & oil control without stripping moisture.',
    category: 'cleanser',
    concern: ['Radiant Glow', 'Deep Cleansing', 'Oil Control'],
    price: 890,
    originalPrice: 1150,
    rating: 4.92,
    reviewCount: 380,
    badge: 'Best Seller',
    volume: '100 ml Tube',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Soap-free foaming cleanser infused with organic orange peel Vitamin C and purifying mountain neem. Gently dissolves pollution, excess sebum, and makeup while leaving the complexion visibly glowing and hydrated.',
    benefits: [
      'Gentle sulfate-free lather that purifies without skin tightness',
      'Vitamin C brightens dull, tired skin and reduces sun tan',
      'Neem bio-actives prevent acne, blemishes, and unclog enlarged pores'
    ],
    keyIngredients: [
      { name: 'Pure Vitamin C (Ethyl Ascorbic Acid)', description: 'Potent stable antioxidant that evens skin tone and boosts radiance.' },
      { name: 'Wild Neem Leaf Extract', description: 'Natural antibacterial agent that cleanses impurities.' }
    ],
    howToUse: [
      'Squeeze coin-sized amount onto wet palms, massage over face for 60 seconds, then rinse.'
    ],
    fullIngredients: 'Purified Water, Decyl Glucoside, Glycerin, 3-O-Ethyl Ascorbic Acid, Neem Leaf Extract, Aloe Vera Leaf Juice, Allantoin.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-keratin-repair-shampoo',
    name: 'Dail Keratin & Biotin Herbal Repair Shampoo',
    urduName: 'ڈیل کیراٹین اینڈ بایوٹین ہربل شیمپو',
    tagline: 'Sulfate-Free intensive restorative shampoo for damaged, frizzy, and falling hair.',
    category: 'hair-care',
    concern: ['Hair Fall', 'Follicle Regrowth', 'Damage Repair'],
    price: 1390,
    originalPrice: 1750,
    rating: 4.89,
    reviewCount: 310,
    badge: 'Top Rated',
    volume: '250 ml Pump Bottle',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Formulated to complement Dail Premium Herbal Hair Oil. Free from harsh sulfates, parabens, and synthetic silicones. Infused with plant keratin and biotin to strengthen cuticle fibers and leave hair silky, thick, and voluminous.',
    benefits: [
      '100% Sulfate-Free & Paraben-Free formula safe for daily use',
      'Reinforces keratin structure to stop breakage and split ends',
      'Perfect companion wash after using Dail Herbal Hair Oil'
    ],
    keyIngredients: [
      { name: 'Hydrolyzed Plant Keratin', description: 'Rebuilds microscopic cracks along the hair cortex.' },
      { name: 'Biotin (Vitamin B7)', description: 'Thickens individual hair strand diameter.' }
    ],
    howToUse: [
      'Apply to wet hair after oiling, lather thoroughly into scalp, and rinse with cold or lukewarm water.'
    ],
    fullIngredients: 'Deionized Aqua, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Hydrolyzed Wheat Keratin, Biotin, D-Panthenol, Argania Spinosa Kernel Oil.',
    inStock: true,
    modelType: 'bottle'
  },
  {
    id: 'dail-saffron-glow-serum',
    name: 'Dail 24K Saffron & Arbutin Radiance Glow Serum',
    urduName: 'ڈیل زعفران اینڈ اربوٹین گلو سیرم',
    tagline: 'Concentrated antioxidant nectar for radiant glass skin and dark spot fading without steroids.',
    category: 'serum',
    concern: ['Radiant Glow', 'Uneven Skin Tone', 'Without Steroid'],
    price: 1890,
    originalPrice: 2400,
    rating: 4.96,
    reviewCount: 450,
    badge: 'Best Seller',
    volume: '30 ml Dropper Bottle',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ultra-concentrated botanical elixir formulated with organic Kashmiri saffron threads and Alpha Arbutin. Quickly penetrates to brighten dark patches, soothe hyperpigmentation, and impart a glass-like luminous glow.',
    benefits: [
      'Penetrates deep into epidermis to fade stubborn sun spots and acne marks',
      'Strictly WITHOUT STEROIDS — safe for daily morning and night use',
      'Featherlight water-gel texture that absorbs in seconds without stickiness'
    ],
    keyIngredients: [
      { name: 'Kashmiri Saffron Stigma Extract', description: 'Ancient royal spice packed with crocin for incandescent radiance.' },
      { name: 'Pure Alpha Arbutin 2%', description: 'Clinically proven safe natural melanin inhibitor.' }
    ],
    howToUse: [
      'Dispense 3-4 drops onto clean face before moisturizer. Tap gently until absorbed.'
    ],
    fullIngredients: 'Purified Water, Crocus Sativus (Saffron) Stigma Extract, Alpha Arbutin, Hyaluronic Acid, Niacinamide, Ferulic Acid.',
    inStock: true,
    modelType: 'bottle'
  }
];

export const REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Ayesha Tariq',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '2 days ago',
    verified: true,
    comment: 'Dail Beauty Cream is the ONLY cream in Pakistan that made my skin glow WITHOUT steroids! Meri skin thin nahi hui, koi redness nahi aayi. Aur Dail Hair Oil se mera postpartum hair fall sirf 10 din mein ruk gaya. 10/10 recommendation!',
    helpfulCount: 58
  },
  {
    id: 'rev-2',
    author: 'Muhammad Hamza',
    city: 'Karachi (Gulshan-e-Iqbal)',
    rating: 5,
    date: '5 days ago',
    verified: true,
    comment: 'Packaging dekh kar hi pata chal gaya tha export quality hai. Dail Premium Herbal Hair Oil 120ml bottle is very effective. Hair texture bohat smooth ho gaya hai aur khushboo bhi natural herbal hai.',
    helpfulCount: 39
  },
  {
    id: 'rev-3',
    author: 'Dr. Maryam Khan',
    city: 'Islamabad (Sector F-10)',
    rating: 5,
    date: '1 week ago',
    verified: true,
    comment: 'As a dermatologist, I love that Dail Cosmetics explicitly writes "WITHOUT STEROID" on their boxes. Pakistani market mein steroids ka bohot issue hai. Dail Hand & Foot cream cleared my dark knuckles naturally!',
    helpfulCount: 74
  },
  {
    id: 'rev-4',
    author: 'Zainab Bibi',
    city: 'Rawalpindi (Bahria Town)',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    comment: 'Main ne Dail Complete Trio Set mangwaya tha COD par. Trax courier se 2 din mein deliver ho gaya. Teeno products lajawab hain, especially Hand & Foot cream.',
    helpfulCount: 46
  }
];

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Mardan',
  'Mirpur (AJK)',
  'Gilgit'
];
