import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, ShieldCheck, CreditCard, Lock, ArrowRight, Package } from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    appliedCoupon,
    addOrder, 
    formatPrice,
    user 
  } = useApp();
  
  const [step, setStep] = useState('shipping');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '777 Cyber Boulevard, Suite 404',
    city: 'Neo Tokyo',
    zipCode: '90210',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888'
  });
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const freeShippingThreshold = 100;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || appliedCoupon?.type === 'freeship';
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 9.99;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount) + shippingCost;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const generatedId = 'SKY-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);

    // Save order to user history
    const orderRecord = {
      id: generatedId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: grandTotal,
      status: 'In Transit',
      progress: 45,
      address: `${formData.address}, ${formData.city}`
    };

    addOrder(orderRecord);
    setStep('success');
  };

  const handleCloseSuccess = () => {
    setStep('shipping');
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center font-body">
      {/* Backdrop */}
      <div 
        onClick={() => step !== 'success' && closeCheckout()}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#131313] border border-[#262626] rounded-2xl max-w-2xl w-full text-white overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#BCFF4E] text-[#0A0A0A] font-bold flex items-center justify-center text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-white">
                {step === 'success' ? 'Order Confirmed' : 'Checkout'}
              </h2>
              <p className="text-xs text-gray-400 font-geist">Encrypted 256-Bit SSL Checkout</p>
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={closeCheckout}
              className="p-2 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#262626] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">

          {/* STEP 1: Shipping Information */}
          {step === 'shipping' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
              <h3 className="font-headline font-bold text-base text-[#BCFF4E] mb-2">
                1. Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-geist text-gray-400 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  placeholder="123 Tech Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    placeholder="94103"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#262626] mt-6">
                <div>
                  <span className="text-xs font-geist text-gray-400 block">Total Due:</span>
                  <span className="font-geist font-bold text-[#BCFF4E] text-lg">{formatPrice(grandTotal)}</span>
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm rounded-xl hover:brightness-110 transition-all flex items-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Selection */}
          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline font-bold text-base text-[#BCFF4E]">
                  2. Payment Details
                </h3>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-geist text-gray-400 hover:text-white underline"
                >
                  Edit Address
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'card' 
                      ? 'border-[#BCFF4E] bg-[#BCFF4E]/10 text-[#BCFF4E]' 
                      : 'border-[#262626] bg-[#1A1A1A] text-gray-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-geist font-medium block">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'crypto' 
                      ? 'border-[#BCFF4E] bg-[#BCFF4E]/10 text-[#BCFF4E]' 
                      : 'border-[#262626] bg-[#1A1A1A] text-gray-400'
                  }`}
                >
                  <Package className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-geist font-medium block">Crypto</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.paymentMethod === 'apple' 
                      ? 'border-[#BCFF4E] bg-[#BCFF4E]/10 text-[#BCFF4E]' 
                      : 'border-[#262626] bg-[#1A1A1A] text-gray-400'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs font-geist font-medium block">Apple Pay</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-geist text-gray-400 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white font-geist focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expDate"
                    required
                    value={formData.expDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white font-geist focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-geist text-gray-400 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full bg-[#1A1A1A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-sm text-white font-geist focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-[#262626] mt-6">
                <div>
                  <span className="text-xs font-geist text-gray-400 block">Total Payment:</span>
                  <span className="font-geist font-bold text-[#BCFF4E] text-xl">{formatPrice(grandTotal)}</span>
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.3)]"
                >
                  Pay {formatPrice(grandTotal)}
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Success Screen */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-[#BCFF4E] text-[#0A0A0A] rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(188,255,78,0.4)] animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <h3 className="font-headline font-bold text-2xl text-white">Payment Successful!</h3>
                <p className="text-sm text-gray-300 mt-1 font-body">
                  Thank you, <span className="text-[#BCFF4E] font-semibold">{formData.fullName}</span>! Your order has been recorded in your Order History.
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#BCFF4E]/40 font-geist text-xs text-[#BCFF4E]">
                  Order ID: {orderId}
                </span>
              </div>

              <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 text-left space-y-2 text-xs font-geist">
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-gray-400">Shipping To:</span>
                  <span className="text-white font-medium">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between border-b border-[#262626] pb-2">
                  <span className="text-gray-400">Estimated Delivery:</span>
                  <span className="text-[#BCFF4E] font-medium">Tomorrow by 5:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400">Total Charged:</span>
                  <span className="text-white font-medium">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCloseSuccess}
                className="w-full py-3.5 px-6 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-sm rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(188,255,78,0.2)]"
              >
                View Order Tracking
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
