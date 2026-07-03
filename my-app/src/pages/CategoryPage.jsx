import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';
import ProductCard from '../components/ui/ProductCard';
import { useProductStore } from '../store/useProductStore';
import { categories } from '../data/categories';

const CategoryPage = () => {
  const { slug } = useParams();
  const getByCategory = useProductStore(state => state.getByCategory);
  
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortMode, setSortMode] = useState('newest');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const category = categories.find(c => c.key === slug) || { label: 'All Products', key: 'all' };
  
  const filteredProducts = useMemo(() => {
    let list = getByCategory(slug);
    
    // Price filter
    if (priceFilter === 'low') list = list.filter(p => p.price < 1000);
    else if (priceFilter === 'mid') list = list.filter(p => p.price >= 1000 && p.price <= 5000);
    else if (priceFilter === 'high') list = list.filter(p => p.price > 5000);

    // Sort
    if (sortMode === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortMode === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortMode === 'rating') list.sort((a, b) => b.rating - a.rating);
    // newest can just remain as-is or sorted by id desc assuming id is timestamp
    else list.sort((a, b) => b.id - a.id);

    return list;
  }, [slug, priceFilter, sortMode, getByCategory]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-screen-xl mx-auto px-4 text-xs text-gray-500 font-medium flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-secondary">{category.label}</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 my-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">{category.label}</h1>
          <p className="text-gray-500 text-sm">Showing {filteredProducts.length} products</p>
        </div>

        {/* Filters & Sort */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
              <FaFilter /> Price:
            </div>
            <div className="flex gap-2">
              {['all', 'low', 'mid', 'high'].map(f => (
                <button 
                  key={f}
                  onClick={() => setPriceFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${priceFilter === f ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {f === 'low' ? '< ₨1000' : f === 'mid' ? '₨1K - ₨5K' : f === 'high' ? '> ₨5000' : 'All'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-primary"
              value={sortMode}
              onChange={e => setSortMode(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 text-center rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-secondary mb-2">No products found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">We couldn't find any products matching your current filters. Try adjusting your price range.</p>
            <button 
              onClick={() => { setPriceFilter('all'); setSortMode('newest'); }}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-full transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
