'use client';

import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const Hydrate = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : null}</>;
};

export default Hydrate;
