import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Scale, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageSquare, 
  UserCheck, 
  Send, 
  Plus, 
  Minus,
  ArrowLeft
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    productReviews,
    addProductReview,
    formatPrice
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [reviewerName, setReviewerName] = useState('Subham Mohanty');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Find product from dataset
  const product = products.find((p) => p.id === id) || products[0];

  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Filter related products from same category
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const customReviews = productReviews[product.id] || [];

  const handlePostReview = (e) => {
    e.preventDefault();
    if (reviewComment.trim()) {
      addProductReview(product.id, {
        name: reviewerName || 'Verified Buyer',
        rating: reviewRating,
        comment: reviewComment
      });
      setReviewComment('');
    }
  };

  // Dynamic category-specific review generator matching the product
  const getInitialProductReview = (prod) => {
    const cat = prod?.categoryId || '';
    const name = prod?.name || 'item';

    if (cat === 'fashion') {
      return `Exceeded my expectations! The fabric quality of this ${name} is exceptionally soft and durable. Fits perfectly, breathable material, and looks super stylish!`;
    }
    if (cat === 'furniture' || cat === 'home') {
      return `Stunning craftsmanship! The ${name} adds an instant modern cyber aesthetic to my workspace. Extremely sturdy materials and easy assembly.`;
    }
    if (cat === 'gaming') {
      return `Incredible performance! High precision, zero latency, and solid tactile feedback. The ${name} elevates my entire setup.`;
    }
    if (cat === 'wearables') {
      return `Flawless accuracy! The sensors on this ${name} sync instantly with my phone, and the battery life easily lasts beyond specs.`;
    }
    if (cat === 'electronics' || cat === 'audio') {
      return `Exceeded my expectations! Audio clarity is crisp, build quality is premium, and battery efficiency easily lasts beyond specs.`;
    }
    return `Exceeded my expectations! The build quality of this ${name} is premium, shipping arrived within 24 hours, and it works flawlessly. Highly recommended!`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-body">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-geist text-gray-400 hover:text-[#BCFF4E] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </button>

      {/* MAIN PRODUCT DETAIL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#131313] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Half: Product Image Spotlight */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex items-center justify-center relative min-h-[400px]">
          {product.badge && (
            <span className="absolute top-6 left-6 bg-[#0A0A0A] text-[#BCFF4E] border border-[#BCFF4E]/40 font-geist text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
              {product.badge}
            </span>
          )}

          {/* Quick Wishlist & Compare Buttons */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
            <button
              onClick={() => toggleCompare(product)}
              className={`p-3 rounded-full border transition-all ${
                isCompared
                  ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E]'
                  : 'bg-[#0A0A0A] text-gray-300 border-[#262626] hover:text-[#BCFF4E]'
              }`}
              title="Compare product"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full border transition-all ${
                isSaved
                  ? 'bg-[#BCFF4E] text-[#0A0A0A] border-[#BCFF4E]'
                  : 'bg-[#0A0A0A] text-gray-300 border-[#262626] hover:text-red-400'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#0A0A0A]' : ''}`} />
            </button>
          </div>

          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80';
            }}
            className="max-h-[420px] w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Half: Details & Purchase Controls */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-geist font-bold text-[#BCFF4E] uppercase tracking-widest px-3 py-1 rounded-full bg-[#BCFF4E]/10 border border-[#BCFF4E]/20">
                {product.category}
              </span>
              {product.inStock && (
                <span className="text-xs font-geist text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-cyber-pulse" />
                  In Stock ({product.stockCount} available)
                </span>
              )}
            </div>

            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-white mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 stroke-amber-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-geist text-sm text-gray-300 font-semibold">
                {product.rating} ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="font-geist text-4xl font-extrabold text-[#BCFF4E] mb-6">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm font-body leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Product Specifications List */}
            {product.specs && (
              <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-4 mb-6 space-y-2 text-xs font-geist">
                <span className="text-gray-400 uppercase tracking-wider block font-bold">Key Specifications</span>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  {Array.isArray(product.specs) ? (
                    product.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between border-b border-[#262626] pb-1">
                        <span className="text-gray-400">{typeof s === 'object' ? s.label : s}:</span>
                        <span className="font-semibold text-white">{typeof s === 'object' ? String(s.value) : ''}</span>
                      </div>
                    ))
                  ) : (
                    Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-[#262626] pb-1">
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="font-semibold text-white">{typeof val === 'object' ? JSON.stringify(val) : String(val)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector & Add To Cart Button */}
          <div className="space-y-4 pt-4 border-t border-[#262626]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-geist text-gray-400 font-bold uppercase tracking-wider">Select Quantity</span>
              <div className="flex items-center gap-4 bg-[#1A1A1A] border border-[#262626] rounded-xl px-4 py-2 text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-geist font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full py-4 px-8 bg-[#BCFF4E] text-[#0A0A0A] font-headline font-bold text-lg rounded-2xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(188,255,78,0.3)]"
            >
              <ShoppingBag className="w-6 h-6 stroke-[#0A0A0A]" />
              Add to Cart — {formatPrice(product.price * quantity)}
            </button>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-geist text-gray-400 pt-2">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#1A1A1A]">
                <Truck className="w-4 h-4 text-[#BCFF4E]" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-[#BCFF4E]" />
                <span>Official Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#1A1A1A]">
                <RotateCcw className="w-4 h-4 text-[#BCFF4E]" />
                <span>30-Day Returns</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* INTERACTIVE CUSTOMER REVIEWS SECTION */}
      <section className="bg-[#131313] border border-[#262626] rounded-3xl p-8 sm:p-10 space-y-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[#BCFF4E]" />
            <h2 className="font-headline font-bold text-2xl text-white">Verified Customer Reviews</h2>
          </div>
          <span className="text-xs font-geist text-[#BCFF4E] font-bold">
            {product.rating} / 5.0 Star Rating
          </span>
        </div>

        {/* Post a Review Form */}
        <form onSubmit={handlePostReview} className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-white">Write a Review for {product.name}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-geist text-gray-400 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Subham Mohanty"
                className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl px-4 py-2.5 text-xs font-geist text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-geist text-gray-400 mb-1">Star Rating</label>
              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= reviewRating
                          ? 'fill-amber-400 stroke-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-geist text-[#BCFF4E] font-bold ml-2">{reviewRating} Stars</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-geist text-gray-400 mb-1">Your Review</label>
            <textarea
              required
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder={`Share your experience with ${product.name}...`}
              className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#BCFF4E] rounded-xl p-3 text-xs font-geist text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl hover:brightness-110 flex items-center gap-2 shadow-[0_0_15px_rgba(188,255,78,0.2)]"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Customer Review
          </button>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {customReviews.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-geist text-[#BCFF4E] font-bold uppercase tracking-wider block">Recent Customer Feedback</span>
              {customReviews.map((rev) => (
                <div key={rev.id} className="bg-[#1C1B1B] border border-[#262626] rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#BCFF4E]" />
                      <span className="font-headline font-bold text-sm text-white">{rev.name}</span>
                      <span className="text-[10px] font-geist text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Verified Purchase</span>
                    </div>
                    <span className="text-xs font-geist text-gray-500">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>

                  <p className="text-xs text-gray-300 font-body leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Item-Specific Review by Subham Mohanty */}
          <div className="bg-[#1C1B1B] border border-[#262626] rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#BCFF4E]" />
                <span className="font-headline font-bold text-sm text-white">Subham Mohanty</span>
                <span className="text-[10px] font-geist text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Verified Purchase</span>
              </div>
              <span className="text-xs font-geist text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-300 font-body leading-relaxed">
              {getInitialProductReview(product)}
            </p>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS SECTION */}
      <section className="space-y-8 pt-8 border-t border-[#262626]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-geist font-bold text-[#BCFF4E] uppercase tracking-widest block mb-1">
              CURATED FOR YOU
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
              Related Products
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-geist text-[#BCFF4E] hover:underline font-bold"
          >
            View Full Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

    </div>
  );
};
