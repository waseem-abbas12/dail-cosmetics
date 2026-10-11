import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Phone,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartDiscount,
    getShippingFee,
    getCartTotal,
    freeShippingThreshold,
    appliedVoucher,
    discountPercentage,
    applyVoucher,
    removeVoucher,
    setCurrentPage,
  } = useStore();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherFeedback, setVoucherFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingFee();
  const total = getCartTotal();

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    setVoucherFeedback(res);
    if (res.success) {
      setVoucherInput('');
    }
    setTimeout(() => setVoucherFeedback(null), 4000);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const whatsappOrderMessage = encodeURIComponent(
    `Hello Dali Organics! I want to order the following items from my cart:\n` +
    cart.map((item) => `- ${item.product.name} (Qty: ${item.quantity}) = Rs. ${item.product.price * item.quantity}`).join('\n') +
    `\nTotal: Rs. ${total} (COD Delivery in Pakistan). Please confirm!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#092216] border-l border-emerald-500/25 flex flex-col shadow-2xl text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#78c459]" />
              <h2 className="font-serif-luxury text-xl font-bold">Your Botanical Basket</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-emerald-400 hover:text-white hover:bg-emerald-800/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-[#0d2e1f] border-b border-emerald-500/15">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-medium text-emerald-200">
                <Truck className="w-3.5 h-3.5 text-[#78c459]" />
                {amountNeededForFreeShipping === 0 ? (
                  <strong className="text-[#a4e38b]">🎉 Free Delivery Unlocked across Pakistan!</strong>
                ) : (
                  <span>
                    Add <strong>Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-emerald-400 font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4d8f33] to-[#78c459] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 flex items-center justify-center text-2xl border border-emerald-500/20">
                  🌿
                </div>
                <h3 className="font-serif-luxury text-lg font-semibold text-white">Your basket is empty</h3>
                <p className="text-emerald-300/70 text-xs max-w-xs">
                  Discover our pure cold-pressed hair oils and saffron creams crafted in Pakistan.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#6aa84f] text-white text-xs font-semibold shadow-md hover:bg-[#7bc05d] transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-[#0e3120] border border-emerald-500/20 flex gap-3.5 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-emerald-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs sm:text-sm text-white truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-emerald-300/70 block">
                      {item.product.volume}
                    </span>
                    <span className="text-xs font-bold text-white mt-1 block">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center rounded-lg bg-emerald-950 border border-emerald-500/30 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-emerald-300 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-emerald-300 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-rose-400 p-0.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary (only if cart has items) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-emerald-500/20 bg-[#071c12] space-y-3.5">
              
              {/* Promo Voucher Form */}
              <form onSubmit={handleApplyVoucher} className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="text"
                      placeholder="Promo voucher (e.g. ORGANIC10)"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      className="w-full bg-emerald-950/80 border border-emerald-500/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white uppercase placeholder:text-stone-400 focus:outline-none focus:border-[#78c459]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-[#1b4d2f] hover:bg-[#25633e] text-emerald-200 text-xs font-semibold border border-emerald-400/30 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {appliedVoucher && (
                  <div className="flex items-center justify-between text-[11px] text-[#78c459] bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <span>Code <strong>{appliedVoucher}</strong> applied ({discountPercentage}% OFF)</span>
                    <button onClick={removeVoucher} className="text-stone-400 hover:text-rose-400">
                      Remove
                    </button>
                  </div>
                )}

                {voucherFeedback && (
                  <p className={`text-[11px] ${voucherFeedback.success ? 'text-[#78c459]' : 'text-rose-400'}`}>
                    {voucherFeedback.message}
                  </p>
                )}
              </form>

              {/* Financial Calculation Lines */}
              <div className="space-y-1 text-xs text-emerald-200/80 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#78c459]">
                    <span>Voucher Discount</span>
                    <span>- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Courier Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-[#78c459]">FREE</strong> : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-emerald-500/20">
                  <span>Estimated Total</span>
                  <span className="text-lg text-[#a4e38b]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 rounded-full bg-[#6aa84f] hover:bg-[#7bc05d] text-white text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/80 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Proceed to Checkout (COD)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={`https://wa.me/923001234567?text=${whatsappOrderMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-[#18462a] hover:bg-[#205a36] border border-emerald-400/30 text-emerald-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25d366]" />
                  <span>Order Directly via WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
