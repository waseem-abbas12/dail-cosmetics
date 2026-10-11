import React from 'react';
import { useStore } from '../store/useStore';
import type { ProductCategory } from '../types';

export const CategoryCirclesBar: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useStore();

  const categories = [
    {
      id: 'cat-creams',
      name: 'Face Creams',
      slug: 'cream',
      image: '/images/dail_beauty_cream.jpg',
      tag: '5-Day Plan',
    },
    {
      id: 'cat-hair',
      name: 'Hair Oils & Care',
      slug: 'hair-care',
      image: '/images/dail_hair_oil.jpg',
      tag: '100% Organic',
    },
    {
      id: 'cat-serums',
      name: 'Serums & Glow',
      slug: 'serum',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
      tag: '24K Saffron',
    },
    {
      id: 'cat-cleansers',
      name: 'Face Wash & Cleansers',
      slug: 'cleanser',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      tag: 'Vitamin C',
    },
    {
      id: 'cat-handfoot',
      name: 'Hand & Foot Care',
      slug: 'cream',
      image: '/images/dail_hand_foot.jpg',
      tag: '3-Action',
    },
    {
      id: 'cat-bundles',
      name: 'Bundles & Deals',
      slug: 'bundles',
      image: '/images/dail_packaging.jpg',
      tag: 'Save 30%',
    },
  ];

  const handleSelect = (slug: ProductCategory) => {
    setSelectedCategory(slug);
    setCurrentPage('shop');
  };

  return (
    <section className="py-6 sm:py-10 bg-white border-b border-[#e8e8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mini Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d0473e]">
            Shop By Collection
          </span>
          <h2 className="font-heading text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-stone-900 mt-0.5">
            Explore Categories
          </h2>
        </div>

        {/* Categories Horizontal Scroll / Grid */}
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
            >
              {/* Circle Avatar with Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-stone-200 group-hover:border-[#d0473e] transition-all duration-300 shadow-2xs group-hover:scale-105 overflow-hidden bg-stone-50">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
                {/* Floating Tag */}
                {cat.tag && (
                  <span className="absolute bottom-0 inset-x-0 bg-[#d0473e] text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-center py-0.5 opacity-90 group-hover:opacity-100">
                    {cat.tag}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="font-heading text-xs sm:text-xs font-bold uppercase tracking-wider text-stone-800 group-hover:text-[#d0473e] text-center max-w-[90px] sm:max-w-[110px] leading-tight transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
