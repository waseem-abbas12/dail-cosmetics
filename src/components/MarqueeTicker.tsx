import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items1 = [
    '★ 100% ORGANIC HERBAL ACTIVES',
    '🛡️ STRICTLY WITHOUT STEROID',
    '🧴 120ML PURE COLD-PRESSED EXTRACT',
    '✨ 5-DAY RADIANCE BEAUTY PLAN',
    '🇵🇰 CASH ON DELIVERY NATIONWIDE',
    '🏆 EXPORT QUALITY CERTIFIED',
    '🌿 ZERO MINERAL OILS & PARABENS',
    '⭐ 25,000+ HAPPY PAKISTANI CUSTOMERS',
  ];

  const items2 = [
    '🚚 FAST 2-4 DAYS DISPATCH VIA TRAX / TCS',
    '💧 100% PURE ROSEMARY & KALONJI OIL',
    '🚫 ZERO CHEMICAL BLEACH OR MERCURY',
    '🌸 3-ACTION HAND & FOOT REPAIR',
    '📦 100% TAMPER-PROOF FACTORY SEAL',
    '💬 24/7 WHATSAPP CONSULTATION HELPLINE',
    '🌿 SAFE FOR SENSITIVE SOUTH ASIAN SKIN',
    '🎁 FREE DELIVERY ON ORDERS OVER RS. 3,500',
  ];

  return (
    <div className="py-6 overflow-hidden border-y border-[#d4af37]/20 bg-[#090b0e] space-y-3 select-none">
      
      {/* Top Track (Moving Left) */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-bold tracking-widest text-[#f3e5ab] uppercase">
          {[...items1, ...items1, ...items1].map((text, idx) => (
            <span key={idx} className="flex items-center gap-3 shrink-0">
              <span className="text-[#d4af37]">{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Track (Moving Right / Reverse) */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-reverse flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wider text-stone-300 uppercase">
          {[...items2, ...items2, ...items2].map((text, idx) => (
            <span key={idx} className="flex items-center gap-3 shrink-0">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
