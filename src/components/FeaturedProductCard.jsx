import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Star } from 'lucide-react';

export const FeaturedProductCard = ({ product }) => {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  if (!product) return null;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-[#1C1B1B] rounded-2xl border border-[#262626] hover:border-[#BCFF4E]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(188,255,78,0.2)]">
      
      {/* Featured Large Image Container */}
      <div 
        onClick={handleCardClick}
        className="cursor-pointer relative aspect-square bg-white rounded-t-2xl p-8 flex items-center justify-center overflow-hidden"
      >
        <span className="absolute top-4 left-4 bg-[#BCFF4E] text-[#0A0A0A] font-geist text-xs font-extrabold tracking-wider px-3 py-1 rounded-full uppercase z-10 shadow-[0_0_12px_rgba(188,255,78,0.4)]">
          FEATURED SPOTLIGHT
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details Container */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <button 
            onClick={handleCardClick}
            className="text-left font-headline font-bold text-xl sm:text-2xl text-white hover:text-[#BCFF4E] transition-colors leading-tight mb-2 focus:outline-none"
          >
            {product.name}
          </button>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="font-geist text-sm text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Row: Large Price & Add Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#262626] mt-4">
          <span className="font-geist text-2xl font-extrabold text-[#BCFF4E]">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#BCFF4E] text-[#BCFF4E] hover:bg-[#BCFF4E] hover:text-[#0A0A0A] text-sm font-geist font-bold transition-all duration-200 focus:outline-none active:scale-95 shadow-[0_0_15px_rgba(188,255,78,0.15)]"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
