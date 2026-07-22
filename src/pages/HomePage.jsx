import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, heroStats, homeCategories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FeaturedProductCard } from '../components/FeaturedProductCard';
import { FlashSaleBanner } from '../components/FlashSaleBanner';
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Star, 
  Zap, 
  Flame,
  Laptop,
  Gamepad2,
  Watch,
  Cpu,
  Shirt,
  Armchair,
  Package
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { formatPrice } = useApp();

  // Top-rated products
  const topRatedProducts = products
    .filter((p) => p.rating >= 4.8)
    .slice(0, 4);

  // New arrivals
  const newArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 4);

  // Hero Spotlight product
  const heroFeaturedProduct = products.find(p => p.id === 'prod-1') || products[0];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Watch': return <Watch className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Shirt': return <Shirt className="w-6 h-6 text-[#BCFF4E]" />;
      case 'Armchair': return <Armchair className="w-6 h-6 text-[#BCFF4E]" />;
      default: return <Package className="w-6 h-6 text-[#BCFF4E]" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 font-body">
      
      {/* 1. Live Flash Sale Countdown Banner */}
      <FlashSaleBanner />

      {/* 2. Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative bg-gradient-to-br from-[#131313] via-[#1A1A1A] to-[#0A0A0A] border border-[#262626] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Subtle Cyber Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#BCFF4E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Copy & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#BCFF4E]/40 text-[#BCFF4E] font-geist text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#BCFF4E]" />
                Next-Gen Shopping Experience
              </div>

              <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Discover <span className="text-[#BCFF4E] drop-shadow-[0_0_15px_rgba(188,255,78,0.3)]">Cyberpunk</span> Tech & Modern Lifestyle
              </h1>

              <p className="font-body text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Explore curated hardware, wearables, and high-performance essentials with instant dispatch, live tracking, and verified warranties.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-4 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-base rounded-2xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(188,255,78,0.3)]"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[#0A0A0A]" />
                  Explore Catalog
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#262626] max-w-md">
                {heroStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="font-headline text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                    <div className="font-geist text-xs text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Product Card */}
            <div className="lg:col-span-5">
              <FeaturedProductCard product={heroFeaturedProduct} />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Shop by Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-geist font-bold text-[#BCFF4E] uppercase tracking-widest block mb-1">
              DISCOVER HARDWARE
            </span>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-geist text-[#BCFF4E] hover:underline font-bold"
          >
            View All Categories →
          </button>
        </div>

        {/* 8 Category Grid Cards (Clean Labels without Numbers) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {homeCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/shop?category=${cat.id}`)}
              className="group cursor-pointer bg-[#131313] border border-[#262626] hover:border-[#BCFF4E] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,255,78,0.15)] flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-white group-hover:text-[#BCFF4E] transition-colors">
                  {cat.name}
                </h3>
                <span className="font-geist text-xs text-gray-400 mt-1 block">
                  Explore Collection
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOP RATED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
                Top Rated Products
              </h2>
              <p className="text-xs font-geist text-gray-400 mt-0.5">Highest customer ratings and reviews</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-geist text-[#BCFF4E] hover:underline font-bold hidden sm:block"
          >
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. NEW ARRIVALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#BCFF4E]/10 text-[#BCFF4E] border border-[#BCFF4E]/20">
              <Flame className="w-5 h-5 fill-[#BCFF4E]" />
            </div>
            <div>
              <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
                New Arrivals
              </h2>
              <p className="text-xs font-geist text-gray-400 mt-0.5">Fresh tech added this week</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-geist text-[#BCFF4E] hover:underline font-bold hidden sm:block"
          >
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. Trust Badges Footer Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#131313] border border-[#262626] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-[#BCFF4E]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">Express Dispatch</h3>
            <p className="text-xs font-body text-gray-400">Free shipping on orders over $100</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-4 border-y sm:border-y-0 sm:border-x border-[#262626]">
            <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-[#BCFF4E]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">256-Bit SSL Encrypted</h3>
            <p className="text-xs font-body text-gray-400">100% secure payment options</p>
          </div>

          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-center text-[#BCFF4E]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-white text-base">30-Day Money Back</h3>
            <p className="text-xs font-body text-gray-400">Hassle-free hardware returns</p>
          </div>
        </div>
      </section>

    </div>
  );
};
