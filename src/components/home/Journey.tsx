import Day1Image from 'public/components/day_1_journey.png';
import Day2Image from 'public/components/day_2_journey.png';
import Day3Image from 'public/components/day_3_journey.png';
import Day4Image from 'public/components/day_4_journey.png';
import Image from 'next/image';
import Bubble1 from 'public/components/bubble1.png';
import Bubble2 from 'public/components/bubble2.png';
import Bubble3 from 'public/components/bubble3.png';

export default function Journey() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full h-80">
        <Image
          src={Day1Image}
          alt="Day 1 Journey"
          width={247}
          height={194}
          className="absolute top-0 right-10"
        />
      </div>
      <div className="relative w-full h-20">
        <Image
          src={Bubble1}
          alt="Bubble1"
          width={150}
          height={120}
          className="absolute top-0 left-10"
        />
      </div>
      <div className="relative w-full h-80">
        <Image
          src={Day2Image}
          alt="Day 2 Journey"
          width={247}
          height={194}
          className="absolute top-0 left-10"
        />
      </div>
      <div className="relative w-full h-20">
        <Image
          src={Bubble2}
          alt="Bubble2"
          width={150}
          height={120}
          className="absolute top-0 right-10"
        />
      </div>
      <div className="relative w-full h-80">
        <Image
          src={Day3Image}
          alt="Day 3 Journey"
          width={247}
          height={194}
          className="absolute top-0 right-10"
        />
      </div>
      <div className="relative w-full h-20">
        <Image
          src={Bubble3}
          alt="Bubble3"
          width={150}
          height={120}
          className="absolute top-0 left-10"
        />
      </div>
      <div className="relative w-full h-80">
        <Image
          src={Day4Image}
          alt="Day 4 Journey"
          width={247}
          height={194}
          className="absolute top-0 left-10"
        />
      </div>
    </div>
  );
}
