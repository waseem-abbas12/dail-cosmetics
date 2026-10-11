import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsGridSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'oil' | 'cream'>('all');

  const extendedReviews = [
    ...REVIEWS,
    {
      id: 'rev-5',
      author: 'Bilal Mehmood',
      city: 'Faisalabad (Kohinoor City)',
      rating: 5,
      date: '1 week ago',
      verified: true,
      comment: 'Bhai hair oil kamaal ki cheez hai. Mere baal gir rahe thay aur front hairline thin ho rahi thi. Dail 120ml hair oil ne 3 hafte mein hair density wapas le aayi. Zabardast packaging.',
      helpfulCount: 33,
      product: 'oil'
    },
    {
      id: 'rev-6',
      author: 'Fatima Noor',
      city: 'Multan (Cantt)',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      comment: 'Multan ki dhoop se mere haath kaale ho gaye thay. Dail Hand & Foot cream ne bina kisi jalan ke normal rangat wapas di. Sab se achi baat steroid nahi hai isme.',
      helpfulCount: 41,
      product: 'cream'
    }
  ];

  const filtered = extendedReviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'oil') return r.comment.toLowerCase().includes('oil') || r.comment.toLowerCase().includes('hair');
    if (selectedFilter === 'cream') return r.comment.toLowerCase().includes('cream') || r.comment.toLowerCase().includes('face') || r.comment.toLowerCase().includes('hand');
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c59b27]">
            Real Results Across Pakistan
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Loved By Over <span className="text-[#7b3e1d] italic">14,000+ Customers</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-normal mt-1">
            Real Pakistani men & women who stopped using harmful steroid creams and switched to Dail.
          </p>
        </div>

        {/* Global Rating Score Box */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7b3e1d]">4.95</span>
            <div className="flex justify-center text-amber-400 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
          <div className="pl-3 border-l border-stone-200 text-left text-xs">
            <strong className="text-stone-900 block font-bold">100% Export Quality</strong>
            <span className="text-emerald-700 font-semibold">Verified COD Purchases</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          All Reviews ({extendedReviews.length})
        </button>
        <button
          onClick={() => setSelectedFilter('oil')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            selectedFilter === 'oil'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          Hair Oil Reviews
        </button>
        <button
          onClick={() => setSelectedFilter('cream')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            selectedFilter === 'cream'
              ? 'bg-[#7b3e1d] text-white shadow-xs'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          Beauty & Hand Creams
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-stone-400">{rev.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info & Verified Buyer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <strong className="text-stone-900 block font-bold">{rev.author}</strong>
                <span className="text-stone-400 text-[11px]">{rev.city}</span>
              </div>

              {rev.verified && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
