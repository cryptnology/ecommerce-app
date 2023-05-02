import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStoreType } from '@/types';

const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: '',
      onCheckout: 'cart',
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id)
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              return cartItem;
            });
            return { cart: updatedCart };
          } else return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id)
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id,
            );
            return { cart: filteredCart };
          }
        }),
      setPaymentIntent: (val) =>
        set((state) => ({
          paymentIntent: val,
        })),
      setOnCheckout: (val) => set(() => ({ onCheckout: val })),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    { name: 'cart-store' },
  ),
);

export default useCartStore;
