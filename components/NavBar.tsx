'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillShopping } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/store';
import { Cart, DarkLight } from '@/components';

const NavBar = ({ user, expires }: Session) => {
  const { isOpen, cart, toggleCart } = useCartStore();

  const itemCount = cart.length;

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  };

  return (
    <nav className="flex justify-between items-center py-12">
      <Link href="/">
        <h1 className="font-lobster text-xl">Click'n'Buy</h1>
      </Link>
      <ul className="flex items-center gap-8">
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={toggleCart}
        >
          <AiFillShopping />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* Dark and light mode */}
        <DarkLight />
        {user ? (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
              <Image
                className="rounded-full"
                src={user?.image as string}
                alt={user?.name as string}
                width={36}
                height={36}
                priority
                tabIndex={0}
              />
              <ul
                className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box min-w-max"
                tabIndex={0}
              >
                <Link
                  className="hover:bg-base-300 p-4 rounded-md"
                  href="/dashboard"
                  onClick={handleBlur}
                >
                  Orders
                </Link>
                <li
                  className="hover:bg-base-300 p-4 rounded-md cursor-pointer"
                  onClick={() => {
                    handleBlur;
                    signOut();
                  }}
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button className="btn btn-primary" onClick={() => signIn()}>
              Sign in
            </button>
          </li>
        )}
      </ul>
      <AnimatePresence>{isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
};

export default NavBar;
