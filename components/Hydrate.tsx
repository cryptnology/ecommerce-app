'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useThemeStore } from '@/store';

interface Props {
  children: ReactNode;
}

const Hydrate = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { mode } = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body
          className="px-4 md:px-24 lg:px-24 xl:px-36 2xl:px-48 font-roboto"
          data-theme={mode}
        >
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
};

export default Hydrate;
