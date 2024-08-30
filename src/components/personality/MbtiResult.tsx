import Image from 'next/image';
import { Button } from '../ui/button';
import { ResultsData } from './ResultsData';
import Link from 'next/link';
import {
  LineShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineIcon,
  WhatsappIcon,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { useState } from 'react';
interface MbtiResultProps {
  type: string;
}

export default function MbtiResult({ type }: MbtiResultProps) {
  const [saved, setSaved] = useState(false);
  const result = ResultsData.find((obj) => obj.type === type);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const share_url = 'app.oskmitb.com/personality';
  const share_content = `Aku mendapatkan ${capitalizedType} di Tes Kepribadian OSKM! Kalau kalian dapat apa?\nAyo coba cek personality kalian di\n`;
  function handleSave() {
    const link = document.createElement('a');
    link.href = `/images/mbti/${type}_download.png`;
    link.download = `oskm-mbti.png`;
    link.click();
    setSaved(true);
  }

  return (
    <div className="px-9 flex flex-col items-center mt-24 overflow-y-auto no-scrollbar">
      <h2 className="text-center text-xl mt-2">
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
      items-center w-full"
      >
        <h1 className="text-2xl text-yellow text-shadow-neutral-sm">
          Personalities
        </h1>
        {result!.personality}
      </div>
      <Button
        className="my-5 text-purple bg-yellow rounded-lg text-xl w-[40%] py-7 font-medium shadow-orange-md"
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
            <h3 className="mt-1 text-xl text-green-950">
              Share to your socials!
            </h3>
            <div className="flex justify-center gap-3 items-center w-1/2">
              <Link href={'https://www.instagram.com/'}>
                <Image
                  src={'/images/mbti/instagram.png'}
                  width={32}
                  height={32}
                  alt="instagram-icon"
                />
              </Link>
              <WhatsappShareButton url={share_url} title={share_content}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton url={share_url} title={share_content}>
                <XIcon size={32} round />
              </TwitterShareButton>
              <TelegramShareButton url={share_url} title={share_content}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <LineShareButton url={share_url} title={share_content}>
                <LineIcon size={32} round />
              </LineShareButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
