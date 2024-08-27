import Image from 'next/image';
import { Button } from '../ui/button';
import { ResultsData } from './ResultsData';
import {
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { useState } from 'react';
interface MbtiResultProps {
  type: string;
}

export default function MbtiResult({ type }: MbtiResultProps) {
  const [saved, setSaved] = useState(false);
  const result = ResultsData.find((obj) => obj.type === type);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  function handleSave() {
    const link = document.createElement('a');
    link.href = `/images/mbti/${type}_download.png`;
    link.download = `oskm-mbti.png`;
    link.click();
    setSaved(true);
  }

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
        alt={type}
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
        {result!.personality}
      </div>
      <Button
        className="mt-5 text-purple bg-yellow rounded-lg text-xl w-[40%] py-7 font-medium shadow-orange-md"
        onClick={handleSave}
      >
        Save Result
      </Button>
      {saved && (
        <>
          <div className="fixed inset-0 bg-black opacity-65 z-10"></div>
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 bg-lightYellow translate-x-[-50%] translate-y-[-50%] w-[95%] py-7 rounded-xl z-20">
            <div className="relative w-[90%]">
              <button className="absolute right-1 top-1">
                <Image
                  src={`/images/mbti/cross.png`}
                  width={50}
                  height={50}
                  alt="cross"
                  onClick={() => {
                    setSaved(false);
                  }}
                ></Image>
              </button>
              <Image
                src={`/images/mbti/${type}_download.png`}
                width={350}
                height={350}
                layout="responsive"
                alt={type}
              />
            </div>
            <h1 className="text-3xl text-success-600 mt-5">
              Successfully Saved!
            </h1>
          </div>
        </>
      )}
    </div>
  );
}
