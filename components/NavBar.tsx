'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import useCartStore from '@/store';
import { Cart } from '@/components';

const NavBar = ({ user, expires }: Session) => {
  const { isOpen, cart, toggleCart } = useCartStore();

  const itemCount = cart.length;

  return (
    <nav className="flex justify-between items-center py-12">
      <Link href="/">
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={toggleCart}
        >
          <AiFillShopping />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {user ? (
          <li>
            <Image
              className="rounded-full"
              src={user?.image as string}
              alt={user?.name as string}
              width={36}
              height={36}
              priority
            />
          </li>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
      <AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default NavBar;
