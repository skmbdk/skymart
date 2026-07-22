import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingBag, Plus, Minus, Heart, Scale } from 'lucide-react';

export const ProductModal = () => {
  const { 
    selectedProduct: quickViewProduct, 
    closeProductModal: closeQuickView, 
    addToCart, 
    formatPrice,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);
  const isCompared = isInCompare(quickViewProduct.id);

  const renderSpecs = () => {
    if (!quickViewProduct.specs) return null;

    if (Array.isArray(quickViewProduct.specs)) {
      return (
        <div className="grid grid-cols-2 gap-2 text-xs font-geist">
          {quickViewProduct.specs.map((s, idx) => (
            <div key={idx} className="flex justify-between border-b border-[#262626] pb-1">
              <span className="text-gray-400">{typeof s === 'object' ? s.label : s}:</span>
              <span className="text-white font-medium">{typeof s === 'object' ? String(s.value) : ''}</span>
            </div>
          ))}
        </div>
      );
    }

    if (typeof quickViewProduct.specs === 'object') {
      return (
        <div className="grid grid-cols-2 gap-2 text-xs font-geist">
          {Object.entries(quickViewProduct.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between border-b border-[#262626] pb-1">
              <span className="text-gray-400 capitalize">{key}:</span>
              <span className="text-white font-medium">{typeof val === 'object' ? JSON.stringify(val) : String(val)}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center font-body">
      {/* Backdrop */}
      <div 
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#131313] border border-[#262626] rounded-3xl max-w-3xl w-full text-white overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#262626]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Product Image Spotlight */}
          <div className="md:col-span-6 bg-white p-8 flex items-center justify-center relative min-h-[300px]">
            {quickViewProduct.badge && (
              <span className="absolute top-4 left-4 bg-[#0A0A0A] text-[#BCFF4E] border border-[#BCFF4E]/40 font-geist text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
                {quickViewProduct.badge}
              </span>
            )}
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-[260px] w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Product Info & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-geist font-bold text-[#BCFF4E] uppercase tracking-wider block mb-1">
                {quickViewProduct.category}
              </span>
              <h2 className="font-headline font-bold text-2xl text-white mb-2 leading-tight">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                </div>
                <span className="font-geist text-xs text-gray-300 font-semibold">
                  {quickViewProduct.rating} ({quickViewProduct.reviewCount} reviews)
                </span>
              </div>

              <div className="font-geist text-3xl font-extrabold text-[#BCFF4E] mb-4">
                {formatPrice(quickViewProduct.price)}
              </div>

              <p className="text-xs text-gray-300 font-body leading-relaxed line-clamp-3 mb-4">
                {quickViewProduct.description}
              </p>

              {/* Specs Table */}
              {quickViewProduct.specs && (
                <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-3 mb-4 space-y-2">
                  <span className="text-xs font-geist text-gray-400 uppercase tracking-wider block mb-1">Specifications</span>
                  {renderSpecs()}
                </div>
              )}

              {/* Actions: Wishlist & Compare */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-geist transition-all ${
                    isSaved ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E] font-bold' : 'bg-[#1A1A1A] text-gray-300 border-[#262626]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#0A0A0A]' : ''}`} />
                  {isSaved ? 'Saved' : 'Wishlist'}
                </button>

                <button
                  onClick={() => toggleCompare(quickViewProduct)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-geist transition-all ${
                    isCompared ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E] font-bold' : 'bg-[#1A1A1A] text-gray-300 border-[#262626]'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  {isCompared ? 'Comparing' : 'Compare'}
                </button>
              </div>

            </div>

            {/* Quantity Controller & Add Button */}
            <div className="space-y-3 pt-4 border-t border-[#262626]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-geist text-gray-400">Quantity</span>
                <div className="flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] rounded-xl px-3 py-1 text-xs">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-white p-1">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-geist font-bold text-white w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-white p-1">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, quantity);
                  closeQuickView();
                }}
                className="w-full py-3.5 px-4 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-sm rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.3)]"
              >
                <ShoppingBag className="w-4 h-4 stroke-[#0A0A0A]" />
                Add to Cart — {formatPrice(quickViewProduct.price * quantity)}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
