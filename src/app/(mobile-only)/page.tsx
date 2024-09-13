'use client';

import MenuButton from '@/components/home/MenuButton';
import Journey from '~/components/home/Journey';
import ButtonOskmWrap from '~/components/home/ButtonOSKMWrap';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import Coins from '~/components/home/Coins';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (
    !session ||
    (session.user.role !== 'Peserta' && session.user.role !== 'ITB-X')
  ) {
    redirect('/login');
  } else if (session.user.role === 'ITB-X') {
    redirect('/lembaga');
  }

  return (
    <main className="flex min-h-screen w-screen max-w-md flex-col bg-[url('/images/home/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="mb-5 mt-24 flex max-w-full flex-row justify-between gap-1 px-6">
        <MenuButton label="Assignment" variant="Assignment" />
        <MenuButton label="Merch" variant="Merch" />
        <MenuButton label="Chat" variant="Chat" />
        <MenuButton label="Leaderboard" variant="Leaderboard" />
      </div>
      <Coins />

      <ButtonOskmWrap />

      <div className="flex w-full items-center justify-center">
        <h3 className="text-h3 text-blue-600 text-shadow-pink-md">
          OSKM Journey
        </h3>
      </div>

      <Journey />
    </main>
  );
}
