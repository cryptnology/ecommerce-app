import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeStoreType } from '@/types';

const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: 'theme-store' },
  ),
);

export default useThemeStore;
