'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '~/components/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);

  // Add routes to hide the navbar
  const routes = useMemo(
    () => [
      '/maintenance',
      '/coming-soon',
      '/not-found',
      '/login',
      '/forgot-password',
      '/reset-password',
    ],
    [],
  );

  useEffect(() => {
    if (routes.includes(pathname)) {
      setShouldShowNavbar(false);
    } else {
      setShouldShowNavbar(true);
    }
  }, [pathname, routes]);

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col w-full">
      {shouldShowNavbar && <Navbar />}
      <div className={`absolute max-w-md flex-grow top-0 mx-auto w-full`}>
        {children}
      </div>
    </div>
  );
}
