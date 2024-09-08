import Image from 'next/image';
import Day4Image from 'public/images/home/day-4-journey.png';

import Bubble3 from 'public/images/home/bubble3.png';

export interface JourneyDay4Props {
  handleClick: (eventDay: string) => void;
}

export const JourneyDay4 = ({ handleClick }: JourneyDay4Props) => {
  return (
    <>
      <div className="h-8" />
      <div className="relative h-8 w-full">
        <Image
          src={Bubble3}
          alt="Bubble3"
          width={150}
          height={120}
          className="absolute right-[50px] top-[-1rem]"
        />
      </div>
      <div className="relative z-10 h-[200px] w-full">
        <Image
          src={Day4Image}
          alt="Day 4 Journey"
          width={247}
          height={194}
          onClick={() => handleClick('Day 4')}
          className="absolute left-4 top-0"
        />
      </div>
    </>
  );
};
