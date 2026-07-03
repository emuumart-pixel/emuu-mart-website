import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import ProductCard from '../components/ui/ProductCard';
import { useProductStore } from '../store/useProductStore';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const cat = searchParams.get('cat') || '';
  
  const searchProducts = useProductStore(state => state.searchProducts);
  const products = useProductStore(state => state.products);
  
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSearching(true);
    
    // Simulate slight delay for realistic feeling
    const timer = setTimeout(() => {
      let found = searchProducts(q);
      if (cat) {
        found = found.filter(p => p.cat === cat);
      }
      setResults(found);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [q, cat, searchProducts]);

  return (
    <div className="bg-gray-50 min-h-[80vh] pb-16 pt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-secondary flex items-center gap-3">
            <FaSearch className="text-gray-400" /> 
            Search Results for "{q}"
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Found {results.length} matching products</p>
        </div>

        {isSearching ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 text-center rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-6 text-gray-300">🤷‍♂️</div>
            <h3 className="text-2xl font-bold text-secondary mb-3">No results found</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find anything matching "{q}". Try checking your spelling or use more general terms.</p>
            <div className="flex justify-center gap-4">
              <Link to="/" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
