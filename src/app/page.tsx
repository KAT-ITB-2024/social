'use client';
// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import MenuButton from '@/components/home/MenuButton';
import Image from 'next/image';
import Journey from '~/components/home/Journey';
import ButtonOskmWrap from '~/components/home/ButtonOSKMWrap';
import { useEffect, useState } from 'react';
import { getCurrentWIBTime } from '~/server/api/helpers/utils';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

export default function Home() {
  const { data: session, status } = useSession();
  const [showCoins, setShowCoins] = useState(false);
  const [showOSKMWrapped, setShowOSKMWrapped] = useState(false);
  const router = useRouter();

  // TODO: SET OSKM WRAPPED NAME

  useEffect(() => {
    const now = getCurrentWIBTime();

    if (now.getDate() === 7 && now.getMonth() === 9) {
      setShowOSKMWrapped(true);
    }
    if (now.getDate() === 14 && now.getMonth() === 9) {
      setShowCoins(true);
    }
  }, []);

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }

  return (
    <main className="flex w-screen max-w-md min-h-screen flex-col bg-[url('/images/home/background.png')] bg-center bg-no-repeat bg-cover">
      <div className="flex flex-row mb-5 max-w-full justify-between mt-24 gap-1 px-6">
        <MenuButton label="Assignment" variant="Assignment" />
        <MenuButton label="Attendance" variant="Attendance" />
        <MenuButton label="Chat" variant="Chat" />
        <MenuButton label="Leaderboard" variant="Leaderboard" />
      </div>
      {showCoins && (
        <div className="flex justify-center items-center border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-turquoise-200/50 bg-turquoise-100 rounded-xl mx-6 p-1">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row w-full">
              <Image
                src="/images/home/coin.png"
                width={62}
                height={62}
                alt="coin"
              />
              <h5 className=" ml-2 mt-1 text-blue-600">
                {' '}
                Your coins <br />{' '}
                <p className="sh3 text-turquoise-400">9999999</p>
              </h5>
            </div>
            <div className="flex items-center w-full pr-4 justify-end">
              <button
                className="bg-turquoise-400 text-shade-200 hover:bg-turquoise-300 rounded-[4px] px-5 py-2 flex justify-between"
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
      {showOSKMWrapped && <ButtonOskmWrap />}

      <div className="w-full justify-center items-center flex">
        <h3 className="text-h3 text-blue-600 text-shadow-pink-md">
          OSKM Journey
        </h3>
      </div>

      <Journey />
    </main>
  );
}
