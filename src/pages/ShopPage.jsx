import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FeaturedProductCard } from '../components/FeaturedProductCard';
import { Search, ArrowUpDown } from 'lucide-react';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState('featured');

  // Keep internal state synced with URL searchParams
  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete('q');
    } else {
      newParams.set('q', val);
    }
    setSearchParams(newParams);
  };

  // Filter and sort products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        product.categoryId === selectedCategory || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch = 
        searchQuery.trim() === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured product (spotlight)
  const heroFeaturedProduct = products.find(p => p.id === 'prod-1') || products[0];
  const shouldShowFeaturedCard = selectedCategory === 'all' && searchQuery === '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-body">
      
      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <h1 className="font-headline font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          {selectedCategory === 'all' ? 'All Products' : `${categories.find(c => c.id === selectedCategory)?.name || 'Filtered'} Products`}
        </h1>
        <p className="font-geist text-sm sm:text-base font-semibold text-[#BCFF4E]">
          Curated Cyber Hardware & Modern Lifestyle Essentials
        </p>
      </div>

      {/* Search Input Bar & Category Pills */}
      <div className="space-y-6">
        
        {/* Top Controls Row: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Search Bar with Green Ring */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#BCFF4E]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="w-full bg-[#131313] border-2 border-[#BCFF4E] rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-500 font-body text-sm focus:outline-none focus:ring-4 focus:ring-[#BCFF4E]/20 shadow-[0_0_20px_rgba(188,255,78,0.15)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange({ target: { value: '' } })}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#BCFF4E] text-xs font-geist"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] rounded-full px-4 py-3 text-xs font-geist text-gray-300">
              <ArrowUpDown className="w-4 h-4 text-[#BCFF4E]" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured" className="bg-[#1A1A1A] text-white">Featured</option>
                <option value="price-asc" className="bg-[#1A1A1A] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1A1A1A] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#1A1A1A] text-white">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Pills Bar (Numbers Removed!) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-5 py-2.5 rounded-full font-geist text-xs font-bold transition-all shrink-0 focus:outline-none ${
                  isActive
                    ? 'bg-[#BCFF4E] text-[#0A0A0A] shadow-[0_0_15px_rgba(188,255,78,0.4)]'
                    : 'bg-[#1C1B1B] text-gray-300 hover:text-white hover:bg-[#262626] border border-[#262626]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Product Display Layout */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-12 text-center my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#262626] flex items-center justify-center text-gray-500 mx-auto">
            <Search className="w-8 h-8 text-[#BCFF4E]" />
          </div>
          <h3 className="font-headline font-bold text-xl text-white">No products found</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto font-body">
            We couldn't find anything matching "{searchQuery}". Try searching for another keyword or select a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Hero Spotlight Card on Default Catalog View */}
          {shouldShowFeaturedCard && (
            <div className="mb-8">
              <FeaturedProductCard product={heroFeaturedProduct} />
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
