import Image from 'next/image';
import { Button } from '../ui/button';
import { ResultsData } from './ResultsData';
import { InstapaperShareButton } from 'react-share';
interface MbtiResultProps {
  type: string;
}

export default function MbtiResult({ type }: MbtiResultProps) {
  const result = ResultsData.find((obj) => obj.type === type);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div className="px-9 flex flex-col items-center mt-24">
      <h2 className="text-center text-xl mt-4">
        Yeay! we finally have the result of your test, so your MBTI is...
      </h2>
      <h1 className="text-pink-400 text-shadow-pink-md mt-6">
        {capitalizedType}
      </h1>
      <Image
        src={`/images/mbti/char-mbti-${type}.png`}
        width={350}
        height={350}
        alt="Mova"
      />
      <h3 className="text-blue-500 text-center text-xl text-shadow-white-sm mt-2">
        Let&rsquo;s check out what personalities does your character has!
      </h3>
      <div
        className="mt-3 bg-purple bg-opacity-75 py-5 px-6 text-center rounded-xl flex flex-col 
      items-center w-full overflow-y-auto h-44 no-scrollbar"
      >
        <h1 className="text-2xl text-yellow text-shadow-neutral-sm">
          Personalities
        </h1>
        <p className="font-body w-5/6 text-white mt-1">{result!.personality}</p>
      </div>
      <Button className="mt-5 text-purple bg-yellow rounded-lg text-xl w-[40%] py-7 hover:bg-lightYellow font-medium shadow-orange-md">
        Save Result
      </Button>
    </div>
  );
}
