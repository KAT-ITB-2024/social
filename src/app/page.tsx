'use client';

import { api } from '~/trpc/react';
import MenuButton from '@/components/home/MenuButton';
import Image from 'next/image';
import Journey from '~/components/home/Journey';
import ButtonOskmWrap from '~/components/home/ButtonOSKMWrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

export default function Home() {
  const { data: session, status } = useSession();
  const [showCoins, setShowCoins] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const now = getCurrentWIBTime();

    // if (now.getDate() === 7 && now.getMonth() === 9) {
    //   setShowOSKMWrapped(true);
    // }
    if (now.getDate() === 14 && now.getMonth() === 9) {
      setShowCoins(true);
    }
  }, [userCoinData]);

  if (isUserCoinLoading) {
    return <LoadingSpinnerCustom />;
  }

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (
    !session ||
    (session.user.role !== 'Peserta' && session.user.role !== 'ITB-X')
  ) {
    redirect('/login');
  } else if (session.user.role === 'ITB-X') {
    // TODO : CHANGE TO DASHBOARD LEMBAGA
    redirect('/test-cart');
  }

  return (
    <main className="flex min-h-screen w-screen max-w-md flex-col bg-[url('/images/home/background.png')] bg-cover bg-center bg-no-repeat">
      <div className="mb-5 mt-24 flex max-w-full flex-row justify-between gap-1 px-6">
        <MenuButton label="Assignment" variant="Assignment" />
        <MenuButton label="Merch" variant="Merch" />
        <MenuButton label="Chat" variant="Chat" />
        <MenuButton label="Leaderboard" variant="Leaderboard" />
      </div>
      {showCoins && (
        <div className="mx-6 flex items-center justify-center rounded-xl border-2 border-solid border-turquoise-100 bg-turquoise-100 p-1 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-turquoise-200/50">
          <div className="flex w-full flex-row justify-between">
            <div className="flex w-full flex-row">
              <Image
                src="/images/home/coin.png"
                width={62}
                height={62}
                alt="coin"
              />
              <h5 className="ml-2 mt-1 text-blue-600">
                {' '}
                Your coins <br />{' '}
                <p className="sh3 text-turquoise-400">9999999</p>
              </h5>
            </div>
            <div className="flex w-full items-center justify-end pr-4">
              <button
                className="flex justify-between rounded-[4px] bg-turquoise-400 px-5 py-2 text-shade-200 hover:bg-turquoise-300"
                onClick={() => router.push('/get-coins')}
              >
                <div className="flex flex-row gap-2">
                  <p className="text-b5">Get Coins</p>
                  <Image
                    src="/icons/chevron-right.svg"
                    width={16}
                    height={16}
                    alt="right"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
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
