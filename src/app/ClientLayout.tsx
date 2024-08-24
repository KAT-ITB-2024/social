'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '~/components/Navbar';
import ChatNavbar from '~/components/chat/ChatNavbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const [showChatNavbar, setShowChatNavbar] = useState(false)

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
    const isChatPage = /^\/chat(\/.*)?$/.test(pathname);

    if (routes.includes(pathname)) {
      setShouldShowNavbar(false);
      setShowChatNavbar(false);
    } else if (isChatPage) {
      setShouldShowNavbar(false);
      setShowChatNavbar(true);
    } else {
      setShouldShowNavbar(true);
      setShowChatNavbar(false);
    }
  }, [pathname, routes]);

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col w-full">
      {shouldShowNavbar && <Navbar />}
      {showChatNavbar && <ChatNavbar />}
      <div className={`absolute max-w-md flex-grow top-0 mx-auto w-full`}>
        {children}
      </div>
    </div>
  );
}
