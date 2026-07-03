import { create } from 'zustand';
import { productsData } from '../data/products';
import { categories } from '../data/categories';

export const useProductStore = create((set, get) => {
  const storedProducts = JSON.parse(localStorage.getItem('bm_products'));
  const initialProducts = storedProducts && storedProducts.length > 0 ? storedProducts : productsData;

  // Ensure we persist the seed data if it's the first time
  if (!storedProducts) {
    localStorage.setItem('bm_products', JSON.stringify(initialProducts));
  }

  return {
    products: initialProducts,
    categories: categories,

    getByCategory: (slug) => {
      const all = get().products;
      if (slug === 'bestseller') {
        return all.filter(p => p.badge === 'Best' || p.badge === 'Hot');
      }
      return all.filter(p => p.cat === slug);
    },

    getById: (id) => {
      return get().products.find(p => p.id === parseInt(id));
    },

    searchProducts: (query) => {
      const all = get().products;
      if (!query) return [];
      const lower = query.toLowerCase();
      return all.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.desc.toLowerCase().includes(lower)
      );
    },

    addProduct: (product) => {
      set((state) => {
        const newProducts = [...state.products, product];
        localStorage.setItem('bm_products', JSON.stringify(newProducts));
        return { products: newProducts };
      });
    },

    updateProduct: (id, data) => {
      set((state) => {
        const newProducts = state.products.map(p => p.id === parseInt(id) ? { ...p, ...data } : p);
        localStorage.setItem('bm_products', JSON.stringify(newProducts));
        return { products: newProducts };
      });
    },

    deleteProduct: (id) => {
      set((state) => {
        const newProducts = state.products.filter(p => p.id !== parseInt(id));
        localStorage.setItem('bm_products', JSON.stringify(newProducts));
        return { products: newProducts };
      });
    }
  };
});
