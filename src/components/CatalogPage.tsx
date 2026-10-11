import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import type { ProductCategory } from '../types';
import { Filter, RotateCcw, Search, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const {
    products,
    categories,
    concerns,
    selectedCategory,
    setSelectedCategory,
    selectedConcern,
    setSelectedConcern,
    searchQuery,
    setSearchQuery,
    maxPriceFilter,
    setMaxPriceFilter
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Concern match
      if (selectedConcern !== 'all' && !product.concern.some((c) => c.toLowerCase().includes(selectedConcern.toLowerCase()))) {
        return false;
      }
      // Price filter
      if (product.price > maxPriceFilter) {
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
  }, [selectedCategory, selectedConcern, searchQuery, sortBy, maxPriceFilter]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedConcern('all');
    setSearchQuery('');
    setMaxPriceFilter(5000);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedConcern !== 'all' || searchQuery !== '' || maxPriceFilter < 5000;

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Official Pakistani Formulation Catalog</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Curated Botanical <span className="text-[#7b3e1d] italic">Apothecary</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Export-grade cold-pressed herbal hair oils and certified steroid-free restorative beauty creams.
          </p>
        </div>

        {/* Search & Main Category Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-5">
          
          {/* Top Search Input inside Catalog */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search formulations by name, ingredient, or concern..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:border-[#7b3e1d]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-stone-500 font-medium">
                Showing <strong>{filteredProducts.length}</strong> of {products.length} formulations
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-stone-100">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#7b3e1d] text-white border-[#7b3e1d] shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Sub Filters Row: Price Range + Concern Pills + Sorting */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            
            {/* Concern Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-stone-400 font-semibold shrink-0">Concern:</span>
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => setSelectedConcern(concern)}
                  className={`px-3 py-1 rounded-full capitalize shrink-0 font-medium transition-colors cursor-pointer ${
                    selectedConcern === concern
                      ? 'bg-stone-900 text-white font-bold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>

            {/* Price Slider & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-4 ml-auto">
              
              {/* Price Filter */}
              <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
                <span className="text-stone-500 text-[11px] font-medium">Max Price:</span>
                <span className="font-bold text-[#7b3e1d] text-xs">Rs. {maxPriceFilter.toLocaleString()}</span>
                <input
                  type="range"
                  min="1200"
                  max="5000"
                  step="100"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-20 accent-[#7b3e1d] cursor-pointer"
                />
              </div>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#7b3e1d] cursor-pointer font-medium"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-[#7b3e1d] hover:underline font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 max-w-md mx-auto p-8 shadow-xs space-y-3">
            <p className="text-base font-bold text-stone-800">No products match your selected filters</p>
            <p className="text-xs text-stone-500">Please adjust your price or concern filter to view Dail formulations.</p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full bg-[#7b3e1d] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
