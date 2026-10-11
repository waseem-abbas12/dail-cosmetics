import React from 'react';
import { Sparkles } from 'lucide-react';

export const IngredientAlchemySection: React.FC = () => {
  const actives = [
    {
      icon: '🌿',
      name: 'Highland Rosemary & Mint',
      sub: 'Mountain-Harvested Bio-Actives',
      desc: 'Clinically proven follicle vasodilator. Stimulates microscopic capillary blood flow to dormant roots, stopping hair fall within 14 days.',
      badge: 'In Dail Hair Oil (120ml)',
    },
    {
      icon: '✨',
      name: 'Grade-A Kashmiri Saffron',
      sub: 'Natural Crocin Antioxidant',
      desc: 'Replaces dangerous steroids with pure botanical illumination. Blocks melanin oxidation to clear acne scars and pigmentation safely.',
      badge: 'In Dail Beauty Cream',
    },
    {
      icon: '🌱',
      name: 'Cold-Pressed Kalonji (Black Seed)',
      sub: 'Prophetic Thymoquinone Elixir',
      desc: 'Rich in essential fatty acids and natural amino acids that fortify the hair keratin cortex and stop chronic shedding from root to tip.',
      badge: 'In Dail Hair Oil (120ml)',
    },
    {
      icon: '🧈',
      name: 'Raw Shea Butter & Urea Matrix',
      sub: '3-Action Cellular Repair',
      desc: 'Penetrates tough cuticle layers on knuckles and heels. Gently dissolves dead melanin cells and locks in 48-hour deep moisture.',
      badge: 'In Dail Hand & Foot Cream',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#7b3e1d] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Pure Bio-Active Botanical Actives</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
          The Science of <span className="text-[#7b3e1d] italic">Herbal Alchemy</span>
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-normal">
          Why Dail Cosmetics delivers permanent, radiant results without relying on artificial bleaches or steroids.
        </p>
      </div>

      {/* Grid of 4 Actives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actives.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#c59b27]/60 hover:shadow-md transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                {item.name}
              </h3>
              <p className="text-[11px] font-semibold text-[#7b3e1d] mt-0.5">
                {item.sub}
              </p>
              <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-stone-100 text-stone-700">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
