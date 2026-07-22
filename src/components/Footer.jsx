import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Globe, 
  Share2, 
  MessageSquare, 
  Send, 
  Check, 
  Heart, 
  Package, 
  Scale, 
  Bot, 
  ShoppingBag
} from 'lucide-react';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, toggleCart, toggleCyberBot, openCheckout, wishlist } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Hide footer completely when unauthenticated or on login/register pages
  if (!user || isAuthPage) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#262626] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] shadow-[0_0_15px_rgba(188,255,78,0.3)] group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 fill-[#0A0A0A] stroke-[#0A0A0A]" />
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight text-white group-hover:text-[#BCFF4E] transition-colors">
                SkyMart
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed font-body">
              Cyber-Minimalist retail innovation. Explore next-generation tech, wearables, and modern lifestyle essentials with instant dispatch.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <span className="text-xs font-geist text-[#BCFF4E] font-bold block uppercase tracking-wider">
                Subscribe for Exclusive Deals
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#131313] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none flex-1 font-geist"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl hover:brightness-110 shrink-0 flex items-center gap-1 shadow-[0_0_12px_rgba(188,255,78,0.2)]"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-geist text-emerald-400 font-bold">
                  ✓ Subscribed! Check your inbox for VIP promo codes.
                </p>
              )}
            </form>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3 font-geist text-xs">
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-[#BCFF4E] transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-[#BCFF4E] transition-colors">Shop Product Catalog</button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#BCFF4E] transition-colors">About SkyMart</button>
              </li>
              <li>
                <button onClick={() => navigate('/orders')} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#BCFF4E]" />
                  Order History & Live Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/wishlist')} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#BCFF4E]" />
                  Saved Wishlist ({wishlist.length})
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/compare')} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#BCFF4E]" />
                  Product Comparison Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-2 space-y-3 font-geist text-xs">
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li>
                <button onClick={() => navigate('/shop?category=electronics')} className="hover:text-[#BCFF4E] transition-colors">Electronics</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=gaming')} className="hover:text-[#BCFF4E] transition-colors">Gaming Gear</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=wearables')} className="hover:text-[#BCFF4E] transition-colors">Wearables</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=smarthome')} className="hover:text-[#BCFF4E] transition-colors">Smart Home</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=fashion')} className="hover:text-[#BCFF4E] transition-colors">Clothing & Fashion</button>
              </li>
              <li>
                <button onClick={() => navigate('/shop?category=furniture')} className="hover:text-[#BCFF4E] transition-colors">Furniture</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Service & Interactive Tools */}
          <div className="lg:col-span-3 space-y-3 font-geist text-xs">
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-wider">Interactive Services</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li>
                <button onClick={toggleCyberBot} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#BCFF4E]" />
                  AI CyberBot Assistant
                </button>
              </li>
              <li>
                <button onClick={toggleCart} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-[#BCFF4E]" />
                  Open Shopping Cart
                </button>
              </li>
              <li>
                <button onClick={openCheckout} className="hover:text-[#BCFF4E] transition-colors flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#BCFF4E]" />
                  Express 256-Bit Checkout
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-3 flex items-center gap-3 text-gray-400">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1A1A1A] border border-[#262626] hover:text-[#BCFF4E] hover:border-[#BCFF4E]/50 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1A1A1A] border border-[#262626] hover:text-[#BCFF4E] hover:border-[#BCFF4E]/50 transition-all">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1A1A1A] border border-[#262626] hover:text-[#BCFF4E] hover:border-[#BCFF4E]/50 transition-all">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-geist text-gray-500">
          <p>© 2026 SkyMart Cyber Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400">
            <button onClick={() => navigate('/about')} className="hover:text-[#BCFF4E]">Privacy Policy</button>
            <button onClick={() => navigate('/about')} className="hover:text-[#BCFF4E]">Terms of Service</button>
            <button onClick={() => navigate('/about')} className="hover:text-[#BCFF4E]">Security SSL</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
