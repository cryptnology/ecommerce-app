import { getServerSession } from 'next-auth';
import { Roboto, Lobster_Two } from 'next/font/google';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Hydrate, NavBar } from '@/components';

import './globals.css';

export const metadata = {
  title: "Click'n'Buy",
  description: 'Created ny Cryptnology',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});
const lobster = Lobster_Two({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-lobster',
});

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  /* Fetch the user */
  const session = await getServerSession(authOptions);

  return (
    <html className={`${roboto.variable} ${lobster.variable}`} lang="en">
      <Hydrate>
        <NavBar user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
};

export default RootLayout;
