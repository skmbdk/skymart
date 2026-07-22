import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Scale, X, ArrowRight } from 'lucide-react';

export const CompareBar = () => {
  const { compareList, toggleCompare, clearCompare } = useApp();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[90%] bg-[#131313]/95 backdrop-blur-md border-2 border-[#BCFF4E] rounded-2xl p-4 shadow-[0_0_30px_rgba(188,255,78,0.25)] animate-in slide-in-from-bottom-6 duration-200">
      <div className="flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#BCFF4E] text-[#0A0A0A] flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-sm text-white">Product Comparison</h4>
            <p className="text-xs text-gray-400 font-geist">{compareList.length}/3 products queued</p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="hidden sm:flex items-center gap-2">
          {compareList.map((product) => (
            <div key={product.id} className="relative w-10 h-10 bg-white/10 rounded-lg p-1 border border-white/20">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              <button
                onClick={() => toggleCompare(product)}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/compare')}
            className="px-4 py-2 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl flex items-center gap-1.5 hover:brightness-110 shadow-[0_0_15px_rgba(188,255,78,0.3)]"
          >
            Compare Now
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={clearCompare}
            className="text-xs font-geist text-gray-400 hover:text-white p-1"
          >
            Clear
          </button>
        </div>

      </div>
    </div>
  );
};
