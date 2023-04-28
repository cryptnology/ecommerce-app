import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartType } from './types';

const useCartStore = create<CartType>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' },
  ),
);

export default useCartStore;
