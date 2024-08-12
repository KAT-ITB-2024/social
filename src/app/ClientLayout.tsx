'use client';

import Navbar from '~/components/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <Navbar />
      <div className="absolute max-w-md flex-grow top-0 mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
