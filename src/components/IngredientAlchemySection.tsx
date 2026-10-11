import React from 'react';

export const IngredientAlchemySection: React.FC = () => {
  const actives = [
    {
      icon: '🌿',
      name: 'Highland Rosemary & Mint',
      sub: 'Mountain-Harvested Bio-Actives',
      desc: 'Clinically proven follicle vasodilator. Stimulates microscopic capillary blood flow to dormant hair roots, forcing rapid anagen hair growth.',
      badge: 'In Dail Hair Oil (120ml)',
    },
    {
      icon: '✨',
      name: 'Grade-A Kashmiri Saffron',
      sub: 'Natural Crocin Antioxidant',
      desc: 'Replaces dangerous steroids with pure botanical illumination. Blocks melanin oxidation to clear dark spots, melasma, and sun damage safely.',
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
      desc: 'Penetrates tough cuticle layers on knuckles and heels. Gently dissolves dead melanin cells and locks in 48-hour intense lipid moisture.',
      badge: 'In Dail Hand & Foot Cream',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Pure Bio-Active Formulations
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
          The Science of <span className="text-gold-gradient italic">Herbal Alchemy</span>
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm font-light">
          Why Dail Cosmetics delivers visible results without relying on artificial chemicals or steroids.
        </p>
      </div>

      {/* Grid of 4 Actives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actives.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl gold-glass-card border border-[#d4af37]/20 flex flex-col justify-between space-y-4 hover:border-[#d4af37]/60 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-black/60 border border-[#d4af37]/30 flex items-center justify-center text-2xl mb-4 shadow-inner">
                {item.icon}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] block">
                {item.sub}
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-white mt-1">
                {item.name}
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#d4af37]/15">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/30">
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
