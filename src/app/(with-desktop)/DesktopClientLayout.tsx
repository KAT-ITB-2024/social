'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '~/components/Navbar';
import { useSession } from 'next-auth/react';
import { socket } from '~/utils/socket';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

export default function DesktopClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
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
      ,
      '/wrapped',
      '/chat/room',
    ],
    [],
  );
  useEffect(() => {
    if (
      routes.includes(pathname) ||
      (pathname.startsWith('/chat/history/') && pathname !== '/chat/history') ||
      status === 'unauthenticated'
    ) {
      setShouldShowNavbar(false);
    } else {
      setShouldShowNavbar(true);
    }
  }, [pathname, routes, status]);

  useEffect(() => {
    if (status === 'authenticated' && !socket.connected) {
      socket.connect();
    } else if (status === 'unauthenticated' && socket.connected) {
      socket.disconnect();
    }
  }, [status]);

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* {shouldShowNavbar && <Navbar isDesktop />} */}
      <div className={`absolute top-0 mx-auto w-full flex-grow`}>
        {children}
      </div>
    </div>
  );
}
