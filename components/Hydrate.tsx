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
        <body className="px-4 lg:px-48" data-theme={mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
};

export default Hydrate;
