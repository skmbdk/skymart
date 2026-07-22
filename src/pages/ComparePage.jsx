import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Scale, X, ShoppingBag, Trash2, Check, Star, ArrowRight } from 'lucide-react';

export const ComparePage = () => {
  const { compareList, toggleCompare, clearCompare, addToCart, formatPrice } = useApp();
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 font-body">
        <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-gray-500 mx-auto">
          <Scale className="w-10 h-10 text-[#BCFF4E]" />
        </div>
        <h2 className="font-headline font-extrabold text-3xl text-white">No products selected to compare</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto font-body">
          Select up to 3 products from our catalog using the compare button on any product card.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm font-geist rounded-xl hover:brightness-110 shadow-[0_0_15px_rgba(188,255,78,0.2)]"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-body">
      
      {/* Header */}
      <div className="border-b border-[#262626] pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#BCFF4E]" />
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-white">Product Comparison Matrix</h1>
          </div>
          <p className="text-sm font-body text-gray-400 mt-1">
            Side-by-side technical specifications and pricing breakdown
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="px-4 py-2 bg-[#1A1A1A] border border-[#262626] text-gray-400 hover:text-white rounded-xl text-xs font-geist flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
          Clear Comparison
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-[#131313] border border-[#262626] rounded-3xl shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-[#262626]">
              <th className="p-6 font-headline font-bold text-base text-[#BCFF4E] w-1/4">Feature</th>
              {compareList.map((product) => (
                <th key={product.id} className="p-6 w-1/4 relative bg-[#1A1A1A]/50 border-l border-[#262626]">
                  <button
                    onClick={() => toggleCompare(product)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-[#0A0A0A] text-gray-400 hover:text-white border border-[#262626]"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-24 h-24 object-contain mx-auto bg-white/5 rounded-xl p-2"
                    />
                    <div className="text-center">
                      <h3 className="font-headline font-bold text-sm text-white line-clamp-1">{product.name}</h3>
                      <span className="font-geist text-xs text-gray-400">{product.category}</span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            
            {/* Price Row */}
            <tr>
              <td className="p-4 font-geist font-semibold text-gray-400">Price</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-center font-geist font-extrabold text-lg text-[#BCFF4E]">
                  {formatPrice(p.price)}
                </td>
              ))}
            </tr>

            {/* Rating Row */}
            <tr>
              <td className="p-4 font-geist font-semibold text-gray-400">Rating</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-center font-geist text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    <span>{p.rating} ({p.reviewCount})</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Stock Row */}
            <tr>
              <td className="p-4 font-geist font-semibold text-gray-400">Availability</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-center text-xs font-geist">
                  {p.inStock ? (
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      In Stock ({p.stockCount})
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">Out of Stock</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Specs Rows */}
            <tr>
              <td className="p-4 font-geist font-semibold text-gray-400">Specifications</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-xs font-geist text-gray-300">
                  <ul className="space-y-1">
                    {Array.isArray(p.specs) ? (
                      p.specs.map((s, i) => (
                        <li key={i} className="border-b border-[#262626] pb-1 flex justify-between">
                          <span className="text-gray-500">{typeof s === 'object' ? s.label : s}:</span>
                          <span className="font-semibold text-white">{typeof s === 'object' ? s.value : ''}</span>
                        </li>
                      ))
                    ) : (
                      p.specs && Object.entries(p.specs).map(([k, v]) => (
                        <li key={k} className="border-b border-[#262626] pb-1 flex justify-between">
                          <span className="text-gray-500 capitalize">{k}:</span>
                          <span className="font-semibold text-white">{String(v)}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-geist font-semibold text-gray-400">Action</td>
              {compareList.map(p => (
                <td key={p.id} className="p-4 text-center">
                  <button
                    onClick={() => addToCart(p)}
                    className="w-full py-2.5 px-4 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl hover:brightness-110 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(188,255,78,0.2)]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
