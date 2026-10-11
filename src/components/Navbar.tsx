import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Search, Heart, Truck, Menu, X, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import type { PageView, ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    getTotalItemsCount, 
    getCartSubtotal,
    setIsCartOpen, 
    wishlist,
    searchQuery, 
    setSearchQuery,
    setSelectedCategory,
    setIsSearchOpen,
    storeSettings,
    getWhatsAppUrl
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getTotalItemsCount();
  const subtotal = getCartSubtotal();
  const wishlistCount = wishlist.length;

  const navigateTo = (page: PageView, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* 1. Top Announcement Bar (Prestige Shopify Style) */}
      <div className="bg-[#7b3e1d] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
            <span className="font-medium tracking-wide">
              {storeSettings.announcementText}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] text-amber-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Strictly 0% Steroids
            </span>
            <span>•</span>
            <a 
              href={getWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 font-bold underline decoration-amber-300/50"
            >
              <Phone className="w-3 h-3 text-emerald-400" /> WhatsApp: {storeSettings.whatsappNumber}
            </a>
            <span>•</span>
            <button 
              onClick={() => navigateTo('track-order')}
              className="hover:text-white underline cursor-pointer"
            >
              Track Order
            </button>
            <span>•</span>
            <button 
              onClick={() => navigateTo('admin')}
              className="px-2.5 py-0.5 rounded-md bg-amber-200 text-[#7b3e1d] font-bold hover:bg-white transition-colors cursor-pointer"
            >
              ⚙️ Store Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-stone-200/90 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo & Signature Crest */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white p-0.5 border border-[#c59b27]/40 shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/images/dail_logo.png" 
                alt="Dail Cosmetics Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#1a1a1a] flex items-center gap-1.5">
                DAIL <span className="text-[#c59b27] font-normal italic">COSMETICS</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#7b3e1d] font-semibold">
                Pure Herbal • Without Steroid
              </span>
            </div>
          </div>

          {/* Desktop Luxury Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-stone-700">
            <button
              onClick={() => navigateTo('home')}
              className={`transition-colors hover:text-[#7b3e1d] relative py-1 ${
                currentPage === 'home' ? 'text-[#7b3e1d] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7b3e1d]' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`transition-colors hover:text-[#7b3e1d] relative py-1 ${
                currentPage === 'shop' ? 'text-[#7b3e1d] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7b3e1d]' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => navigateTo('shop', 'hair-oil')}
              className="transition-colors hover:text-[#7b3e1d] py-1"
            >
              Herbal Hair Oil
            </button>
            <button
              onClick={() => navigateTo('shop', 'cream')}
              className="transition-colors hover:text-[#7b3e1d] py-1 flex items-center gap-1"
            >
              <span>Beauty Creams</span>
              <span className="text-[10px] bg-amber-100 text-[#7b3e1d] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                0% Steroid
              </span>
            </button>
            <button
              onClick={() => navigateTo('shop', 'bundles')}
              className="transition-colors hover:text-[#7b3e1d] py-1"
            >
              Regimen Bundles
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`transition-colors hover:text-[#7b3e1d] relative py-1 ${
                currentPage === 'about' ? 'text-[#7b3e1d] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7b3e1d]' : ''
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => navigateTo('track-order')}
              className={`transition-colors hover:text-[#7b3e1d] relative py-1 ${
                currentPage === 'track-order' ? 'text-[#7b3e1d] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7b3e1d]' : ''
              }`}
            >
              Track Order
            </button>
          </div>

          {/* Right Action Icons (Search, Wishlist, Cart Drawer Pill) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
              title="Search products..."
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 sm:p-2.5 text-stone-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* High-Converting Cart Drawer Trigger Pill */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xs transition-all duration-200 group cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#c59b27] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-stone-300 uppercase font-medium">Cart</span>
                <span className="text-xs font-bold text-white mt-0.5">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-4 text-base font-medium text-stone-800">
            <button
              onClick={() => navigateTo('home')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => navigateTo('shop', 'hair-oil')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              100% Organic Hair Oil (120ml)
            </button>
            <button
              onClick={() => navigateTo('shop', 'cream')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Steroid-Free Beauty Creams
            </button>
            <button
              onClick={() => navigateTo('shop', 'bundles')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Value Regimen Bundles
            </button>
            <button
              onClick={() => navigateTo('wishlist')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Wishlist ({wishlistCount})
            </button>
            <button
              onClick={() => navigateTo('track-order')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              Track Your Order (TCS / Trax)
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="block w-full text-left py-2 border-b border-stone-100 hover:text-[#7b3e1d]"
            >
              About Dail Cosmetics
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className="block w-full text-left py-2 text-[#7b3e1d] font-bold"
            >
              ⚙️ Store Admin & Manager
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-stone-200 flex flex-col gap-3">
            <a
              href={getWhatsAppUrl('Hello Dail Cosmetics! I want to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4" /> Order on WhatsApp ({storeSettings.whatsappNumber})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
