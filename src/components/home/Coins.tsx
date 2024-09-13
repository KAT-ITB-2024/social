'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';

const Coins = () => {
  const router = useRouter();
  const [userCoin, setUserCoin] = useState<number>(0);

  const { data: userCoinData, isLoading: isUserCoinLoading } =
    api.profile.getUserCoin.useQuery();

  useEffect(() => {
    if (userCoinData) {
      setUserCoin(userCoinData.coins ? userCoinData.coins : 0);
    }
  }, [userCoinData]);

  if (isUserCoinLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="mx-6 mb-2 flex items-center justify-center rounded-xl border-2 border-solid border-turquoise-100 bg-turquoise-100 p-1 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-turquoise-200/50">
      <div className="flex w-full flex-row justify-between">
        <div className="flex w-full flex-row">
          <Image
            src="/images/home/coin.png"
            width={62}
            height={62}
            alt="coin"
          />
          <h5 className="ml-2 mt-1 text-blue-600">
            Your coins <br />{' '}
            <p className="text-xl text-turquoise-400">{userCoin}</p>
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
  );
};

export default Coins;
