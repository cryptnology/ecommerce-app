'use client';

import Image from 'next/image';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import useCartStore from '@/store';
import { calculateOrderAmount, formatPrice } from '@/utils';
import basket from '@/public/empty-cart.png';

import { Checkout } from '@/components';

const Cart = () => {
  const {
    toggleCart,
    cart,
    addProduct,
    removeProduct,
    onCheckout,
    setOnCheckout,
  } = useCartStore();

  const itemsCount = cart.length;

  return (
    <motion.div
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      onClick={toggleCart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layout
        className="bg-white absolute right-0 top-0 w-full lg:w-2/5 h-screen p-12 overflow-y-scroll text-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {onCheckout === 'cart' && (
          <button className="text-sm font-bold pb-12" onClick={toggleCart}>
            Back to store
          </button>
        )}
        {onCheckout === 'checkout' && (
          <button
            className="text-sm font-bold pb-12"
            onClick={() => setOnCheckout('cart')}
          >
            Check your cart
          </button>
        )}
        {onCheckout === 'cart' &&
          cart.map((item) => (
            <motion.div key={item.id} className="flex py-4 gap-4" layout>
              <Image
                className="rounded-md h-24"
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
              />
              <motion.div layout>
                <h2>{item.name}</h2>
                <div className="flex gap-2">
                  <h2>Quantity: {item.quantity}</h2>
                  <button
                    onClick={() =>
                      removeProduct({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        unit_amount: item.unit_amount,
                        quantity: item.quantity,
                      })
                    }
                  >
                    <IoRemoveCircle />
                  </button>
                  <button
                    onClick={() =>
                      addProduct({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        unit_amount: item.unit_amount,
                        quantity: item.quantity,
                      })
                    }
                  >
                    <IoAddCircle />
                  </button>
                </div>
                <p>{item.unit_amount && formatPrice(item.unit_amount)}</p>
              </motion.div>
            </motion.div>
          ))}
        {onCheckout === 'cart' && itemsCount > 0 && (
          <motion.div layout>
            <p>Total: {formatPrice(calculateOrderAmount(cart))}</p>
            <button
              className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white"
              onClick={() => setOnCheckout('checkout')}
            >
              Checkout
            </button>
          </motion.div>
        )}
        {itemsCount === 0 && (
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
            >
              <h1>Uhhh ohhh...it's empty</h1>
              <Image src={basket} alt="Empty cart" width={200} height={200} />
            </motion.div>
          </AnimatePresence>
        )}
        {/* Checkout form */}
        {onCheckout === 'checkout' && <Checkout />}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
