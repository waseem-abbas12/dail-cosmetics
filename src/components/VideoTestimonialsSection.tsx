import React, { useState } from 'react';
import { Play, Star, ShieldCheck, Heart } from 'lucide-react';

export const VideoTestimonialsSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'v1',
      author: 'Dr. Aiman Tariq',
      role: 'Clinical Aesthetician',
      city: 'Lahore',
      title: 'Dermatologist Review: Why 0% Steroid in Dail Beauty Cream is Revolutionary',
      duration: '0:58',
      thumbnail: '/images/dail_beauty_cream.jpg',
      quote: 'Pakistani skin suffers terribly from cheap steroid formulas. Dail cream uses saffron and niacinamide instead of clobetasol, keeping the skin barrier intact.',
      views: '18.4K',
    },
    {
      id: 'v2',
      author: 'Fatima Zahra',
      role: 'Verified Buyer',
      city: 'Karachi (Clifton)',
      title: 'Unboxing 120ml Dail Herbal Hair Oil & 3-Week Hair Fall Results',
      duration: '1:12',
      thumbnail: '/images/dail_hair_oil.jpg',
      quote: 'After postpartum hair fall, this cold-pressed oil stopped shedding in 14 days. Smells completely natural with rosemary and kalonji.',
      views: '24.1K',
    },
    {
      id: 'v3',
      author: 'Hira Naveed',
      role: 'Verified Customer',
      city: 'Islamabad',
      title: 'Real Texture Test: Dail Hand & Foot Cream on Dark Knuckles',
      duration: '0:45',
      thumbnail: '/images/dail_hand_foot.jpg',
      quote: 'It absorbs without leaving oily residue. In 10 days my knuckles were noticeably brighter and soft.',
      views: '12.8K',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c59b27]">
            Real Results • Zero Filters
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Community <span className="text-[#7b3e1d] italic">Video Proof</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-lg font-normal">
            Real Pakistani customers and dermatologists sharing honest reviews and unboxings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#7b3e1d] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Unsponsored Authentic Feedback</span>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-[#7b3e1d] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration & Views */}
              <span className="absolute bottom-2.5 right-2.5 bg-black/75 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                {vid.duration}
              </span>
              <span className="absolute top-2.5 left-2.5 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                👁️ {vid.views}
              </span>
            </div>

            {/* Video Meta & Quote */}
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-stone-900">{vid.author}</span>
                  <span className="text-stone-400 text-[11px]">{vid.city}</span>
                </div>
                <h4 className="font-serif-luxury text-sm font-bold text-stone-900 line-clamp-2">
                  {vid.title}
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  "{vid.quote}"
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-emerald-700">✓ Verified Customer</span>
                <span className="text-[#c59b27] font-medium">{vid.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
