import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PAKISTAN_CITIES } from '../data/products';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Phone,
  ArrowLeft,
  Lock,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    getCartSubtotal,
    getCartDiscount,
    getShippingFee,
    getCartTotal,
    createOrder,
    setCurrentPage,
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Lahore',
    province: 'Punjab',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'card'>('cod');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState<any>(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingFee();
  const total = getCartTotal();

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <div className="text-4xl">🌿</div>
        <h2 className="font-serif-luxury text-2xl font-bold text-white">Your basket is empty</h2>
        <p className="text-emerald-300/70 text-sm">Please add products before checking out.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-full bg-[#6aa84f] text-white text-xs font-semibold"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out your delivery name, phone number, and street address.');
      return;
    }

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6aa84f', '#a4e38b', '#d4af37', '#ffffff']
      });
    } catch {
      // Fallback gracefully
    }

    const orderData = {
      customerName: formData.fullName,
      email: formData.email || `${formData.phone}@customer.daliorganics.pk`,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      paymentMethod,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      shippingFee: shipping,
      discount,
      total,
    };

    const newOrder = createOrder(orderData);
    setCreatedOrderDetails(newOrder);
    setOrderCompleted(true);
  };

  // Order Confirmation Success View
  if (orderCompleted && createdOrderDetails) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="rounded-[36px] bg-gradient-to-b from-[#0e3321] to-[#071d13] border border-emerald-500/30 p-6 sm:p-10 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#185330] text-[#78c459] flex items-center justify-center mx-auto text-3xl shadow-inner border border-emerald-400/40">
            ✓
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#78c459]">
              Order Successfully Booked
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mt-1">
              Shukriya, {createdOrderDetails.customerName}!
            </h1>
            <p className="text-emerald-200/80 text-sm mt-2">
              Aapka order receive ho chuka hai. Hamari team fresh batch pack karke courier ko hand over kar rahi hai.
            </p>
          </div>

          {/* Tracking ID Pill */}
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 inline-block text-left max-w-md w-full">
            <div className="flex justify-between items-center text-xs text-emerald-300 mb-1">
              <span>Order Tracking ID:</span>
              <span className="text-white font-mono font-bold">{createdOrderDetails.orderId}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-300 mb-1">
              <span>Courier Partner:</span>
              <span className="text-white font-medium">{createdOrderDetails.courierName}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-300">
              <span>Payment Mode:</span>
              <span className="text-[#a4e38b] font-bold uppercase">{createdOrderDetails.paymentMethod}</span>
            </div>
          </div>

          {/* WhatsApp Order Update link */}
          <div className="p-4 rounded-2xl bg-[#133e28] border border-emerald-400/20 text-xs text-emerald-100 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#25d366] shrink-0" />
              <span>Receive live dispatch alerts and courier tracking via WhatsApp</span>
            </div>
            <a
              href={`https://wa.me/923001234567?text=Hi%20Dali%20Organics,%20my%20Order%20ID%20is%20${createdOrderDetails.orderId}.%20Please%20confirm%20my%20dispatch.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-[#25d366] text-black font-semibold text-[11px] shrink-0 flex items-center gap-1"
            >
              <span>Connect</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('track-order')}
              className="px-6 py-3 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-xs font-semibold shadow-md transition-all"
            >
              Track Order Status
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="px-6 py-3 rounded-full glass-panel border border-emerald-500/30 text-emerald-200 hover:text-white text-xs font-semibold transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Basket</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Delivery & Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#0e3120] to-[#082015] border border-emerald-500/25 shadow-xl space-y-6">
            
            <div className="flex items-center gap-2.5 pb-4 border-b border-emerald-500/20">
              <MapPin className="w-5 h-5 text-[#78c459]" />
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                Delivery Details (Pakistan)
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                  Full Name (نام) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali / Muhammad Usman"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                    Mobile Phone (موبائل نمبر) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                  />
                  <span className="text-[10px] text-emerald-400/70 mt-1 block">
                    Courier delivery call aur SMS update ke liye
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="fatima@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                  Complete Street Address (مکمل پتہ) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House / Flat No., Street, Block / Sector, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-emerald-950/70 border border-emerald-500/30 rounded-xl px-4 py-2 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                />
              </div>

              {/* City & Province Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                    City (شہر) *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0b2717] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#78c459]"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                    Province (صوبہ) *
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full bg-[#0b2717] border border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#78c459]"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital">Islamabad Capital</option>
                    <option value="Azad Kashmir">Azad Jammu & Kashmir</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-emerald-500/20 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Select Payment Method (طریقہ ادائیگی)
                </label>

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-900/60 border-[#78c459] ring-1 ring-[#78c459]'
                      : 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-400/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-[#78c459] focus:ring-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-sm">Cash On Delivery (COD)</strong>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6aa84f] text-white">
                        Recommended
                      </span>
                    </div>
                    <p className="text-emerald-200/70 text-xs mt-1">
                      Pay cash when the rider arrives at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </div>

                {/* JazzCash / Easypaisa Transfer */}
                <div
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-emerald-900/60 border-[#78c459] ring-1 ring-[#78c459]'
                      : 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-400/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 text-[#78c459] focus:ring-0"
                  />
                  <div className="flex-1">
                    <strong className="text-white text-sm">JazzCash / Easypaisa Direct Transfer</strong>
                    <p className="text-emerald-200/70 text-xs mt-1">
                      Transfer to Account: 0300-1234567 (Title: Dali Organics PK) & share screenshot on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-900/60 border-[#78c459] ring-1 ring-[#78c459]'
                      : 'bg-emerald-950/40 border-emerald-500/20 hover:border-emerald-400/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-[#78c459] focus:ring-0"
                  />
                  <div className="flex-1">
                    <strong className="text-white text-sm">Debit / Credit Card (Visa / Mastercard)</strong>
                    <p className="text-emerald-200/70 text-xs mt-1">
                      Encrypted 256-bit bank card checkout.
                    </p>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-bold tracking-wide shadow-xl shadow-emerald-950/80 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Lock className="w-4 h-4 text-emerald-950" />
                  <span>Confirm Order (Rs. {total.toLocaleString()} {paymentMethod === 'cod' ? '• COD' : ''})</span>
                </button>
              </div>

            </form>

          </div>

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#0e3120] to-[#071c12] border border-emerald-500/25 shadow-xl space-y-4">
            
            <h3 className="font-serif-luxury text-xl font-bold text-white border-b border-emerald-500/20 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-emerald-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-white truncate">{item.product.name}</h5>
                    <span className="text-emerald-300/70 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-white shrink-0">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-emerald-500/20 space-y-2 text-xs text-emerald-200/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#78c459]">
                  <span>Voucher Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery (TCS / Trax Courier)</span>
                <span>{shipping === 0 ? <strong className="text-[#78c459]">FREE</strong> : `Rs. ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-emerald-500/20">
                <span>Total Payable (PKR)</span>
                <span className="text-xl text-[#a4e38b]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Safe Delivery Promise */}
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-[11px] text-emerald-300/80 space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#78c459]" />
                <span>100% Genuine Pakistani Botanicals</span>
              </div>
              <p>Fresh sun-infused batch. Parcels are packed in tamper-proof bubble mailers.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
