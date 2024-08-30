'use client';

import Day1Image from 'public/images/home/day-1-journey.png';
import Day2Image from 'public/images/home/day-2-journey.png';
import Day3Image from 'public/images/home/day-3-journey.png';
import Day4Image from 'public/images/home/day-4-journey.png';
import Image from 'next/image';
import Bubble1 from 'public/images/home/bubble1.png';
import Bubble2 from 'public/images/home/bubble2.png';
import Bubble3 from 'public/images/home/bubble3.png';
import { useRouter } from 'next/navigation';

export default function Journey() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full h-[108px] z-10">
        <Image
          src={Day1Image}
          alt="Day 1 Journey"
          width={247}
          height={194}
          onClick={() => router.push('')}
          className="absolute top-0 right-10"
        />
      </div>
      <div className="relative w-full h-[70px]">
        <Image
          src={Bubble1}
          alt="Bubble1"
          width={150}
          height={120}
          className="absolute top-0 left-28"
        />
      </div>
      <div className="relative w-full h-[166px] z-10">
        <Image
          src={Day2Image}
          alt="Day 2 Journey"
          width={247}
          height={194}
          onClick={() => router.push('')}
          className="absolute top-0 left-8"
        />
      </div>
      <div className="relative w-full h-[56px]">
        <Image
          src={Bubble2}
          alt="Bubble2"
          width={150}
          height={120}
          className="absolute top-0 left-[120px]"
        />
      </div>
      <div className="relative w-full h-[116px] z-10">
        <Image
          src={Day3Image}
          alt="Day 3 Journey"
          width={247}
          height={194}
          onClick={() => router.push('')}
          className="absolute top-0 right-6"
        />
      </div>
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
          onClick={() => router.push('')}
          className="absolute top-0 left-16"
        />
      </div>
    </div>
  );
}
