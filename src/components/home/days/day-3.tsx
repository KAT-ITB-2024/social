import Image from 'next/image';
import Day3Image from 'public/images/home/day-3-journey.png';
import Bubble2 from 'public/images/home/bubble2.png';

export interface JourneyDay3Props {
  handleClick: (eventDay: string) => void;
}
export const JourneyDay3 = ({ handleClick }: JourneyDay3Props) => {
  return (
    <div className="relative flex h-[220px] w-full">
      <div className="absolute flex w-full flex-col items-center">
        <div className="relative h-[56px] w-full">
          <Image
            src={Bubble2}
            alt="Bubble2"
            width={150}
            height={120}
            className="absolute left-[120px] top-0"
          />
        </div>
        <div className="relative z-10 h-[116px] w-full">
          <Image
            src={Day3Image}
            alt="Day 3 Journey"
            width={247}
            height={194}
            onClick={() => handleClick('Day 3')}
            className="absolute right-3 top-[1rem]"
          />
        </div>
      </div>
    </div>
  );
};
