import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="mt-20 border-t border-emerald-500/20 bg-[#05140d] text-emerald-200/80">
      
      {/* Top Newsletter & Promo Banner */}
      <div className="border-b border-emerald-500/15 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78c459]">
            Official Dail Cosmetics Circle
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Receive 10% Off Your First Order in Pakistan
          </h3>
          <p className="text-xs sm:text-sm text-emerald-300/70 max-w-lg mx-auto font-light">
            Subscribe for seasonal harvest notifications, authentic hair growth regimens, and VIP discounts.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-full bg-[#1b4e2f] text-[#a4e38b] text-xs font-semibold max-w-md mx-auto">
              ✓ Welcome! Use voucher code <strong className="text-white underline">ORGANIC10</strong> at checkout for 10% discount.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-emerald-950/80 border border-emerald-500/30 rounded-full px-5 py-2.5 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-xs font-semibold shadow-md transition-all shrink-0"
              >
                Claim 10% Off
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-amber-400 overflow-hidden shrink-0">
              <img src="/images/dail_logo.png" alt="Dail Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif-luxury text-xl font-bold text-white tracking-wider">
              DAIL <span className="text-[#78c459] italic font-light">COSMETICS</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-300/70">
            Pakistan’s premier organic brand for 100% Organic Herbal Hair Oil (120ml) and Steroid-Free Beauty Creams. Export Quality formulations for healthy, radiant South Asian hair and skin.
          </p>
          <div className="text-[11px] text-emerald-400/80 font-mono">
            Lahore • Karachi • Islamabad • Nationwide
          </div>
        </div>

        {/* Col 2: Dispensary Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Official Products</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => { setSelectedCategory('hair-oil'); setCurrentPage('shop'); }}
                className="hover:text-white transition-colors"
              >
                Dail Premium Herbal Hair Oil (120ml)
              </button>
            </li>
            <li>
              <button
                onClick={() => { setSelectedCategory('cream'); setCurrentPage('shop'); }}
                className="hover:text-white transition-colors"
              >
                Dail Beauty Cream (Without Steroid)
              </button>
            </li>
            <li>
              <button
                onClick={() => { setSelectedCategory('cream'); setCurrentPage('shop'); }}
                className="hover:text-white transition-colors"
              >
                Dail Hand & Foot Whitening Cream
              </button>
            </li>
            <li>
              <button
                onClick={() => { setSelectedCategory('bundles'); setCurrentPage('shop'); }}
                className="hover:text-white transition-colors"
              >
                Complete 3-in-1 Regimen Box (Save Rs. 1,001)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Tracking */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setCurrentPage('track-order')}
                className="hover:text-white transition-colors text-[#a4e38b] font-medium"
              >
                Track Courier Parcel (TCS / Trax)
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('about')}
                className="hover:text-white transition-colors"
              >
                Why Without Steroids?
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('contact')}
                className="hover:text-white transition-colors"
              >
                Request Free Hair & Skin Consultation
              </button>
            </li>
            <li>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>WhatsApp Helpline: 0300-1234567</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Pakistani Logistics & Badges */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Nationwide Logistics</h4>
          <p className="text-xs text-emerald-300/70 leading-relaxed">
            Fast doorstep dispatch across all provinces in Pakistan via trusted courier networks.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[10px] text-white font-mono">
              TRAX EXPRESS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[10px] text-white font-mono">
              TCS LOGISTICS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[10px] text-white font-mono">
              LEOPARDS
            </span>
          </div>
          <div className="pt-2 text-[11px] text-[#78c459] font-medium">
            ✓ 100% Cash On Delivery Available
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-emerald-500/15 py-6 px-4 text-center text-xs text-emerald-400/60">
        <p>© 2026 Dail Cosmetics (DC). Handcrafted in Pakistan. All rights reserved.</p>
      </div>

    </footer>
  );
};
