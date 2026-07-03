import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('bm_cart')) || [],
  isOpen: false,

  addToCart: (product) => {
    set((state) => {
      const existing = state.items.find(i => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + (product.qty || 1) } : i);
      } else {
        newItems = [...state.items, { ...product, qty: product.qty || 1 }];
      }
      localStorage.setItem('bm_cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const newItems = state.items.filter(i => i.id !== id);
      localStorage.setItem('bm_cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  updateQty: (id, qty) => {
    set((state) => {
      let newItems;
      if (qty <= 0) {
        newItems = state.items.filter(i => i.id !== id);
      } else {
        newItems = state.items.map(i => i.id === id ? { ...i, qty } : i);
      }
      localStorage.setItem('bm_cart', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem('bm_cart');
    set({ items: [] });
  },

  getTotal: () => {
    const items = get().items;
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount: () => {
    const items = get().items;
    return items.reduce((sum, i) => sum + i.qty, 0);
  },

  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}));
