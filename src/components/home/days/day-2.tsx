import Image from 'next/image';
import Day2Image from 'public/images/home/day-2-journey.png';
import Bubble1 from 'public/images/home/bubble1.png';

export interface JourneyDay2Props {
  handleClick: (eventDay: string) => void;
}

export const JourneyDay2 = ({ handleClick }: JourneyDay2Props) => {
  return (
    <div className="relative flex h-[250px] w-full">
      <div className="absolute flex w-full flex-col items-center">
        <div className="relative h-[120px] w-full">
          <Image
            src={Bubble1}
            alt="Bubble1"
            width={150}
            height={120}
            className="absolute left-28 top-0"
          />
        </div>
        <div className="relative z-10 h-[194px] w-full">
          <Image
            src={Day2Image}
            alt="Day 2 Journey"
            width={247}
            height={194}
            onClick={() => handleClick('Day 2')}
            className="absolute left-4 top-[-3rem]"
          />
        </div>
      </div>
    </div>
  );
};
