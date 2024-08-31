'use client';

import Day1Image from 'public/images/home/day-1-journey.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import { JourneyDay2 } from './days/day-2';
import { JourneyDay3 } from './days/day-3';
import { JourneyDay4 } from './days/day-4';

export default function Journey() {
  const router = useRouter();
  const days = api.map.getDays.useQuery();
  if (days.isLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className="relative w-full h-[194px]">
        <div className="absolute w-full top-0 flex flex-col items-center h-full">
          <div className="relative w-full h-[194px] z-10">
            <Image
              src={Day1Image}
              alt="Day 1 Journey"
              width={247}
              height={194}
              onClick={() => router.push('')}
              className="absolute top-0 right-10"
            />
          </div>
        </div>
      </div>

      {days.data &&
        days.data.length > 0 &&
        days.data.map((day) => {
          if (day.day === 'Day 2') {
            return <JourneyDay2 key={day.id} />;
          }
          if (day.day === 'Day 3') {
            return <JourneyDay3 key={day.id} />;
          }
          // if (day.day === 'Day 4') {
          //   return <JourneyDay4 key={day.id} />;
          // }
        })}
      <JourneyDay4 />
    </div>
  );
}
