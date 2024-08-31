'use client';
// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import MenuButton from '@/components/home/MenuButton';
import Image from 'next/image';
import Journey from '~/components/home/Journey';
import ButtonOskmWrap from '~/components/home/ButtonOSKMWrap';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getCurrentWIBTime } from '~/server/api/helpers/utils';
import { api } from '~/trpc/react';

export default function Home() {
  const [showCoins, setShowCoins] = useState(false);
  const [showOSKMJourney, setShowOSKMJourney] = useState(false);

  const { data: lastDay, isLoading } = api.map.getLastDays.useQuery();

  useEffect(() => {
    if (isLoading) return; // Pastikan untuk tidak melakukan apapun sampai loading selesai

    const now = getCurrentWIBTime();

    if (lastDay && now.getDay() === lastDay.eventDate.getDay()) {
      setShowOSKMJourney(true);
    }
  }, [isLoading, lastDay]);

  return (
    <main className="flex w-screen max-w-md min-h-screen flex-col bg-[url('/images/home/Background.png')] bg-center bg-no-repeat bg-cover">
      <div className="flex flex-row mb-5 max-w-full justify-center">
        <MenuButton label="Assignment" variant="Assignment" />
        <MenuButton label="Attendance" variant="Attendance" />
        <MenuButton label="Chat" variant="Chat" />
        <MenuButton label="Leaderboard" variant="Leaderboard" />
      </div>
      {showCoins && (
        <div className="flex container border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-turquoise-200/50 bg-turquoise-100 rounded-xl w-96 p-1">
          <div className="flex flex-row w-full">
            <Image
              src="/components/coin.png"
              className="w-16 h-auto"
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
        </div>
      )}
      {showOSKMJourney && <ButtonOskmWrap />}

      <div className="w-full justify-center items-center flex">
        <h3 className="text-h3 text-blue-600 text-shadow-pink-md">
          OSKM Journey
        </h3>
      </div>

      <Journey />
    </main>
  );
}
