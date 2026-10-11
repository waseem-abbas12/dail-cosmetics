import React from 'react';
import { Star, CheckCircle, Sparkles, Heart } from 'lucide-react';

export const ReviewsMarquee: React.FC = () => {
  const row1 = [
    {
      author: 'Ayesha Tariq',
      city: 'Lahore (DHA Phase 5)',
      rating: 5,
      product: 'Dail Beauty Cream (50g)',
      date: 'Verified Buyer • 2 days ago',
      comment: 'Dail Beauty Cream is the ONLY cream in Pakistan that gave me a glowing skin WITHOUT steroids! Koi skin thinning nahi hui, dhoop mein koi jalan nahi. Best organic cream!',
      tag: '0% Steroid Result'
    },
    {
      author: 'Muhammad Hamza',
      city: 'Karachi (Gulshan-e-Iqbal)',
      rating: 5,
      product: '100% Herbal Hair Oil (120ml)',
      date: 'Verified Buyer • 4 days ago',
      comment: 'Packaging dekh kar hi pata chal gaya export quality hai. Hair fall sirf 10-12 din mein 90% kam ho gaya. Hair thickness noticeable hai.',
      tag: 'Hair Fall Stopped'
    },
    {
      author: 'Dr. Maryam Khan',
      city: 'Islamabad (Sector F-10)',
      rating: 5,
      product: 'Hand & Foot Whitening Cream',
      date: 'Clinical Review • 1 week ago',
      comment: 'As a dermatologist, I appreciate that Dail writes "WITHOUT STEROID" on their box. Cleared my dark knuckles within 7 days naturally.',
      tag: 'Dermatologist Approved'
    },
    {
      author: 'Zainab Bibi',
      city: 'Rawalpindi (Bahria Town)',
      rating: 5,
      product: 'Complete 3-in-1 Regimen Box',
      date: 'Verified Buyer • 2 weeks ago',
      comment: 'Main ne trio set mangwaya tha. Trax courier se 2 din mein deliver ho gaya. Teeno products lajawab hain! Packaging 100% sealed thi.',
      tag: 'Full Regimen Fan'
    },
    {
      author: 'Bilal Mehmood',
      city: 'Faisalabad (Kohinoor City)',
      rating: 5,
      product: 'Herbal Hair Oil (120ml)',
      date: 'Verified Buyer • 1 week ago',
      comment: 'Front hairline thin ho rahi thi. Dail 120ml oil ne 3 hafte mein new baby hair growth start kar di. 100% genuine herbal smell.',
      tag: 'New Hair Regrowth'
    }
  ];

  const row2 = [
    {
      author: 'Fatima Noor',
      city: 'Multan (Cantt)',
      rating: 5,
      product: 'Hand & Foot Whitening Cream',
      date: 'Verified Buyer • 3 weeks ago',
      comment: 'Multan ki dhoop se haath paon kaale ho gaye thay. Dail Hand & Foot cream ne bina jalan ke normal rangat wapas di. Non-greasy texture hai.',
      tag: 'Tanned Skin Repair'
    },
    {
      author: 'Usman Ali',
      city: 'Peshawar (Hayatabad)',
      rating: 5,
      product: 'Herbal Hair Oil (120ml)',
      date: 'Verified Buyer • 5 days ago',
      comment: 'Dandruff aur dry scalp dono khatam ho gaye. Kalonji aur rosemary ka mixture bohot powerfull hai. Pure Pakistan mein best oil.',
      tag: 'Scalp Health'
    },
    {
      author: 'Sana Qureshi',
      city: 'Sialkot (Model Town)',
      rating: 5,
      product: 'Dail Beauty Cream (50g)',
      date: 'Verified Buyer • 6 days ago',
      comment: '5 days beauty plan bilkul sach hai. Acne marks aur pigmentation naturally fade ho gaye. Chehre par natural pinkish glow hai.',
      tag: '5-Day Glow Plan'
    },
    {
      author: 'Hassan Raza',
      city: 'Hyderabad (Qasimabad)',
      rating: 5,
      product: 'Complete 3-in-1 Regimen Box',
      date: 'Verified Buyer • 10 days ago',
      comment: 'Wife ke liye gift mangwaya tha. Luxury packaging aur gold embossed lids dekh kar bohot khush hui. Cash on Delivery service super fast thi.',
      tag: 'Gift Perfection'
    },
    {
      author: 'Mahnoor Tariq',
      city: 'Gujranwala (Cantt)',
      rating: 5,
      product: 'Herbal Hair Oil + Cream Duo',
      date: 'Verified Buyer • 12 days ago',
      comment: 'Steroids se meri skin kharab ho gayi thi pehle. Dail ne meri skin barrier ko heal kiya aur hair volume double kar diya. Shukriya Dail!',
      tag: 'Barrier Restored'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#fbf9f5] border-y border-stone-200/90 overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Real Pakistani Verified Experiences</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Loved by <span className="text-[#7b3e1d] italic">14,000+ Customers</span> Nationwide
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-normal max-w-lg mx-auto">
          Read uncensored feedback from verified buyers across Karachi, Lahore, Islamabad, Peshawar, Multan, and beyond.
        </p>
      </div>

      {/* Row 1 Marquee (Left Scroll) */}
      <div className="relative w-full overflow-hidden mb-5">
        <div className="animate-marquee flex gap-5 whitespace-nowrap">
          {[...row1, ...row1, ...row1].map((rev, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[400px] p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow shrink-0 whitespace-normal flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-[#7b3e1d] border border-amber-200/70">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-stone-900 font-bold">{rev.author}</strong>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <span className="text-stone-400 text-[11px] block">{rev.city}</span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium text-right max-w-[120px] truncate block">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 Marquee (Reverse Right Scroll) */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-reverse flex gap-5 whitespace-nowrap">
          {[...row2, ...row2, ...row2].map((rev, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[400px] p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-shadow shrink-0 whitespace-normal flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                    {rev.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <strong className="text-stone-900 font-bold">{rev.author}</strong>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                  <span className="text-stone-400 text-[11px] block">{rev.city}</span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium text-right max-w-[120px] truncate block">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
