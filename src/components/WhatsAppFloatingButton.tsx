import React from 'react';
import { Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="Support and Quick Order" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/923001234567?text=Hello%20Dali%20Organics!%20I%20want%20to%20inquire%20about%20your%20organic%20hair%20oils%20and%20creams."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] text-black shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        title="Chat with Dali Organics on WhatsApp"
        aria-label="Chat with Dali Organics on WhatsApp"
      >
        <Phone className="w-7 h-7 text-white fill-white" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 rounded-full bg-emerald-950/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-emerald-500/30 shadow-lg pointer-events-none">
          💬 Order on WhatsApp (0300-1234567)
        </span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 pointer-events-none" />
      </a>
    </aside>
  );
};
