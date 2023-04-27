'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const NavBar = ({ user, expires }: Session) => {
  return (
    <nav className="flex justify-between items-center py-8">
      <h1>{user?.name}</h1>
      <ul className="flex items-center gap-12">
        {user ? (
          <li>
            <Image
              className="rounded-full"
              src={user?.image as string}
              alt={user?.name as string}
              width={48}
              height={48}
            />
          </li>
        ) : (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
