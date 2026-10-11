import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';

interface FAQItem {
  question: string;
  urduQuestion: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Kya Dail Beauty Cream mein waqai koi steroid ya mercury nahi hai?',
      urduQuestion: 'کیا ڈیل بیوٹی کریم میں واقعی کوئی اسٹیرائیڈ یا کیمیکل نہیں ہے؟',
      answer: 'Bilkul nahi! Dail Beauty Cream aur Hand & Foot Cream 100% WITHOUT STEROID formulate ki gayi hain. Isme koi Clobetasol, Betamethasone ya Mercury shamil nahi hai jo skin ko patla kare ya dhoop mein laal kare. Yeh 100% safe, halal aur export quality botanical actives (Saffron, Niacinamide, Pure Vitamin E) par mabni hai.'
    },
    {
      question: 'Dail Premium Herbal Hair Oil (120ml) se hair fall kitne din mein rukta hai?',
      urduQuestion: 'ڈیل ہربل ہیئر آئل سے بال گرنا کتنے دن میں بند ہوتے ہیں؟',
      answer: 'Hamare 25,000+ Pakistani customers ke verified feedback ke mutabiq, 10 se 14 din ke baqaeda istemal (haftay mein 3 baar massage) se severe hair fall 80% se 90% tak ruk jata hai. Cold-pressed Rosemary aur Kalonji (Black Seed) oil dormant roots ko stimulate karke baby hairs ki growth ko tezi se shuru karte hain.'
    },
    {
      question: 'Delivery charges aur delivery time kya hai Pakistan mein?',
      urduQuestion: 'ڈلیوری کا وقت اور چارجز کیا ہیں؟',
      answer: 'Hum Trax Express aur TCS Logistics ke zariye poore Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta aur tamam chhote shehron) mein 2 se 4 working days mein doorstep delivery karte hain. Rs. 3,500 se zyada ke order par Free Delivery hai. Standard flat courier fee sirf Rs. 250 hai.'
    },
    {
      question: 'Kya Cash On Delivery (COD) available hai?',
      urduQuestion: 'کیا کیش آن ڈلیوری کی سہولت موجود ہے؟',
      answer: 'Jee haan! Cash On Delivery (COD) poore Pakistan mein 100% available hai. Aap rider se apna factory-sealed parcel receive karein aur doorstep par cash pay karein. Iske ilawa JazzCash, Easypaisa aur Credit/Debit Card payments bhi fully supported hain.'
    },
    {
      question: 'Kya main direct WhatsApp par order book karwa sakta hoon?',
      urduQuestion: 'کیا واٹس ایپ پر آرڈر دیا جا سکتا ہے؟',
      answer: 'Jee bilkul! Website par maujood kisi bhi "Order via WhatsApp" button par click karein ya hamari official helpline 0300-1234567 par apna naam, pata aur desired products send karein. Hamara representative foran order confirm karega.'
    },
    {
      question: 'Dail Hand & Foot Cream dark knuckles aur rough heels par kab asar karti hai?',
      urduQuestion: 'ہینڈ اینڈ فٹ کریم سے کتنا جلد رزلٹ ملتا ہے؟',
      answer: 'Dail Hand & Foot Cream ka 3-Action Repair formula (Deep Moisture, Multi-Effect, Barrier Repair) 5 se 7 din ke raat ko istemal se dark knuckles, tanned haath paon aur cracked heels ko bohot tezi se naram aur glowing banata hai.'
    }
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          Customer Clarifications
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
          Frequently Asked <span className="text-gold-gradient italic">Questions</span>
        </h2>
        <p className="text-stone-300 text-sm font-light">
          Aapke aam sawalaat ke sachay aur wazeh jawabaat.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                  ? 'bg-gradient-to-r from-[#181a20] to-[#101216] border-[#d4af37]/60 shadow-xl'
                  : 'bg-[#0f1115]/80 border-[#d4af37]/15 hover:border-[#d4af37]/35'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <h3 className={`text-sm sm:text-base font-semibold leading-snug ${isOpen ? 'text-[#f3e5ab]' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                  <p className="text-xs text-[#d4af37]/80 font-serif italic text-right sm:text-left">
                    {faq.urduQuestion}
                  </p>
                </div>
                <div className="p-1 rounded-full bg-black/40 text-[#d4af37] shrink-0 mt-0.5">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-[#d4af37]/15 pt-4 animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Support Prompt */}
      <div className="mt-10 p-5 rounded-2xl gold-glass-card border border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-stone-200">
          <HelpCircle className="w-5 h-5 text-[#d4af37] shrink-0" />
          <span>Koi aur sawal hai? Hamare certified herbalist se live baat karein.</span>
        </div>
        <a
          href="https://wa.me/923001234567?text=Hi%20Dail%20Cosmetics,%20I%20have%20a%20question%20before%20ordering."
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-[#25d366] text-black font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>

    </section>
  );
};
