import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Dali3DCanvas } from './3d/Dali3DCanvas';
import { PRODUCTS, REVIEWS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Phone,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Box,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setCurrentPage,
    addToCart,
    setIsCartOpen,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const product = selectedProduct || PRODUCTS[0];

  const [activeViewMode, setActiveViewMode] = useState<'gallery' | '3d'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordion, setOpenAccordion] = useState<'benefits' | 'ingredients' | 'howToUse' | 'safety' | null>('benefits');
  const [addedToast, setAddedToast] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const allImages = [product.image, ...product.galleryImages];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `As-salamu alaykum Dail Cosmetics!\n\nI want to order:\n• ${product.name} (Qty: ${quantity})\nTotal: Rs. ${(product.price * quantity).toLocaleString()}\n\nPlease confirm my Cash on Delivery order!`
  );

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Back Button */}
        <div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#7b3e1d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Formulations</span>
          </button>
        </div>

        {/* Main Product Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Stage (Gallery + 3D Toggle) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* View Mode Toggle Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                <button
                  onClick={() => setActiveViewMode('gallery')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeViewMode === 'gallery'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Photo Gallery
                </button>
                <button
                  onClick={() => setActiveViewMode('3d')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    activeViewMode === '3d'
                      ? 'bg-[#7b3e1d] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Interactive 3D</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-rose-500 shadow-xs transition-colors"
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Display Stage Container */}
            <div className="relative aspect-square w-full rounded-3xl bg-white border border-stone-200/90 shadow-sm overflow-hidden flex items-center justify-center p-4">
              {activeViewMode === 'gallery' ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#fbf9f5] to-[#f0e9dc] rounded-2xl overflow-hidden">
                  <Dali3DCanvas initialModel={product.modelType as any} className="w-full h-full" />
                </div>
              )}

              {/* Badges on Top Left */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7b3e1d] text-white uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-[#7b3e1d]">
                  {product.volume}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {activeViewMode === 'gallery' && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 p-1 transition-all shrink-0 ${
                      selectedImage === img ? 'border-[#7b3e1d] shadow-xs' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Editorial Buying Box & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c59b27]">
                Official Dail Cosmetics • {product.volume}
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>
              {product.urduName && (
                <p className="text-[#c59b27] font-serif text-lg italic">{product.urduName}</p>
              )}
            </div>

            {/* Star Rating & Verified Count */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-900">{product.rating}</span>
              <span className="text-xs text-stone-500 font-medium">({product.reviewCount} verified Pakistani reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 flex items-baseline justify-between shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#7b3e1d]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* In-Stock Indicator */}
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold">In Stock & Ready for Express Dispatch across Pakistan</span>
            </div>

            {/* Product Tagline & Description */}
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-stone-900 text-sm font-bold min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-stone-600 hover:bg-stone-100 transition-colors text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add to Bag • Rs. {(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Buy Now (Direct to Checkout) */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Buy Now (Cash on Delivery)
              </button>

              {/* Order via WhatsApp */}
              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Instant Order via WhatsApp (0300-1234567)</span>
              </a>

            </div>

            {/* Toast Feedback */}
            {addedToast && (
              <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center border border-emerald-300 animate-in fade-in duration-200">
                ✓ Added {quantity}x {product.name} to your shopping bag!
              </div>
            )}

            {/* Accordion Specs */}
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              
              {/* Accordion 1: Benefits */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'benefits' ? null : 'benefits')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>Clinical Benefits & Results</span>
                  {openAccordion === 'benefits' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'benefits' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 2: Key Ingredients */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>Active Herbal Ingredients</span>
                  {openAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.keyIngredients.map((item, i) => (
                      <div key={i} className="p-2 bg-stone-50 rounded-lg">
                        <strong className="text-stone-900 block">{item.name}</strong>
                        <p className="text-[11px] text-stone-500 mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 3: How to Apply */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'howToUse' ? null : 'howToUse')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>How To Apply (Ritual Routine)</span>
                  {openAccordion === 'howToUse' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'howToUse' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 space-y-2 border-t border-stone-100">
                    {product.howToUse.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-[#7b3e1d] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Safety & Guarantee */}
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'safety' ? null : 'safety')}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-50"
                >
                  <span>0% Steroid & Tamper-Proof Seal Guarantee</span>
                  {openAccordion === 'safety' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'safety' && (
                  <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>
                      Every batch of Dail Cosmetics is factory sealed with our signature embossed gold lids. 
                      Strictly certified 0% betamethasone, 0% clobetasol, and 0% toxic mercury. Safe for lifelong daily use by Pakistani men and women.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">Complementary Regimen</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                Complete Your Daily Ritual
              </h3>
            </div>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-bold text-[#7b3e1d] hover:underline"
            >
              View All Formulations →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
