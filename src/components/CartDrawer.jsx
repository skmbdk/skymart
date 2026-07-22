import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, ShoppingBag, Tag, Check } from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    openCheckout,
    formatPrice,
    navigateTo 
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 100;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || appliedCoupon?.type === 'freeship';
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount) + shippingCost;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body">
      {/* Backdrop */}
      <div 
        onClick={toggleCart}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131313] border-l border-[#262626] text-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#262626] flex items-center justify-between">
            <div>
              <h2 className="font-headline font-bold text-xl text-[#BCFF4E]">Your Cart</h2>
              <p className="text-sm text-gray-400 font-body mt-0.5">Ready to shop the future?</p>
            </div>
            <button
              onClick={toggleCart}
              className="p-2 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#262626] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-gray-500 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[#BCFF4E]" />
                </div>
                <h3 className="font-headline text-lg font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-400 mb-6 max-w-xs">Looks like you haven't added any cyber essentials yet.</p>
                <button
                  onClick={() => {
                    toggleCart();
                    navigateTo('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm hover:brightness-110 transition-all shadow-[0_0_15px_rgba(188,255,78,0.2)]"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="p-4 bg-[#1C1B1B] border border-[#262626] rounded-xl flex gap-4 relative group hover:border-[#BCFF4E]/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-white/5 rounded-lg border border-white/10 p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-headline font-semibold text-sm text-white line-clamp-1 pr-6">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="inline-block text-xs font-geist text-gray-400 mt-0.5">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-geist font-bold text-base text-[#BCFF4E]">
                        {formatPrice(product.price * quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] rounded-lg px-2 py-1 text-xs">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-geist font-semibold w-4 text-center text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#262626] bg-[#0A0A0A] space-y-4">
              
              {/* Promo Code Box */}
              <div className="bg-[#1A1A1A] border border-[#262626] p-3 rounded-xl space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (CYBER20)"
                      className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#BCFF4E] text-white font-geist text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#262626] hover:bg-[#BCFF4E] text-gray-300 hover:text-[#0A0A0A] text-xs font-geist font-bold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs font-geist bg-[#BCFF4E]/10 border border-[#BCFF4E]/30 p-2 rounded-lg text-[#BCFF4E]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.label}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-gray-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-[#1A1A1A] p-3 rounded-xl border border-[#262626]">
                <div className="flex justify-between text-xs font-geist mb-1.5">
                  <span className="text-gray-300">
                    {isFreeShipping ? '🎉 Free Shipping Unlocked!' : `Add ${formatPrice(freeShippingThreshold - cartSubtotal)} for Free Shipping`}
                  </span>
                  <span className="text-[#BCFF4E] font-bold">
                    {Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#BCFF4E] transition-all duration-300"
                    style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 font-geist text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#BCFF4E]">
                    <span>Discount Coupon ({appliedCoupon?.code})</span>
                    <span className="font-bold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-gray-300">
                    {isFreeShipping ? <span className="text-[#BCFF4E] font-bold">Free</span> : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#262626]">
                  <span className="text-white">Total</span>
                  <span className="text-[#BCFF4E] text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={openCheckout}
                className="w-full py-3.5 px-4 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-base rounded-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.25)]"
              >
                Checkout Now — {formatPrice(grandTotal)}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-geist text-gray-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BCFF4E]" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#BCFF4E]" />
                  <span>Free Shipping over $100</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
