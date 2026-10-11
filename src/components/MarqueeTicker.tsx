import React from 'react';
import { Sparkles, ShieldCheck, Leaf, Truck, Award, CheckCircle } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { text: '100% Cold-Pressed Organic Herbal Hair Oil (120ml)', icon: Leaf },
    { text: 'Strictly Without Steroid & Mercury Certified', icon: ShieldCheck },
    { text: 'Cash On Delivery Across Pakistan', icon: Truck },
    { text: 'Dail Beauty Cream — 5-Day Radiant Beauty Plan', icon: Sparkles },
    { text: 'Export Quality Standard • Tamper-Proof Seal', icon: Award },
    { text: 'Rosemary, Kalonji, Almond & Castor Active Alchemy', icon: CheckCircle },
  ];

  return (
    <div className="w-full bg-[#f7f3ed] border-y border-stone-200/80 py-3.5 overflow-hidden">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <Icon className="w-4 h-4 text-[#7b3e1d]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-stone-800 uppercase">
                {item.text}
              </span>
              <span className="text-[#c59b27] font-bold text-sm">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
