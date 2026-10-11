import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import type { OrderDetails } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { trackOrderById, orders } = useStore();
  const [searchInput, setSearchInput] = useState('DALI-PK-7821');
  const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(() => {
    return trackOrderById('DALI-PK-7821') || orders[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const result = trackOrderById(searchInput);
    setTrackedOrder(result);
    setHasSearched(true);
  };

  const steps = [
    { title: 'Order Booked', desc: 'Herbal batch allocated & confirmed', icon: CheckCircle2, done: true },
    { title: 'Handcrafted Packaging', desc: 'Sealed in UV-resistant glass amber bottle', icon: Package, done: true },
    { title: 'Dispatched via Courier', desc: 'Handed over to Trax / TCS Logistics', icon: Truck, done: true },
    { title: 'Out for Doorstep Delivery', desc: 'Rider reaching your address today', icon: Clock, done: false },
    { title: 'Delivered', desc: 'Cash collected & verified at doorstep', icon: CheckCircle2, done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78c459]">
          Nationwide Courier Tracking
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
          Track Your Botanical Parcel
        </h1>
        <p className="text-emerald-200/70 text-sm font-light">
          Enter your Order Tracking ID (e.g. <code>DALI-PK-7821</code>) to monitor live courier updates.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
        <div className="flex items-center p-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 shadow-lg">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. DALI-PK-7821)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-sm text-white uppercase placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </div>
      </form>

      {/* Tracking Result View */}
      {trackedOrder ? (
        <div className="rounded-[36px] bg-gradient-to-b from-[#0e3120] to-[#071c12] border border-emerald-500/25 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-500/20">
            <div>
              <span className="text-xs text-emerald-400 font-mono">ORDER ID:</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white tracking-wide">
                {trackedOrder.orderId}
              </h3>
              <p className="text-xs text-emerald-300/70 mt-0.5">
                Recipient: <strong className="text-white">{trackedOrder.customerName}</strong> • {trackedOrder.city}, {trackedOrder.province}
              </p>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#185030] text-[#78c459] border border-emerald-400/30">
                ● Status: In Transit
              </span>
              <span className="block text-[11px] text-emerald-300/70 mt-1.5 font-mono">
                {trackedOrder.courierName} ({trackedOrder.trackingNumber})
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Delivery Milestones
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-600/30">
              {steps.map((st, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      st.done
                        ? 'bg-[#6aa84f] border-[#78c459] text-white shadow-md shadow-emerald-500/40'
                        : 'bg-emerald-950 border-emerald-700/50'
                    }`}
                  />
                  <div>
                    <h5 className={`text-sm font-semibold ${st.done ? 'text-white' : 'text-stone-400'}`}>
                      {st.title}
                    </h5>
                    <p className="text-xs text-emerald-300/60 mt-0.5">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Accordion / Breakdown */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Parcel Contents
            </h4>
            <div className="space-y-2">
              {trackedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs text-emerald-100">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-semibold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-emerald-500/20 flex justify-between text-xs font-bold text-white">
                <span>Total COD Amount:</span>
                <span className="text-[#a4e38b]">Rs. {trackedOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Urgent Delivery Assistance */}
          <div className="p-4 rounded-2xl bg-[#143e28] border border-emerald-400/20 flex items-center justify-between text-xs text-emerald-200">
            <span>Rider coordination problem? Message our support team directly.</span>
            <a
              href={`https://wa.me/923001234567?text=Urgent%20assistance%20for%20order%20${trackedOrder.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-[#25d366] text-black font-semibold text-[11px] shrink-0"
            >
              WhatsApp Support
            </a>
          </div>

        </div>
      ) : hasSearched ? (
        <div className="p-10 rounded-3xl glass-card border border-emerald-500/20 text-center max-w-md mx-auto space-y-3">
          <div className="text-3xl">🔍</div>
          <h4 className="font-serif-luxury text-lg font-bold text-white">Tracking ID Not Found</h4>
          <p className="text-xs text-emerald-300/70">
            Please check the spelling of your order ID or contact our WhatsApp helpline at <code>0300-1234567</code>.
          </p>
        </div>
      ) : null}

    </div>
  );
};
