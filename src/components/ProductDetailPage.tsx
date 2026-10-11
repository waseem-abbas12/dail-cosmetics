import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { REVIEWS } from '../data/products';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Phone,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setCurrentPage,
    addToCart,
    setIsCartOpen,
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center text-emerald-300">
        <p>No product selected.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-6 py-2 rounded-full bg-[#6aa84f] text-white text-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeViewMode, setActiveViewMode] = useState<'3d' | 'gallery'>('3d');
  const [selectedImage, setSelectedImage] = useState<string>(selectedProduct.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<'ingredients' | 'howToUse' | 'fullList' | null>('ingredients');
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dali Organics! I want to order "${selectedProduct.name}" (Qty: ${quantity}, Rs. ${selectedProduct.price * quantity}). Please confirm delivery details.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Botanical Catalog</span>
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: 3D Canvas / Gallery Showcase */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual Container */}
          <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#0f3422] to-[#071d13] border border-emerald-500/25 p-4 sm:p-8 overflow-hidden min-h-[460px] sm:min-h-[540px] flex items-center justify-center shadow-2xl">
            
            {/* View Mode Switcher Pill */}
            <div className="absolute top-4 right-4 z-30 flex items-center p-1 rounded-full glass-panel border border-emerald-500/30">
              <button
                onClick={() => setActiveViewMode('3d')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeViewMode === '3d'
                    ? 'bg-[#6aa84f] text-white shadow-md'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                🔄 3D 360° Inspect
              </button>
              <button
                onClick={() => setActiveViewMode('gallery')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeViewMode === 'gallery'
                    ? 'bg-[#6aa84f] text-white shadow-md'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                🖼️ Photos
              </button>
            </div>

            {/* Visual Content: 3D Scene or Image Gallery */}
            {activeViewMode === '3d' ? (
              <div className="w-full h-full min-h-[440px] flex items-center justify-center">
                <Dali3DCanvas
                  initialModel={selectedProduct.id.includes('oil') ? 'oil' : selectedProduct.id.includes('hand') ? 'hand-foot' : 'beauty-cream'}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-[440px] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={selectedProduct.name}
                  className="max-h-[460px] object-contain rounded-2xl drop-shadow-2xl"
                />
              </div>
            )}

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {selectedProduct.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#6aa84f] text-white shadow-md">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

          </div>

          {/* Thumbnail Gallery (shown always for easy image clicking) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {selectedProduct.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(img);
                  setActiveViewMode('gallery');
                }}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeViewMode === 'gallery' && selectedImage === img
                    ? 'border-[#78c459] ring-2 ring-[#78c459]/40 scale-105'
                    : 'border-emerald-500/20 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Details, Price, Ritual & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            {/* Rating & Reviews Header */}
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">{selectedProduct.rating}</span>
              <span className="text-emerald-400/80 font-medium">({selectedProduct.reviewCount} verified reviews)</span>
            </div>

            {/* Title & Urdu Name */}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-tight">
              {selectedProduct.name}
            </h1>

            {selectedProduct.urduName && (
              <p className="text-emerald-300 text-lg font-serif italic mt-1.5">
                {selectedProduct.urduName}
              </p>
            )}

            {/* Tagline */}
            <p className="text-emerald-200/80 text-sm mt-2 leading-relaxed font-light">
              {selectedProduct.tagline}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/25 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">
                  Rs. {selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-emerald-400/50 line-through">
                    Rs. {selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-medium block mt-0.5">
                Free Nationwide Delivery on orders over Rs. 3,500
              </span>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-mono font-medium border border-emerald-500/30">
                {selectedProduct.volume}
              </span>
              <span className="block text-[10px] text-emerald-400/70 mt-1">In Stock • Fresh Batch</span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              
              {/* Stepper */}
              <div className="flex items-center rounded-full glass-panel border border-emerald-500/30 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-emerald-800/50 transition-colors text-base"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-emerald-800/50 transition-colors text-base"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/70 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Add to Cart • Rs. {(selectedProduct.price * quantity).toLocaleString()}</span>
              </button>

            </div>

            {/* Quick Buy & WhatsApp Buy */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 rounded-full bg-gradient-to-r from-[#17482d] to-[#25613c] hover:from-[#205b39] hover:to-[#2e7449] border border-emerald-400/40 text-white text-xs font-semibold shadow-md transition-all text-center"
              >
                Instant Checkout (COD)
              </button>

              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full bg-[#1b432a] hover:bg-[#235837] border border-emerald-500/30 text-emerald-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#25d366]" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Added Toast Alert */}
            {addedToast && (
              <div className="p-3 rounded-xl bg-[#6aa84f] text-white text-xs font-medium flex items-center justify-between shadow-lg animate-fade-in">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Added {quantity}x to your shopping cart!
                </span>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="underline font-bold text-xs"
                >
                  View Cart
                </button>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/15 space-y-2 text-xs text-emerald-200/80">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#78c459] shrink-0" />
              <span>Fast 2-4 days courier delivery via Trax / TCS across Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#78c459] shrink-0" />
              <span>100% Cash On Delivery (COD) — Inspect your package before paying</span>
            </div>
          </div>

          {/* Accordion Tabs for Ingredients, How to Use, Clinical */}
          <div className="space-y-2.5 pt-2">
            
            {/* Key Ingredients */}
            <div className="rounded-2xl bg-[#0b2819] border border-emerald-500/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left text-sm font-semibold text-white"
              >
                <span className="flex items-center gap-2">
                  <span>🌿</span> Key Active Botanicals
                </span>
                {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
              </button>
              {openAccordion === 'ingredients' && (
                <div className="px-4 pb-4 space-y-3 text-xs text-emerald-200/90 border-t border-emerald-500/15 pt-3">
                  {selectedProduct.keyIngredients.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/15">
                      <strong className="text-white block font-medium">{item.name}</strong>
                      <span className="text-emerald-300/75 mt-0.5 block">{item.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* How to Use */}
            <div className="rounded-2xl bg-[#0b2819] border border-emerald-500/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'howToUse' ? null : 'howToUse')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left text-sm font-semibold text-white"
              >
                <span className="flex items-center gap-2">
                  <span>✨</span> Ayurvedic Ritual & Application Guide
                </span>
                {openAccordion === 'howToUse' ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
              </button>
              {openAccordion === 'howToUse' && (
                <div className="px-4 pb-4 space-y-2 text-xs text-emerald-200/90 border-t border-emerald-500/15 pt-3">
                  {selectedProduct.howToUse.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#1b4e2f] text-emerald-200 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full INCI Ingredients */}
            <div className="rounded-2xl bg-[#0b2819] border border-emerald-500/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'fullList' ? null : 'fullList')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left text-sm font-semibold text-white"
              >
                <span className="flex items-center gap-2">
                  <span>🔬</span> 100% Full Ingredients Disclosure
                </span>
                {openAccordion === 'fullList' ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
              </button>
              {openAccordion === 'fullList' && (
                <div className="px-4 pb-4 text-xs text-emerald-300/80 leading-relaxed border-t border-emerald-500/15 pt-3">
                  <p>{selectedProduct.fullIngredients}</p>
                  <p className="mt-2 text-[11px] text-[#78c459]">
                    * Certified 0% Mineral Oil, 0% Silicones, 0% Parabens, 0% Artificial Colors.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Verified Pakistani Customer Reviews Section */}
      <section className="mt-16 sm:mt-24 pt-12 border-t border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78c459]">
              Verified Feedback
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
              Customer Reviews from Pakistan
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">4.9</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-emerald-300">Based on 3,400+ orders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0e3120] to-[#082015] border border-emerald-500/20 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1b4d2f] flex items-center justify-center font-bold text-emerald-200">
                    {review.author[0]}
                  </div>
                  <div>
                    <strong className="text-white text-sm block font-medium">{review.author}</strong>
                    <span className="text-xs text-emerald-400/80">{review.city}</span>
                  </div>
                </div>
                {review.verified && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#18482b] text-[#78c459] border border-emerald-500/30">
                    ✓ Verified Pakistani Buyer
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[11px] text-emerald-400/60 ml-2">{review.date}</span>
              </div>

              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
                "{review.comment}"
              </p>

              <div className="pt-2 text-right">
                <span className="text-[11px] text-emerald-400/60">
                  {review.helpfulCount} customers found this helpful
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
