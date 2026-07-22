import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Cpu, ShieldCheck, Truck, ChevronDown, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What makes SkyMart different from traditional e-commerce?",
      a: "SkyMart is built on a Cyber-Minimalist architecture focused on speed, zero-clutter visual design, and real-time inventory sync. We prioritize instantaneous micro-interactions and verified authentic hardware."
    },
    {
      q: "How fast is shipping?",
      a: "Orders placed before 3:00 PM EST ship the same day. Standard shipping takes 1-2 business days, and express overnight delivery is available at checkout."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major Credit Cards, Apple Pay, Google Pay, and instant decentralized Crypto transactions (BTC, ETH, SOL)."
    },
    {
      q: "What is your return policy?",
      a: "We offer a hassle-free 30-day return policy on all unopened or defective items with prepaid return shipping labels."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Brand Hero */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#BCFF4E]/40 text-[#BCFF4E] text-xs font-geist font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-[#BCFF4E]" />
          OUR MISSION
        </div>

        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          Redefining Retail at the <span className="text-[#BCFF4E]">Cyber Edge.</span>
        </h1>

        <p className="text-gray-300 font-body text-base sm:text-lg leading-relaxed">
          SkyMart was created to eliminate friction in modern shopping. We blend high-performance cyber aesthetics with curated tech, fashion, and home essentials.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1C1B1B] border border-[#262626] rounded-2xl p-8 space-y-4 hover:border-[#BCFF4E]/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#BCFF4E]/10 border border-[#BCFF4E]/30 flex items-center justify-center text-[#BCFF4E]">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-xl text-white">Next-Gen Architecture</h3>
          <p className="text-sm text-gray-400 font-body leading-relaxed">
            Powered by optimized component rendering, static hydration, and real-time state management for sub-millisecond responsiveness.
          </p>
        </div>

        <div className="bg-[#1C1B1B] border border-[#262626] rounded-2xl p-8 space-y-4 hover:border-[#BCFF4E]/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#BCFF4E]/10 border border-[#BCFF4E]/30 flex items-center justify-center text-[#BCFF4E]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-xl text-white">Guaranteed Quality</h3>
          <p className="text-sm text-gray-400 font-body leading-relaxed">
            Every product in our catalog undergoes rigorous multi-point hardware and material inspection before listing.
          </p>
        </div>

        <div className="bg-[#1C1B1B] border border-[#262626] rounded-2xl p-8 space-y-4 hover:border-[#BCFF4E]/50 transition-all">
          <div className="w-12 h-12 rounded-xl bg-[#BCFF4E]/10 border border-[#BCFF4E]/30 flex items-center justify-center text-[#BCFF4E]">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-headline font-bold text-xl text-white">Instant Fulfillment</h3>
          <p className="text-sm text-gray-400 font-body leading-relaxed">
            Automated warehouse robotics ensure your order is packed and dispatched within 60 minutes of payment confirmation.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="font-headline font-bold text-3xl text-white text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#1A1A1A] border border-[#262626] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-6 text-left font-headline font-bold text-lg text-white flex justify-between items-center hover:text-[#BCFF4E] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#BCFF4E]' : 'text-gray-500'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-gray-300 font-body leading-relaxed border-t border-[#262626] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-[#1A1A1A] via-[#201f1f] to-[#1A1A1A] border border-[#BCFF4E]/30 rounded-3xl p-10 text-center space-y-6 shadow-[0_0_30px_rgba(188,255,78,0.1)]">
        <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-white">
          Ready to experience the future of retail?
        </h2>
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-base rounded-2xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(188,255,78,0.3)]"
        >
          Explore Catalog Now
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
};
