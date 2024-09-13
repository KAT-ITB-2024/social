import '~/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { TRPCReactProvider } from '~/trpc/react';
import { NextAuthProvider } from '../provider';
import { Toaster } from 'sonner';
import { SuccessToast } from '~/components/ui/success-toast';
import MobileClientLayout from './MobileClientLayout';

export const metadata = {
  title: 'OSKM ITB 2024',
  description: 'by IT OSKM 2024',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="mx-auto min-w-full max-w-md">
        <TRPCReactProvider>
          <Toaster
            toastOptions={{
              unstyled: false,
              classNames: {
                error: 'bg-white text-error-500',
                success: 'bg-white text-success-500',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}
            position="top-center"
            duration={3000}
          />
          <NextAuthProvider>
            <MobileClientLayout>{children}</MobileClientLayout>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
