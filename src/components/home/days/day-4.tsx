import Image from 'next/image';
import Day4Image from 'public/images/home/day-4-journey.png';

import Bubble3 from 'public/images/home/bubble3.png';

export interface JourneyDay4Props {
  handleClick: (eventDay: string) => void;
}

export const JourneyDay4 = ({ handleClick }: JourneyDay4Props) => {
  return (
    <>
      <div className="relative w-full h-6">
        <Image
          src={Bubble3}
          alt="Bubble3"
          width={150}
          height={120}
          className="absolute top-0 right-[50px]"
        />
      </div>
      <div className="relative w-full h-[300px] z-10">
        <Image
          src={Day4Image}
          alt="Day 4 Journey"
          width={247}
          height={194}
          onClick={() => handleClick('Day 4')}
          className="absolute top-0 left-16"
        />
      </div>
    </>
  );
};
