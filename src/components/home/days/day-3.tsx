import Image from 'next/image';
import Day3Image from 'public/images/home/day-3-journey.png';
import Bubble2 from 'public/images/home/bubble2.png';

export interface JourneyDay3Props {
  handleClick: (eventDay: string) => void;
}
export const JourneyDay3 = ({ handleClick }: JourneyDay3Props) => {
  return (
    <div className="relative flex w-full h-[32vh]">
      <div className="absolute w-full flex flex-col items-center">
        <div className="relative w-full h-[56px]">
          <Image
            src={Bubble2}
            alt="Bubble2"
            width={150}
            height={120}
            className="absolute top-[-2rem] left-[120px]"
          />
        </div>
        <div className="relative w-full h-[116px] z-10">
          <Image
            src={Day3Image}
            alt="Day 3 Journey"
            width={247}
            height={194}
            onClick={() => handleClick('Day 3')}
            className="absolute top-[1rem] right-6"
          />
        </div>
      </div>
    </div>
  );
};
