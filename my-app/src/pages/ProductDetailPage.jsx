import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { categories } from '../data/categories';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getById = useProductStore(state => state.getById);
  const getByCategory = useProductStore(state => state.getByCategory);
  
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isWishlisted = useWishlistStore(state => state.isWishlisted(Number(id)));

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const p = getById(Number(id));
    if (p) setProduct(p);
    else navigate('/404');
    setQty(1);
  }, [id, getById, navigate]);

  if (!product) return null;

  const category = categories.find(c => c.key === product.cat) || { label: 'Unknown' };
  const relatedProducts = getByCategory(product.cat).filter(p => p.id !== product.id).slice(0, 4);

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const isSoldOut = product.badge === 'Sold Out';

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart({ ...product, qty });
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    if (!isWishlisted) toast.success('Added to wishlist');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-screen-xl mx-auto px-4 text-xs text-gray-500 font-medium flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.cat}`} className="hover:text-primary transition-colors">{category.label}</Link>
          <span>/</span>
          <span className="text-secondary truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 my-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left: Image */}
          <div className="relative bg-gray-50 rounded-xl flex items-center justify-center h-[350px] md:h-[500px] overflow-hidden p-6 md:p-10">
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <Badge type={product.badge} />
              {discount > 0 && (
                <span className="bg-primary text-white px-3 py-1.5 text-xs font-bold rounded-sm shadow-sm w-fit">
                  -{discount}% OFF
                </span>
              )}
            </div>
            <button 
              onClick={handleWishlist}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white shadow rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
            >
              {isWishlisted ? <FaHeart className="text-primary text-lg" /> : <FaRegHeart className="text-lg" />}
            </button>
            <div className="w-full h-full flex items-center justify-center drop-shadow-sm">
              {product.images?.[0] || product.image
                ? <img src={product.images?.[0] || product.image} alt={product.name} className={`max-w-full max-h-full object-contain rounded-lg ${isSoldOut ? 'grayscale opacity-60' : ''}`} />
                : <span className={`text-[8rem] md:text-[12rem] ${isSoldOut ? 'grayscale opacity-60' : ''}`}>{product.emoji || '📦'}</span>
              }
            </div>
            {isSoldOut && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
                <span className="bg-gray-900 text-white text-sm font-extrabold uppercase tracking-widest px-6 py-3 rounded-full shadow-xl">
                  🚫 Sold Out
                </span>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-3 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} reviews={product.reviews} />
              <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-500 tracking-wide uppercase">{category.label}</span>
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-primary flex items-start gap-1">
                <span className="text-xl mt-1">₨</span>{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through mb-1 font-medium">₨ {product.oldPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {product.desc}
            </p>

            {isSoldOut ? (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 bg-gray-100 border-2 border-gray-200 text-gray-500 h-12 rounded-full font-bold flex items-center justify-center gap-2 text-sm">
                  🚫 This product is currently Sold Out
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 h-12 w-32">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaMinus /></button>
                  <span className="flex-1 text-center font-bold text-secondary">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><FaPlus /></button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6 mt-auto">
              <div className="flex items-center gap-3">
                <FaTruck className="text-accent text-xl" />
                <span className="text-xs font-semibold text-gray-600">Nationwide<br/>Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUndo className="text-accent text-xl" />
                <span className="text-xs font-semibold text-gray-600">7 Days<br/>Return</span>
              </div>
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-accent text-xl" />
                <span className="text-xs font-semibold text-gray-600">Secure<br/>Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-4 my-16">
          <h2 className="text-2xl font-bold text-secondary mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
