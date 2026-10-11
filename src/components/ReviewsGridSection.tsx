import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsGridSection: React.FC = () => {
  const extendedReviews = [
    ...REVIEWS,
    {
      id: 'rev-5',
      author: 'Bilal Mehmood',
      city: 'Faisalabad (Kohinoor City)',
      rating: 5,
      date: '1 week ago',
      verified: true,
      comment: 'Bhai hair oil kamaal ki cheez hai. Mere baal gadhay ho rahe thay aur front hairline thin ho rahi thi. Dail 120ml hair oil ne 3 hafte mein hair density wapas le aayi. Zabardast packaging.',
      helpfulCount: 33
    },
    {
      id: 'rev-6',
      author: 'Fatima Noor',
      city: 'Multan (Cantt)',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      comment: 'Multan ki garmi aur dhoop se mere haath bohot kaale ho gaye thay. Dail Hand & Foot cream ne bina kisi jalan ke normal rangat wapas di. Sab se achi baat steroid nahi hai isme.',
      helpfulCount: 41
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
            Real Results Across Pakistan
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mt-1">
            Loved By Over <span className="text-gold-gradient italic">25,000+ Customers</span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light mt-1">
            Real Pakistani men & women who stopped using harmful steroid creams and switched to Dail.
          </p>
        </div>

        {/* Global Rating Score Pill */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl gold-glass-panel border border-[#d4af37]/40">
          <div className="text-center">
            <span className="text-3xl font-extrabold text-white">4.95</span>
            <div className="flex justify-center text-amber-400 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
          </div>
          <div className="pl-3 border-l border-[#d4af37]/25 text-left text-xs">
            <strong className="text-white block">100% Export Quality</strong>
            <span className="text-[#d4af37]">Verified COD Purchases</span>
          </div>
        </div>
      </div>

      {/* Grid of 6 Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extendedReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl gold-glass-card border border-[#d4af37]/20 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#143d24] text-[#78c459] border border-emerald-500/30">
                  ✓ Verified Buyer
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs">
              <div>
                <strong className="text-white block font-medium">{rev.author}</strong>
                <span className="text-[#d4af37] text-[11px] font-mono">{rev.city}</span>
              </div>
              <span className="text-stone-400 text-[10px]">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
