'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteFade({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className={['route-fade transform-gpu', ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'].join(' ')}>
      {children}
    </div>
  );
}
