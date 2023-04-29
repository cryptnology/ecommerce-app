import { getServerSession } from 'next-auth';
import { Roboto, Lobster_Two } from 'next/font/google';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Hydrate, NavBar } from '@/components';

import './globals.css';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  /* Fetch the user */
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`mx-64 ${roboto.className}`}>
        <Hydrate>
          <NavBar user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
};

export default RootLayout;
