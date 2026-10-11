import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import type { OrderDetails } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { trackOrderById, orders } = useStore();
  const [searchInput, setSearchInput] = useState('DAIL-PK-9824');
  const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(() => {
    return trackOrderById('DAIL-PK-9824') || orders[0] || null;
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
    { title: 'Order Booked', desc: 'Batch allocated & verified', icon: CheckCircle2, done: true },
    { title: 'Quality Checked & Sealed', desc: 'Tamper-proof embossed gold seal applied', icon: Package, done: true },
    { title: 'Dispatched via Courier', desc: 'Handed over to Trax / TCS Logistics', icon: Truck, done: true },
    { title: 'Out for Doorstep Delivery', desc: 'Rider delivering parcel today', icon: Clock, done: false },
    { title: 'Delivered', desc: 'Cash collected & verified at doorstep', icon: CheckCircle2, done: false },
  ];

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c59b27]">
            Nationwide Courier Tracking
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            Track Your Parcel
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-normal">
            Enter your Order Tracking ID (e.g. <code>DAIL-PK-9824</code> or <code>DAIL-PK-7821</code>) to monitor live courier updates across Pakistan.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex items-center p-1.5 rounded-2xl bg-white border border-stone-300 shadow-sm">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. DAIL-PK-9824)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-stone-900 uppercase placeholder:text-stone-400 focus:outline-hidden font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </div>
        </form>

        {/* Order Details Display Card */}
        {trackedOrder ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-8">
            
            {/* Header Status Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Tracking Reference</span>
                <h3 className="font-mono text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  {trackedOrder.orderId}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-[#7b3e1d] uppercase tracking-wider">
                  Status: {trackedOrder.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700">
                  {trackedOrder.courierName || 'Trax Logistics'}
                </span>
              </div>
            </div>

            {/* Courier Steps Visualizer */}
            <div className="relative">
              <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-5 gap-4">
                {steps.map((st, idx) => {
                  const Icon = st.icon;
                  return (
                    <div key={idx} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        st.done
                          ? 'bg-[#7b3e1d] border-[#7b3e1d] text-white shadow-xs'
                          : 'bg-stone-100 border-stone-200 text-stone-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">{st.title}</h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="p-4 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block">Customer Name</span>
                <strong className="text-stone-900 font-bold text-sm">{trackedOrder.customerName}</strong>
                <span className="text-stone-500 block mt-1">{trackedOrder.phone}</span>
              </div>

              <div>
                <span className="text-stone-400 block">Destination Address</span>
                <p className="text-stone-800 font-medium">{trackedOrder.address}, {trackedOrder.city}</p>
              </div>

              <div className="sm:col-span-2 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-stone-700">Payment: <strong>Cash on Delivery (Rs. {trackedOrder.total.toLocaleString()})</strong></span>
                </div>
                <a
                  href={`https://wa.me/923001234567?text=Hi%20Dail%20Cosmetics,%20inquiring%20about%20Order%20${trackedOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7b3e1d] font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" /> Contact Dispatch Helpline
                </a>
              </div>
            </div>

          </div>
        ) : hasSearched ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-2">
            <p className="text-sm font-bold text-stone-800">Order ID not found</p>
            <p className="text-xs text-stone-500">Please verify your order tracking ID from your SMS or WhatsApp confirmation.</p>
          </div>
        ) : null}

      </div>
    </div>
  );
};
