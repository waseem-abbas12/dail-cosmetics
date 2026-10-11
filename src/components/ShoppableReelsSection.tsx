import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Play, Heart, ShoppingBag, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface ReelItem {
  id: string;
  title: string;
  caption: string;
  creator: string;
  thumbnail: string;
  videoUrl?: string;
  product: Product;
  likes: number;
}

export const ShoppableReelsSection: React.FC = () => {
  const { addToCart, setSelectedProduct, setCurrentPage, getWhatsAppUrl } = useStore();
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      title: 'Postpartum Hair Fall Stopped in 12 Days! ✨',
      caption: 'Real Pakistani mom routine using Dail Premium Herbal Hair Oil 120ml. Baby hairs are visibly growing back!',
      creator: '@anums_lifestyle',
      thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      product: PRODUCTS[0],
      likes: 1420
    },
    {
      id: 'reel-2',
      title: '5-Day Glow Test: WITHOUT STEROIDS 🤍',
      caption: 'Testing Dail Beauty Cream. Zero redness, no skin peeling, pure natural brightening glow!',
      creator: '@glambyhirakhan',
      thumbnail: 'https://images.unsplash.com/photo-1512290900672-1f55b9e07802?auto=format&fit=crop&w=600&q=80',
      product: PRODUCTS[1],
      likes: 2180
    },
    {
      id: 'reel-3',
      title: 'Dark Knuckles & Heels Transformation 🦶',
      caption: 'How Dail 3-Action Hand & Foot Cream completely restored my sun-damaged feet.',
      creator: '@skinroutine_pk',
      thumbnail: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
      product: PRODUCTS[2],
      likes: 980
    },
    {
      id: 'reel-4',
      title: 'Full Unboxing: The Dail Trio Regimen Box 🎁',
      caption: 'Export quality tamper-proof seals & fresh batches delivered to Lahore in 48 hours via COD!',
      creator: '@unboxingpakistan',
      thumbnail: '/images/dail_packaging.jpg',
      product: PRODUCTS[3],
      likes: 3410
    }
  ];

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    setActiveReel(null);
  };

  const handleAddAndClose = (product: Product) => {
    addToCart(product, 1);
    setActiveReel(null);
  };

  return (
    <section className="py-10 sm:py-16 bg-[#fafafa] border-y border-[#e8e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Golden Pearl Instagram Widget Style) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-[0.25em] text-[#d0473e] mb-1">
            <InstagramIcon className="w-4 h-4" />
            <span>@ FOLLOW US ON INSTAGRAM</span>
          </div>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-900">
            Watch, Learn & Shop
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1.5 font-normal">
            Real routines, customer unboxings, and verified transformations from across Pakistan.
          </p>
        </div>

        {/* 4-Reel Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => setActiveReel(reel)}
              className="group relative aspect-9/16 rounded-xs overflow-hidden cursor-pointer bg-stone-900 shadow-md border border-stone-200 hover:border-[#d0473e] transition-all"
            >
              {/* Thumbnail Image */}
              <img 
                src={reel.thumbnail} 
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

              {/* Play Badge Icon (Center) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#d0473e] group-hover:scale-110 transition-all shadow-lg">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                </div>
              </div>

              {/* Creator Handle (Top Left) */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                <InstagramIcon className="w-3 h-3 text-[#c59b27]" />
                <span>{reel.creator}</span>
              </div>

              {/* Likes (Top Right) */}
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                <span>{reel.likes}</span>
              </div>

              {/* Bottom Card Info: Product Tag & CTA */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white space-y-2">
                <p className="font-heading text-xs sm:text-sm font-bold line-clamp-2 leading-tight">
                  {reel.title}
                </p>
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/20">
                  <span className="text-[10px] font-semibold text-amber-300 truncate">
                    {reel.product.name.split(' ')[0]} {reel.product.name.split(' ')[1]}
                  </span>
                  <span className="text-[9px] bg-[#d0473e] text-white px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider shrink-0">
                    SHOP NOW
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Instagram Profile CTA Button */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-heading font-bold uppercase tracking-widest rounded-xs shadow-2xs hover:border-[#d0473e] hover:text-[#d0473e] transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-[#d0473e]" />
            <span>VISIT OUR INSTAGRAM @DAILCOSMETICS</span>
          </a>
        </div>

      </div>

      {/* Interactive Reel Video Pop-up Modal */}
      {activeReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-stone-900 rounded-xs overflow-hidden shadow-2xl border border-stone-700 text-white flex flex-col max-h-[90vh]">
            
            {/* Modal Top Bar */}
            <div className="p-3 bg-stone-950/80 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2 text-xs font-bold">
                <InstagramIcon className="w-4 h-4 text-[#c59b27]" />
                <span>{activeReel.creator}</span>
              </div>
              <button 
                onClick={() => setActiveReel(null)}
                className="p-1 hover:text-[#d0473e] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video / Photo Preview */}
            <div className="relative aspect-4/5 w-full bg-black overflow-hidden flex items-center justify-center">
              <img 
                src={activeReel.thumbnail} 
                alt={activeReel.title}
                className="w-full h-full object-contain" 
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/70 backdrop-blur-md rounded-xs text-xs space-y-1">
                <p className="font-bold text-white">{activeReel.title}</p>
                <p className="text-stone-300 text-[11px] line-clamp-2">{activeReel.caption}</p>
              </div>
            </div>

            {/* Featured Product Shop Box */}
            <div className="p-4 bg-white text-stone-900 space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src={activeReel.product.image} 
                  alt={activeReel.product.name}
                  className="w-14 h-14 object-contain rounded-xs border border-stone-200 bg-stone-50 p-1" 
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#d0473e] tracking-wider">
                    FEATURED IN THIS REEL
                  </span>
                  <h4 className="font-heading text-xs font-bold truncate">
                    {activeReel.product.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-heading text-sm font-extrabold text-[#d0473e]">
                      Rs. {activeReel.product.price.toLocaleString()}
                    </span>
                    {activeReel.product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        Rs. {activeReel.product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddAndClose(activeReel.product)}
                  className="flex-1 btn-gp-primary py-2.5 text-xs font-heading font-bold tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => handleOpenProduct(activeReel.product)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xs cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
