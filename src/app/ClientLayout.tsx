'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '~/components/Navbar';
import { useSession } from 'next-auth/react';
import { socket } from '~/utils/socket';

export default function ClientLayout({
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
      '/chat/room',
    ],
    [],
  );

  useEffect(() => {
    if (status === 'authenticated' && !socket.connected) {
      socket.connect();
    } else if (status === 'unauthenticated' && socket.connected) {
      socket.disconnect();
    }
  }, [status]);

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
