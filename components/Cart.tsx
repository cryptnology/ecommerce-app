'use client';

import useCartStore from '@/store';

const Cart = () => {
  const { isOpen, cart } = useCartStore();

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
