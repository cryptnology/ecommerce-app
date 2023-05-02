'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useCartStore } from '@/store';
import dance from '@/public/dance.webp';

const OrderConfirmed = () => {
  const { setOnCheckout, toggleCart, setPaymentIntent, clearCart } =
    useCartStore();

  useEffect(() => {
    setPaymentIntent('');
    clearCart();
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium">Your order has been placed</h1>
        <h2 className="text-sm my-4">Check your email for the receipt.</h2>
        <Image
          className="my-8 rounded-md w-full"
          src={dance}
          alt="Dancing man"
          priority
        />
        <Link href="/dashboard">
          <button
            className="font-medium"
            onClick={() => {
              setTimeout(() => setOnCheckout('cart'), 1000);
              toggleCart();
            }}
          >
            Check your order
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderConfirmed;
