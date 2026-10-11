import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import type { ProductCategory } from '../types';
import { Filter, RotateCcw } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedConcern,
    setSelectedConcern,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: { label: string; value: ProductCategory; icon: string }[] = [
    { label: 'All Formulations', value: 'all', icon: '🌿' },
    { label: '32-Herb Hair Oils', value: 'hair-oil', icon: '🧴' },
    { label: 'Radiance Face Creams', value: 'cream', icon: '✨' },
    { label: 'Scalp Hydro-Mists', value: 'mist', icon: '💧' },
    { label: 'Complete Regimen Sets', value: 'bundles', icon: '🎁' },
  ];

  const concerns = [
    'all',
    'Hair Fall',
    'Follicle Regrowth',
    'Dandruff',
    'Radiant Glow',
    'Deep Moisture',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Concern match
      if (selectedConcern !== 'all' && !product.concern.includes(selectedConcern)) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesIngredients = product.fullIngredients.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesIngredients) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedConcern, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedConcern('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78c459]">
          Pure Subcontinental Botanicals
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
          Our Botanical <span className="italic text-[#a4e38b]">Dispensary</span>
        </h1>
        <p className="text-emerald-200/70 text-sm sm:text-base font-light">
          Handcrafted in small sunlit batches in Pakistan. Zero mineral oil, zero silicones, cruelty-free, and dermatologically tested.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none justify-start sm:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 flex items-center gap-2 border ${
              selectedCategory === cat.value
                ? 'bg-[#6aa84f] text-white border-[#7bc05d] shadow-lg shadow-emerald-950/60'
                : 'bg-emerald-950/50 text-emerald-200/80 border-emerald-500/20 hover:border-emerald-400/50 hover:text-white'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Controls & Filter Sub-Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 mb-8 flex flex-wrap items-center justify-between gap-4">
        
        {/* Concern Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-emerald-300/70 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#78c459]" /> Concern:
          </span>
          {concerns.map((concern) => (
            <button
              key={concern}
              onClick={() => setSelectedConcern(concern)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                selectedConcern === concern
                  ? 'bg-emerald-800 text-white font-semibold'
                  : 'bg-emerald-950/70 text-emerald-300/70 hover:text-white border border-emerald-500/20'
              }`}
            >
              {concern === 'all' ? 'All Concerns' : concern}
            </button>
          ))}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-emerald-300/70">
            Showing <strong className="text-white">{filteredProducts.length}</strong> items
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0b2818] border border-emerald-500/30 text-emerald-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#78c459]"
          >
            <option value="featured">Featured / Best Seller</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated (★)</option>
          </select>
        </div>

      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-3xl glass-card border border-emerald-500/20 max-w-lg mx-auto space-y-4">
          <div className="text-4xl">🌿</div>
          <h3 className="font-serif-luxury text-xl font-bold text-white">No botanical formulations found</h3>
          <p className="text-emerald-300/70 text-sm">
            We couldn't find any products matching your specific filter criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6aa84f] text-white text-xs font-semibold shadow-md hover:bg-[#7bc05d] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Nationwide Pakistani Delivery Guarantee Footer */}
      <div className="mt-16 p-6 rounded-3xl bg-gradient-to-r from-[#0d2a1a] via-[#123824] to-[#0d2a1a] border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4 text-emerald-200 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <div>
            <strong className="text-white block text-sm">Nationwide Delivery Across All Pakistan Cities</strong>
            <span>Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad & more.</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-[#a4e38b]">✓ Cash on Delivery (COD)</span>
          <span className="text-[#a4e38b]">✓ 14-Day Money Back Guarantee</span>
        </div>
      </div>

    </div>
  );
};
