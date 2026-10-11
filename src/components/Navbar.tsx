import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Search, Truck, Menu, X, Phone, Compass } from 'lucide-react';
import type { PageView } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    getTotalItemsCount, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = getTotalItemsCount();

  const navigateTo = (page: PageView, category?: 'hair-oil' | 'cream' | 'bundles') => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Pakistani Nationwide Announcement Bar */}
      <div className="bg-[#0b2818] border-b border-emerald-500/20 text-xs py-2 px-4 text-emerald-200/90 text-center flex items-center justify-center gap-2 font-medium">
        <Truck className="w-3.5 h-3.5 text-[#6aa84f] inline-block animate-pulse" />
        <span>
          🇵🇰 <strong>Free Delivery Nationwide</strong> across Pakistan on orders over <strong>Rs. 3,500</strong> | 100% Organic • Without Steroid • Cash On Delivery
        </span>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav className="glass-panel border-b border-emerald-500/15 px-4 lg:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo with Official Circular Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 border-2 border-amber-400/60 shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/images/dail_logo.png" 
                alt="Dail Cosmetics Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-1.5">
                DAIL <span className="text-[#78c459] font-light italic">COSMETICS</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.22em] text-emerald-400/80 font-medium">
                Export Quality • Without Steroid
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-emerald-100/80">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors hover:text-white ${currentPage === 'home' ? 'text-[#78c459] font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`transition-colors hover:text-white ${currentPage === 'shop' ? 'text-[#78c459] font-semibold' : ''}`}
            >
              All Products
            </button>
            <button
              onClick={() => navigateTo('shop', 'hair-oil')}
              className="transition-colors hover:text-white"
            >
              100% Organic Hair Oil
            </button>
            <button
              onClick={() => navigateTo('shop', 'cream')}
              className="transition-colors hover:text-white"
            >
              Steroid-Free Creams
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors hover:text-white ${currentPage === 'about' ? 'text-[#78c459] font-semibold' : ''}`}
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('track-order')}
              className={`transition-colors hover:text-white flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 ${currentPage === 'track-order' ? 'text-[#78c459] border-[#78c459]/50' : ''}`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Track Order
            </button>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-emerald-950/90 border border-emerald-500/40 rounded-full px-3 py-1 text-xs">
                  <Search className="w-3.5 h-3.5 text-emerald-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search oils, creams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigateTo('shop');
                      }
                    }}
                    autoFocus
                    className="bg-transparent text-white focus:outline-none w-28 sm:w-44 text-xs"
                  />
                  <button 
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="text-emerald-400/70 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-emerald-200/80 hover:text-white hover:bg-emerald-900/40 transition-colors"
                  title="Search products"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Currency Pill */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/25">
              <span>🇵🇰 PKR</span>
            </div>

            {/* WhatsApp Direct Inquiry Button */}
            <a
              href="https://wa.me/923001234567?text=Hi%20Dail%20Cosmetics,%20I%20want%20to%20order%20your%20Organic%20Hair%20Oil%20and%20Beauty%20Cream."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1e4e30] hover:bg-[#28663f] text-emerald-100 border border-emerald-400/30 transition-all shadow-sm"
              title="Chat with Pharmacist on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-[#25d366]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-[#17482d] to-[#25613c] border border-emerald-400/30 text-white hover:border-[#78c459] transition-all shadow-md flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#6aa84f] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg border border-emerald-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-emerald-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-emerald-500/20 flex flex-col gap-3 px-2 pb-2 text-sm">
            <button
              onClick={() => navigateTo('home')}
              className="text-left py-2 text-emerald-100 hover:text-[#78c459] font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="text-left py-2 text-emerald-100 hover:text-[#78c459] font-medium"
            >
              All Dail Products
            </button>
            <button
              onClick={() => navigateTo('shop', 'hair-oil')}
              className="text-left py-2 text-emerald-200 hover:text-white pl-3 border-l border-emerald-600/40"
            >
              • Dail Herbal Hair Oil (120ml)
            </button>
            <button
              onClick={() => navigateTo('shop', 'cream')}
              className="text-left py-2 text-emerald-200 hover:text-white pl-3 border-l border-emerald-600/40"
            >
              • Dail Beauty Cream (Without Steroid)
            </button>
            <button
              onClick={() => navigateTo('shop', 'cream')}
              className="text-left py-2 text-emerald-200 hover:text-white pl-3 border-l border-emerald-600/40"
            >
              • Dail Hand & Foot Cream
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="text-left py-2 text-emerald-100 hover:text-[#78c459] font-medium"
            >
              Our Story (Without Steroid Guarantee)
            </button>
            <button
              onClick={() => navigateTo('track-order')}
              className="text-left py-2 text-emerald-100 hover:text-[#78c459] font-medium flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#78c459]" />
              Track Courier Parcel (TCS / Trax)
            </button>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-lg bg-emerald-900/60 text-emerald-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-[#25d366]" /> Direct WhatsApp Helpline
              </span>
              <span className="text-xs text-emerald-400">0300-1234567</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};
