import { create } from 'zustand';

export const useAuthStore = create((set) => {
  const storedAuth = JSON.parse(localStorage.getItem('bm_auth'));
  return {
    isAuthenticated: storedAuth ? storedAuth.isAuthenticated : false,
    admin: storedAuth ? storedAuth.admin : null,

    login: (username, password) => {
      // Hardcoded credentials for demo purposes
      if (username === 'admin' && password === 'admin123') {
        const authData = { isAuthenticated: true, admin: { username: 'admin', name: 'Admin User' } };
        localStorage.setItem('bm_auth', JSON.stringify(authData));
        set(authData);
        return true;
      }
      return false;
    },

    logout: () => {
      localStorage.removeItem('bm_auth');
      set({ isAuthenticated: false, admin: null });
    }
  };
});
