import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, addToCart } = useApp();
  const navigate = useNavigate();

  const handleAddAllToCart = () => {
    wishlist.forEach(product => addToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#BCFF4E] fill-[#BCFF4E]" />
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-white">Your Saved Wishlist</h1>
          </div>
          <p className="text-sm font-body text-gray-400 mt-1">
            {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved for later
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/shop')}
            className="px-4 py-2 bg-[#1A1A1A] border border-[#262626] text-gray-300 hover:text-white rounded-xl text-xs font-geist flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>

          {wishlist.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2 bg-[#BCFF4E] text-[#0A0A0A] font-bold rounded-xl text-xs font-geist flex items-center gap-2 hover:brightness-110 shadow-[0_0_15px_rgba(188,255,78,0.2)]"
            >
              <ShoppingBag className="w-4 h-4" />
              Add All to Cart
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {wishlist.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-3xl p-16 text-center space-y-4 my-8">
          <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center text-gray-500 mx-auto">
            <Heart className="w-10 h-10 text-[#BCFF4E]" />
          </div>
          <h3 className="font-headline font-bold text-2xl text-white">Your wishlist is empty</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto font-body leading-relaxed">
            Click the heart icon on any product card in our catalog to save items here.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm rounded-full shadow-[0_0_20px_rgba(188,255,78,0.3)]"
          >
            Explore Cyber Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
