import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { Bot, X, Send, Sparkles, ShoppingBag, ArrowRight, RefreshCw, Check } from 'lucide-react';

export const CyberBotModal = () => {
  const { isCyberBotOpen, toggleCyberBot, addToCart, formatPrice } = useApp();

  const [budget, setBudget] = useState('all'); // 'under50', '50to150', 'over150'
  const [category, setCategory] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isCyberBotOpen) return null;

  const handleRecommend = () => {
    let filtered = products.filter((p) => {
      let matchesBudget = true;
      if (budget === 'under50') matchesBudget = p.price <= 50;
      if (budget === '50to150') matchesBudget = p.price > 50 && p.price <= 150;
      if (budget === 'over150') matchesBudget = p.price > 150;

      let matchesCategory = true;
      if (category !== 'all') matchesCategory = p.categoryId === category;

      return matchesBudget && matchesCategory;
    });

    if (filtered.length === 0) {
      filtered = products.slice(0, 3);
    } else {
      filtered = filtered.slice(0, 3);
    }

    setRecommendations(filtered);
    setHasSearched(true);
  };

  const resetBot = () => {
    setBudget('all');
    setCategory('all');
    setRecommendations([]);
    setHasSearched(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[92%] sm:w-96 bg-[#131313] border-2 border-[#BCFF4E] rounded-3xl shadow-[0_0_40px_rgba(188,255,78,0.3)] overflow-hidden animate-in zoom-in-95 duration-200 text-white">
      
      {/* Bot Header */}
      <div className="p-4 bg-[#0A0A0A] border-b border-[#262626] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#BCFF4E] text-[#0A0A0A] flex items-center justify-center font-bold shadow-[0_0_15px_rgba(188,255,78,0.4)]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-sm text-white flex items-center gap-1.5">
              CyberBot Assistant
              <Sparkles className="w-3.5 h-3.5 text-[#BCFF4E]" />
            </h3>
            <span className="text-[11px] font-geist text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-cyber-pulse" />
              AI Recommendation Engine
            </span>
          </div>
        </div>

        <button
          onClick={toggleCyberBot}
          className="p-1.5 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Bot Body */}
      <div className="p-5 space-y-4 max-h-[480px] overflow-y-auto font-geist">
        
        {/* Intro Message */}
        <div className="bg-[#1A1A1A] border border-[#262626] p-3.5 rounded-2xl text-xs text-gray-300 leading-relaxed">
          ⚡ "Greetings! Tell me your budget and interest, and I will instantly recommend the best cyber hardware for you."
        </div>

        {!hasSearched ? (
          <div className="space-y-4 pt-1">
            
            {/* Budget Selector */}
            <div>
              <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">1. Your Budget</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { key: 'all', label: 'Any Price' },
                  { key: 'under50', label: '< $50' },
                  { key: '50to150', label: '$50-$150' },
                  { key: 'over150', label: '$150+' },
                ].map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBudget(b.key)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all ${
                      budget === b.key
                        ? 'border-[#BCFF4E] bg-[#BCFF4E]/10 text-[#BCFF4E] font-bold'
                        : 'border-[#262626] bg-[#1A1A1A] text-gray-400 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">2. Primary Interest</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'all', label: '⚡ All Categories' },
                  { key: 'electronics', label: '💻 Electronics' },
                  { key: 'gaming', label: '🎮 Gaming' },
                  { key: 'wearables', label: '⌚ Wearables' },
                  { key: 'fashion', label: '👕 Fashion' },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={`py-2 px-3 rounded-xl border text-left transition-all ${
                      category === c.key
                        ? 'border-[#BCFF4E] bg-[#BCFF4E]/10 text-[#BCFF4E] font-bold'
                        : 'border-[#262626] bg-[#1A1A1A] text-gray-400 hover:text-white'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRecommend}
              className="w-full py-3 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-xs rounded-xl hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(188,255,78,0.3)] mt-2"
            >
              Generate Recommendations
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        ) : (
          /* Recommendations Result List */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#BCFF4E] font-bold border-b border-[#262626] pb-2">
              <span>Top AI Picks for You</span>
              <button onClick={resetBot} className="text-gray-400 hover:text-white flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {recommendations.map((prod) => (
              <div key={prod.id} className="bg-[#1C1B1B] border border-[#262626] p-3 rounded-2xl flex items-center gap-3 group hover:border-[#BCFF4E]/50 transition-colors">
                <img src={prod.image} alt={prod.name} className="w-12 h-12 object-contain bg-white/5 rounded-xl p-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">{prod.name}</h4>
                  <span className="text-xs font-bold text-[#BCFF4E] block">{formatPrice(prod.price)}</span>
                </div>
                <button
                  onClick={() => addToCart(prod)}
                  className="p-2 rounded-xl bg-[#BCFF4E] text-[#0A0A0A] font-bold hover:brightness-110 shrink-0"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
