import Image from 'next/image';
import Day2Image from 'public/images/home/day-2-journey.png';
import Bubble1 from 'public/images/home/bubble1.png';

export const JourneyDay2 = () => {
  return (
    <div className="relative flex w-full h-[35vh]">
      <div className="absolute w-full flex flex-col items-center">
        <div className="relative w-full h-[120px]">
          <Image
            src={Bubble1}
            alt="Bubble1"
            width={150}
            height={120}
            className="absolute top-0 left-28"
          />
        </div>
        <div className="relative w-full h-[194px] z-10">
          <Image
            src={Day2Image}
            alt="Day 2 Journey"
            width={247}
            height={194}
            // onClick={() => router.push('')}
            className="absolute top-[-3rem] left-8"
          />
        </div>
      </div>
    </div>
  );
};
