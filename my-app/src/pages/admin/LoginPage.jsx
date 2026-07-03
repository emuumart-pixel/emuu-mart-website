import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = login(form.username, form.password);
    if (success) {
      toast.success('Welcome back, Admin! 👋');
      onLogin && onLogin();
    } else {
      toast.error('Invalid credentials. Try admin / admin123');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo_transparent.png" alt="EmuuMart" className="h-28 w-auto mx-auto object-contain mb-4" />
          <h1 className="text-2xl font-extrabold text-secondary">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 border-2 border-blush-deep rounded-xl outline-none focus:border-primary transition-colors text-sm bg-blush text-secondary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 border-2 border-blush-deep rounded-xl outline-none focus:border-primary transition-colors text-sm bg-blush text-secondary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>Sign In to Admin Panel</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
