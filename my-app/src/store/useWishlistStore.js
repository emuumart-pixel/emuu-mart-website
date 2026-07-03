import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('bm_wishlist')) || [],

  toggleWishlist: (product) => {
    set((state) => {
      const existing = state.items.find(i => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = state.items.filter(i => i.id !== product.id);
      } else {
        newItems = [...state.items, product];
      }
      localStorage.setItem('bm_wishlist', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  isWishlisted: (id) => {
    return get().items.some(i => i.id === id);
  },

  getCount: () => {
    return get().items.length;
  }
}));
