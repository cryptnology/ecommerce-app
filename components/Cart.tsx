'use client';

import Image from 'next/image';
import useCartStore from '@/store';
import { formatPrice } from '@/utils';

const Cart = () => {
  const { toggleCart, cart } = useCartStore();

  return (
    <div
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      onClick={toggleCart}
    >
      <div
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Here's your shopping list</h1>
        {cart.map((item) => (
          <div key={item.id} className="flex py-4 gap-4">
            <Image
              className="rounded-md h-24"
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
            />
            <div>
              <h2>{item.name}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <p>{item.unit_amount && formatPrice(item.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
