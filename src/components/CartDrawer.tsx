import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Phone,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    addToCart,
    getCartSubtotal,
    getCartDiscount,
    getShippingFee,
    getCartTotal,
    appliedVoucher,
    discountPercentage,
    applyVoucher,
    removeVoucher,
    setCurrentPage,
    getWhatsAppUrl,
    storeSettings
  } = useStore();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherFeedback, setVoucherFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingFee();
  const total = getCartTotal();
  const freeShippingThreshold = storeSettings.freeShippingThreshold;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Upsell recommendation product (not in cart)
  const upsellProduct = PRODUCTS.find((p) => !cart.some((item) => item.product.id === p.id)) || PRODUCTS[2];

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

  const generateWhatsAppOrderText = () => {
    const itemsText = cart
      .map((item) => `• ${item.product.name} (Qty: ${item.quantity}) - Rs. ${item.product.price * item.quantity}`)
      .join('\n');
    return encodeURIComponent(
      `As-salamu alaykum Dail Cosmetics!\n\nI want to place an order via Cash on Delivery:\n\n${itemsText}\n\nSubtotal: Rs. ${subtotal}\nShipping: Rs. ${shipping === 0 ? 'FREE' : shipping}\nTotal: Rs. ${total}\n\nPlease confirm my order!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* 1. Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7b3e1d]" />
              <h2 className="font-serif-luxury text-lg font-bold text-stone-900">
                Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Meter */}
          <div className="bg-red-50/70 border-b border-red-200/60 px-5 py-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#d0473e]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 font-bold">🎉 You qualify for FREE Nationwide Delivery!</span>
                ) : (
                  <span>
                    Add <strong>Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE Shipping!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-[#d0473e]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-red-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#d0473e] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* 3. Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-2xl">
                  🧴
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-bold text-stone-800">
                    Your bag is currently empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Explore our 100% organic hair oil & steroid-free creams.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#7b3e1d] text-white text-xs font-bold hover:bg-[#622f14] transition-all"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0 p-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-stone-500 block">{item.product.volume}</span>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controller */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 text-xs font-bold">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-stone-800 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 text-stone-600 hover:bg-stone-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-[#7b3e1d]">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* 4. Smart Upsell Widget inside Cart */}
                {upsellProduct && cart.length > 0 && (
                  <div className="mt-6 p-3 rounded-2xl bg-[#fcfaf7] border border-amber-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={upsellProduct.image}
                        alt={upsellProduct.name}
                        className="w-10 h-10 object-contain rounded-lg bg-white border border-stone-200 p-0.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#c59b27] font-bold block uppercase tracking-wider">
                          Recommended Regimen
                        </span>
                        <h5 className="text-xs font-bold text-stone-800 truncate">
                          {upsellProduct.name}
                        </h5>
                        <span className="text-xs font-bold text-[#7b3e1d]">
                          Rs. {upsellProduct.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(upsellProduct, 1)}
                      className="px-3 py-1.5 rounded-lg bg-[#7b3e1d] hover:bg-[#622f14] text-white text-[11px] font-bold shrink-0 transition-colors"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 5. Footer / Checkout Box */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-3">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (Try: ORGANIC10)"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-stone-900 transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedVoucher && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span>Code <strong>{appliedVoucher}</strong> applied ({discountPercentage}% off)</span>
                  <button onClick={removeVoucher} className="text-rose-500 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              )}

              {voucherFeedback && !appliedVoucher && (
                <span className="text-[11px] text-rose-500 block">{voucherFeedback.message}</span>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 text-xs text-stone-600 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountPercentage}%)</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `Rs. ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="text-base text-[#7b3e1d]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Primary Action: Cash on Delivery Checkout */}
              <button
                onClick={handleProceedCheckout}
                className="w-full btn-gp-primary py-3.5 px-6 rounded-xs text-xs font-heading font-extrabold tracking-[0.16em] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>PROCEED TO CASH ON DELIVERY CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Action: WhatsApp 1-Click Order */}
              <a
                href={getWhatsAppUrl(generateWhatsAppOrderText())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Instant Order via WhatsApp ({storeSettings.whatsappNumber})</span>
              </a>

              <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-2 pt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>100% Genuine Sealed Products • Cash on Delivery</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
