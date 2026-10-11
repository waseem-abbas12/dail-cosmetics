import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import {
  ShoppingBag,
  Phone,
  CheckCircle2,
  Star,
  Sparkles,
  ShieldCheck,
  Eye,
  Award,
  Layers,
  ZoomIn,
  Truck,
  Droplets,
  RotateCw
} from 'lucide-react';

interface StudioFeature {
  id: string;
  title: string;
  short: string;
  desc: string;
  x: number; // percentage
  y: number; // percentage
}

export const ProductStudioSpotlight: React.FC = () => {
  const { addToCart, setCurrentPage, setSelectedProduct } = useStore();
  const [selectedProductIdx, setSelectedProductIdx] = useState<number>(0);
  const [activeAngleIdx, setActiveAngleIdx] = useState<number>(0);
  const [activeFeature, setActiveFeature] = useState<StudioFeature | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<'standard' | 'jumbo'>('standard');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const currentProduct = PRODUCTS[selectedProductIdx];

  // Multi-angle packaging photography for each product
  const studioAngles: Record<number, { title: string; image: string; tag: string }[]> = {
    0: [
      { title: 'Front Presentation', image: '/images/dail_hair_oil.jpg', tag: '120ml Export Bottle' },
      { title: 'Full Packaging & Box', image: '/images/dail_packaging.jpg', tag: 'Official Box & Seal' },
      { title: 'Texture & Dropper', image: '/images/dail_hair_oil.jpg', tag: 'Cold-Pressed Amber Oil' },
    ],
    1: [
      { title: 'Cream Jar & Lid', image: '/images/dail_beauty_cream.jpg', tag: '50g Export Jar' },
      { title: 'Full Packaging & Box', image: '/images/dail_packaging.jpg', tag: '5-Day Beauty Plan' },
      { title: 'Embossed Gold Seal', image: '/images/dail_beauty_cream.jpg', tag: '0% Steroid Certified' },
    ],
    2: [
      { title: 'Hand & Foot Jar', image: '/images/dail_hand_foot.jpg', tag: '60g Sunburst Cap' },
      { title: 'Full Packaging & Box', image: '/images/dail_packaging.jpg', tag: '3-Action Repair' },
      { title: 'Formula Consistency', image: '/images/dail_hand_foot.jpg', tag: 'Deep Shea Moisture' },
    ],
  };

  // Hotspots definitions per product
  const productFeatures: Record<number, StudioFeature[]> = {
    0: [
      {
        id: 'f1',
        title: 'UV-Filtering Amber Flint Glass',
        short: '120ml Glass',
        desc: 'Pharmaceutical-grade flint amber glass blocks 99.8% of light radiation, preserving active cold-pressed rosemary and kalonji antioxidants from photo-degradation.',
        x: 48,
        y: 62,
      },
      {
        id: 'f2',
        title: 'Tamper-Proof Factory Seal',
        short: 'Gold Security Cap',
        desc: 'Precision gold metallic dropper collar with anti-counterfeit security ring. Guarantees 100% genuine formulation with zero mineral oil filler.',
        x: 48,
        y: 22,
      },
      {
        id: 'f3',
        title: 'Active Follicle Vasodilator',
        short: 'Rosemary & Kalonji',
        desc: 'Pure mountain-harvested rosemary and black seed oils stimulate dormant hair roots, forcing anagen regrowth within 14 days of application.',
        x: 75,
        y: 45,
      },
    ],
    1: [
      {
        id: 'f4',
        title: 'Embossed Metallic Gold Lid',
        short: 'Concentric Lid',
        desc: 'Precision threaded gold lid creates an airtight micro-seal, locking in raw botanical lipids without drying or microbial contamination.',
        x: 50,
        y: 25,
      },
      {
        id: 'f5',
        title: 'Strictly Without Steroid Certified',
        short: '0% Steroids',
        desc: 'Tested and verified 100% free from clobetasol, betamethasone, mercury, or harsh bleaches. Safe for lifelong barrier health.',
        x: 48,
        y: 55,
      },
      {
        id: 'f6',
        title: '5-Day Cellular Illumination',
        short: 'Kashmiri Saffron',
        desc: 'Saffron and niacinamide matrix naturally clears dark spots and melasma without causing sun burning or capillary thinning.',
        x: 78,
        y: 68,
      },
    ],
    2: [
      {
        id: 'f7',
        title: 'Sunburst Gold Threaded Cap',
        short: 'Vibrant Lid',
        desc: 'Distinctive Dail Hand & Foot signature gold threaded cap ensuring export quality preservation.',
        x: 50,
        y: 26,
      },
      {
        id: 'f8',
        title: '3-Action Cellular Repair',
        short: '3-Action Matrix',
        desc: 'Deep Moisture, Multi-Effect Brightening, and Skin Barrier Repair dissolve dark melanin patches on knuckles and heels.',
        x: 48,
        y: 60,
      },
    ],
  };

  const currentAngle = studioAngles[selectedProductIdx]?.[activeAngleIdx] || studioAngles[0][0];
  const features = productFeatures[selectedProductIdx] || productFeatures[0];

  const price = selectedVariant === 'jumbo' ? Math.round(currentProduct.price * 1.85) : currentProduct.price;
  const originalPrice = currentProduct.originalPrice
    ? (selectedVariant === 'jumbo' ? Math.round(currentProduct.originalPrice * 2) : currentProduct.originalPrice)
    : undefined;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleInspectFullPDP = () => {
    setSelectedProduct(currentProduct);
    setCurrentPage('product-detail');
  };

  const handleAddToCart = () => {
    addToCart(
      {
        ...currentProduct,
        price,
        volume: selectedVariant === 'jumbo'
          ? (currentProduct.volume.includes('120') ? '240ml Family Value' : '100g Double Pack')
          : currentProduct.volume,
      },
      1
    );
  };

  const whatsappMessage = encodeURIComponent(
    `As-salamu alaykum Dail Cosmetics!\n\nI want to order:\n• ${currentProduct.name} (${selectedVariant === 'jumbo' ? 'Value Pack' : currentProduct.volume})\nTotal: Rs. ${price.toLocaleString()} (Cash on Delivery)\n\nPlease confirm my order!`
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Studio Luxury Framing Container */}
      <div className="rounded-3xl sm:rounded-[36px] bg-white border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Interactive Multi-Angle Packaging Studio</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Examine Every <span className="text-[#7b3e1d] italic">Authentic Detail & Seal</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Inspect our genuine export packaging, tamper-proof embossed gold lids, and verify our 100% certified steroid-free formulations with interactive lens zoom.
          </p>
        </div>

        {/* Product Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {PRODUCTS.slice(0, 3).map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductIdx(idx);
                setActiveAngleIdx(0);
                setActiveFeature(null);
                setSelectedVariant('standard');
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                selectedProductIdx === idx
                  ? 'bg-[#7b3e1d] text-white border-[#7b3e1d] shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {idx === 0 && '🧴 120ml Herbal Hair Oil'}
              {idx === 1 && '✨ Dail Beauty Cream (0% Steroid)'}
              {idx === 2 && '💛 Hand & Foot Whitening'}
            </button>
          ))}
        </div>

        {/* Studio Showcase Split: Left Interactive Lens + Right Specs & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: High-Definition Multi-Angle Lens */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visual Stage Container */}
            <div
              className="relative aspect-square sm:aspect-4/3 w-full rounded-3xl bg-gradient-to-b from-[#fbf9f5] via-[#f7f2ea] to-[#ede5d6] border border-stone-200/90 shadow-inner flex items-center justify-center p-6 overflow-hidden group cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Product Visual Image */}
              <img
                src={currentAngle.image}
                alt={currentProduct.name}
                className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: 'scale(1.85)',
                      }
                    : { transform: 'scale(1)' }
                }
              />

              {/* Angle Tag Badge on Top Left */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-stone-800 border border-stone-200 shadow-2xs">
                  {currentAngle.tag}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-stone-500 bg-white/70 px-2.5 py-1 rounded-full">
                  <ZoomIn className="w-3 h-3 text-[#7b3e1d]" /> Hover to Magnify
                </span>
              </div>

              {/* Interactive Pulsing Feature Hotspots */}
              {!isZoomed &&
                features.map((feat) => (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeature(activeFeature?.id === feat.id ? null : feat)}
                    className="absolute z-20 group/hotspot transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${feat.x}%`, top: `${feat.y}%` }}
                    title={feat.title}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b27] opacity-60" />
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-[#7b3e1d] text-white text-[10px] font-bold items-center justify-center border-2 border-white shadow-md">
                        +
                      </span>
                    </span>
                  </button>
                ))}

              {/* Active Hotspot Popover Card */}
              {activeFeature && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#c59b27]/60 shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#7b3e1d]">
                      <Award className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>{activeFeature.title}</span>
                    </div>
                    <button
                      onClick={() => setActiveFeature(null)}
                      className="text-stone-400 hover:text-stone-800 text-xs font-bold p-0.5 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {activeFeature.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Angle Switcher Thumbnails */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex gap-2">
                {studioAngles[selectedProductIdx]?.map((ang, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAngleIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                      activeAngleIdx === idx
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <RotateCw className="w-3 h-3 text-[#c59b27]" />
                    <span>{ang.title}</span>
                  </button>
                ))}
              </div>

              <span className="text-xs text-stone-400 hidden sm:inline">
                Tap "+" to inspect features
              </span>
            </div>

          </div>

          {/* Right Column: Dynamic Spec Sheet & Direct Action */}
          <div className="lg:col-span-5 space-y-5">
            
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-500 mb-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{currentProduct.rating}</span>
                <span className="text-stone-500">({currentProduct.reviewCount} verified Pakistani reviews)</span>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {currentProduct.name}
              </h3>
              
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Key Clinical Benefits Checklist */}
            <div className="space-y-2 py-3 border-y border-stone-100">
              {currentProduct.benefits.slice(0, 3).map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Package Variant Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 block">Select Package Variant:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedVariant('standard')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedVariant === 'standard'
                      ? 'border-[#7b3e1d] bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <span className="block text-stone-900">{currentProduct.volume} Standard</span>
                  <span className="text-[#7b3e1d] font-bold text-xs">Rs. {currentProduct.price.toLocaleString()}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedVariant('jumbo')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedVariant === 'jumbo'
                      ? 'border-[#7b3e1d] bg-amber-50/60 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <span className="block text-stone-900">
                    {currentProduct.volume.includes('120') ? '240ml Family Pack' : '100g Double Glow'}
                  </span>
                  <span className="text-[#7b3e1d] font-bold text-xs">Rs. {Math.round(currentProduct.price * 1.85).toLocaleString()}</span>
                </button>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
                Rs. {price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-base text-stone-400 line-through">
                  Rs. {originalPrice.toLocaleString()}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                In Stock & Factory Sealed
              </span>
            </div>

            {/* Direct Buying Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • Rs. {price.toLocaleString()}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleInspectFullPDP}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 hover:border-stone-800 text-stone-800 text-xs font-bold transition-colors text-center cursor-pointer"
                >
                  Full Specifications
                </button>

                <a
                  href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trust Pill */}
            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dermatologically tested • Free from betamethasone, clobetasol & mercury</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
