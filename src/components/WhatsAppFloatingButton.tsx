import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppUrl, storeSettings } = useStore();

  const url = getWhatsAppUrl(
    'As-salamu alaykum Dail Cosmetics! I want to order 100% Organic Herbal Hair Oil & Steroid-Free Skincare.'
  );

  return (
    <aside aria-label="Support and Quick Order" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40"
        title={`Chat with Dail Cosmetics on WhatsApp (${storeSettings.whatsappNumber})`}
        aria-label="Chat with Dail Cosmetics on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-stone-700 shadow-xl pointer-events-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Order on WhatsApp ({storeSettings.whatsappNumber})</span>
        </span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 pointer-events-none" />
      </a>
    </aside>
  );
};
