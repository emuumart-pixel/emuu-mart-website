import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/ui/CartSidebar';
import WhatsAppFloat from './components/ui/WhatsAppFloat';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

import AdminLayout from './pages/admin/AdminLayout';
const NotFound = () => <div className="min-h-[60vh] flex items-center justify-center font-bold text-4xl text-gray-400">404 - Not Found</div>;

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{
        className: 'font-sans text-sm font-semibold',
        style: {
          borderRadius: '10px',
          background: '#1D3557',
          color: '#fff',
        }
      }} />
      
      <Routes>
        {/* Admin Routes (Without Storefront Layout) */}
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Storefront Routes (With Layout) */}
        <Route path="*" element={
          <div className="flex flex-col min-h-screen relative">
            <TopBar />
            <Header />
            <Navbar />
            <CartSidebar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <WhatsAppFloat />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
