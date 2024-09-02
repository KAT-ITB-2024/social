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
import { type Personality } from '~/types/enums/personality';
interface PersonalityResultProps {
  type: Personality;
}

export default function PersonalityResult({ type }: PersonalityResultProps) {
  const [saved, setSaved] = useState(false);
  const result = ResultsData.find((obj) => obj.type === type);
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const share_url = 'https://app.oskmitb.com/personality';
  const share_content = `Aku mendapatkan ${capitalizedType} di Tes Kepribadian OSKM! Kalau kalian dapat apa?\nAyo coba cek personality kalian di\n`;

  async function handleSave() {
    const link = document.createElement('a');
    link.href = `/images/personality/${type}_download.png`;
    link.download = `oskm-personality.png`;
    link.click();
    if (type === '') {
      return;
    }

    setSaved(true);
  }

  return (
    <div className="no-scrollbar mt-24 flex flex-col items-center overflow-y-auto px-9">
      <h2 className="mt-2 text-center text-xl">
        Yeay! we finally have the result of your test, so your personality is...
      </h2>
      <h1 className="mt-6 text-pink-400 text-shadow-pink-md">
        {capitalizedType}
      </h1>
      <Image
        src={`/images/personality/char-personality-${type}.png`}
        width={350}
        height={350}
        alt={type}
      />
      <h3 className="mt-2 text-center text-xl text-blue-500 text-shadow-white-sm">
        Let&rsquo;s check out what personalities does your character has!
      </h3>
      <div className="mt-3 flex w-full flex-col items-center rounded-xl bg-purple bg-opacity-75 px-6 py-5 text-center">
        <h1 className="text-2xl text-yellow text-shadow-neutral-sm">
          Personalities
        </h1>
        {result!.personality}
      </div>
      <Button
        className="my-5 w-[40%] rounded-lg bg-yellow py-7 text-xl font-medium text-purple shadow-orange-md"
        onClick={handleSave}
      >
        Save Result
      </Button>
      {saved && (
        <>
          <div className="fixed inset-0 z-10 bg-black opacity-65"></div>
          <div className="absolute left-1/2 top-1/2 z-20 flex w-[95%] translate-x-[-50%] translate-y-[-50%] flex-col items-center rounded-xl bg-lightYellow py-7">
            <div className="relative w-[90%]">
              <button className="absolute right-1 top-1">
                <Image
                  src={`/images/personality/cross.png`}
                  width={50}
                  height={50}
                  alt="cross"
                  onClick={() => {
                    setSaved(false);
                  }}
                ></Image>
              </button>
              <Image
                src={`/images/personality/${type}_download.png`}
                width={350}
                height={350}
                layout="responsive"
                alt={type}
              />
            </div>
            <h1 className="mt-5 text-3xl text-success-600">
              Successfully Saved!
            </h1>
            <h3 className="mt-1 text-xl text-green-950">
              Share to your socials!
            </h3>
            <div className="flex w-1/2 items-center justify-center gap-3">
              <Link href="https://www.instagram.com/">
                <div className="relative h-8 w-8">
                  {' '}
                  <Image
                    src="/images/personality/instagram.png"
                    layout="fill"
                    objectFit="contain"
                    alt="instagram-icon"
                  />
                </div>
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
