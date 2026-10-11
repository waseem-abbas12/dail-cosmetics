import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShieldCheck, Truck, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import type { PageView, ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  const navigateTo = (page: PageView, cat?: ProductCategory) => {
    if (cat) setSelectedCategory(cat);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-[#161616] text-stone-300 border-t border-stone-800">
      
      {/* 1. Newsletter Banner */}
      <div className="border-b border-stone-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Join The Dail Circle</span>
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Receive 10% Off Your First Order in Pakistan
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-light">
            Subscribe for botanical wellness tips, hair regrowth routines, and exclusive VIP offers.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold max-w-md mx-auto">
              ✓ Welcome to Dail Cosmetics! Use voucher code <strong className="text-white underline">ORGANIC10</strong> at checkout for 10% discount.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#c59b27]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                Claim 10% Off
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
        
        {/* Brand Story Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400/60 overflow-hidden shrink-0">
              <img src="/images/dail_logo.png" alt="Dail Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                DAIL <span className="text-[#c59b27] font-normal italic">COSMETICS</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#c59b27]">
                100% Organic • Without Steroid
              </span>
            </div>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Pakistan's premier organic herbal cosmetics house. Dedicated to pure botanical wellness, 
            cold-pressed herbal oils, and certified steroid-free skincare formulations for long-lasting health.
          </p>
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Export Quality Standards • PCSIR Tested</span>
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Formulations</h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => navigateTo('shop', 'all')} className="hover:text-white transition-colors">
                All Products Catalog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop', 'hair-oil')} className="hover:text-white transition-colors">
                100% Organic Hair Oil (120ml)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop', 'cream')} className="hover:text-white transition-colors">
                Dail Beauty Cream (Without Steroid)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop', 'cream')} className="hover:text-white transition-colors">
                Hand & Foot Whitening Cream
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop', 'bundles')} className="hover:text-white transition-colors">
                Complete 3-in-1 Regimen Box
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button onClick={() => navigateTo('track-order')} className="hover:text-white transition-colors">
                Track Your Parcel (TCS / Trax)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('wishlist')} className="hover:text-white transition-colors">
                My Saved Wishlist
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                The Dail Steroid-Free Promise
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                Contact & Complaints
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="text-amber-400 hover:text-white transition-colors font-medium">
                ⚙️ Store Admin & Orders Hub
              </button>
            </li>
            <li>
              <span className="text-stone-500">Cash on Delivery Available Nationwide</span>
            </li>
          </ul>
        </div>

        {/* Official Contact & Courier Info */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Helpline & Dispatch</h4>
          <div className="space-y-2.5 text-stone-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: 0300-1234567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>support@dailcosmetics.pk</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Dispatched via TCS, Leopards & Trax</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Lahore & Karachi Logistics Hubs, Pakistan</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Trust Strip & Copyright */}
      <div className="border-t border-stone-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Dail Cosmetics Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery (COD)</span>
            <span>•</span>
            <span>JazzCash / EasyPaisa</span>
            <span>•</span>
            <span>Direct Bank Transfer</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
