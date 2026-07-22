import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Star, Package, Heart, Scale, Eye, Laptop, Shirt, Armchair, Gamepad2, Watch } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, isInWishlist, compareList, toggleCompare, isInCompare, openQuickView, formatPrice } = useApp();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderFallbackIcon = () => {
    const cat = product.categoryId || '';
    if (cat === 'electronics' || cat === 'audio') return <Laptop className="w-12 h-12 text-[#BCFF4E]" />;
    if (cat === 'fashion') return <Shirt className="w-12 h-12 text-[#BCFF4E]" />;
    if (cat === 'furniture' || cat === 'home') return <Armchair className="w-12 h-12 text-[#BCFF4E]" />;
    if (cat === 'gaming') return <Gamepad2 className="w-12 h-12 text-[#BCFF4E]" />;
    if (cat === 'wearables') return <Watch className="w-12 h-12 text-[#BCFF4E]" />;
    return <Package className="w-12 h-12 text-[#BCFF4E]" />;
  };

  return (
    <div className="group relative bg-[#1C1B1B] rounded-2xl border border-[#262626] hover:border-[#BCFF4E]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_20px_rgba(188,255,78,0.15)]">
      
      {/* Product Image Container */}
      <div 
        onClick={handleCardClick}
        className="cursor-pointer relative aspect-square bg-white rounded-t-2xl p-6 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
      >
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#0A0A0A] text-[#BCFF4E] border border-[#BCFF4E]/40 font-geist text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase z-10">
            {product.badge}
          </span>
        )}

        {/* Top Right Action Icons: Quick View, Wishlist & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2 rounded-full bg-[#0A0A0A]/80 text-gray-300 border border-[#262626] hover:text-[#BCFF4E] transition-all"
            title="Quick View Overlay"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-full border transition-all ${
              isCompared
                ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E]'
                : 'bg-[#0A0A0A]/80 text-gray-300 border-[#262626] hover:text-[#BCFF4E]'
            }`}
            title={isCompared ? 'Remove from compare' : 'Compare product'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full border transition-all ${
              isSaved
                ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E]'
                : 'bg-[#0A0A0A]/80 text-gray-300 border-[#262626] hover:text-red-400'
            }`}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#0A0A0A]' : ''}`} />
          </button>
        </div>
        
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-[#0A0A0A] rounded-xl p-4 border border-[#262626]">
            {renderFallbackIcon()}
            <span className="text-[11px] font-geist mt-2 text-white font-bold text-center">{product.name}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <button 
            onClick={handleCardClick}
            className="text-left font-headline font-semibold text-base text-white hover:text-[#BCFF4E] transition-colors line-clamp-1 mb-1 focus:outline-none"
          >
            {product.name}
          </button>
          
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="font-geist text-xs text-gray-400">{product.rating}</span>
            <span className="text-gray-500 text-xs font-geist">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Row: Price & Add Button */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#262626]">
          <span className="font-geist text-lg font-bold text-[#BCFF4E]">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#BCFF4E] text-[#BCFF4E] hover:bg-[#BCFF4E] hover:text-[#0A0A0A] text-xs font-geist font-bold transition-all duration-200 focus:outline-none active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
