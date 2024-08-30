import Image from 'next/image';
import Day4Image from 'public/images/home/day-4-journey.png';

import Bubble3 from 'public/images/home/bubble3.png';

export const JourneyDay4 = () => {
  return (
    <>
      <div className="relative w-full h-8">
        <Image
          src={Bubble3}
          alt="Bubble3"
          width={150}
          height={120}
          className="absolute top-0 right-[50px]"
        />
      </div>
      <div className="relative w-full h-80 z-10">
        <Image
          src={Day4Image}
          alt="Day 4 Journey"
          width={247}
          height={194}
          // onClick={() => router.push('')}
          className="absolute top-0 left-16"
        />
      </div>
    </>
  );
};
