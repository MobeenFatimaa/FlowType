import { create } from 'zustand';

const getSavedTheme = () => {
  try {
    return localStorage.getItem('flowtype-theme') || 'stoic';
  } catch (e) {
    return 'stoic';
  }
};

export const useThemeStore = create((set) => ({
  theme: getSavedTheme(),

  setTheme: (newTheme) => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      localStorage.setItem('flowtype-theme', newTheme);
    } catch (e) {
      console.error(e);
    }
    set({ theme: newTheme });
  },

  initTheme: () => {
    const saved = getSavedTheme();
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {
      console.error(e);
    }
    set({ theme: saved });
  },
}));