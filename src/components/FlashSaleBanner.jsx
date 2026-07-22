import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, Clock, ArrowRight, Flame } from 'lucide-react';

export const FlashSaleBanner = () => {
  const navigate = useNavigate();
  const { applyCoupon, toggleCart } = useApp();

  // Ticking countdown timer state (starts at 4 hours 30 mins)
  const [timeLeft, setTimeLeft] = useState(4 * 3600 + 30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 4 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (n) => String(n).padStart(2, '0');

  const handleClaimDeal = () => {
    // 1. Automatically apply 20% Flash Sale promo code
    applyCoupon('CYBER20');
    // 2. Open Cart Drawer to show active discount
    toggleCart();
  };

  return (
    <div className="bg-gradient-to-r from-[#131313] via-[#1A1A1A] to-[#131313] border-y border-[#BCFF4E]/30 py-3.5 px-4 shadow-[0_0_20px_rgba(188,255,78,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        
        {/* Left Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-[#BCFF4E] text-[#0A0A0A] font-geist font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(188,255,78,0.4)] animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-[#0A0A0A]" />
            FLASH SALE
          </div>
          <span className="font-headline font-bold text-sm text-white hidden md:inline">
            Limited Time Cyber Hardware Deals — Save up to <span className="text-[#BCFF4E]">20% OFF</span>
          </span>
        </div>

        {/* Live Countdown Timer */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-geist text-xs text-gray-300">
            <Clock className="w-4 h-4 text-[#BCFF4E]" />
            <span className="text-gray-400">Ends in:</span>
            <div className="flex items-center gap-1 font-bold text-[#BCFF4E] font-geist">
              <span className="bg-[#0A0A0A] border border-[#262626] px-2 py-1 rounded-lg text-white">{pad(hours)}h</span>
              <span>:</span>
              <span className="bg-[#0A0A0A] border border-[#262626] px-2 py-1 rounded-lg text-white">{pad(minutes)}m</span>
              <span>:</span>
              <span className="bg-[#0A0A0A] border border-[#262626] px-2 py-1 rounded-lg text-white">{pad(seconds)}s</span>
            </div>
          </div>

          <button
            onClick={handleClaimDeal}
            className="px-4 py-1.5 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl flex items-center gap-1.5 hover:brightness-110 shadow-[0_0_12px_rgba(188,255,78,0.3)] shrink-0 active:scale-95 transition-transform"
          >
            Claim Deal
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
