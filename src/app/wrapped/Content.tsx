import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { Share } from '~/components/share';

interface wrappedProps {
  name: string;
  jumlah_match: number | string;
  quest_num: number | string;
  fav_topics: string[];
  percent: number | string;
  test: boolean;
  character: string;
  mbti: string;
  mbti_desc: string;
  leaderboard_rank: number | string;
}

const WrappedStories = ({
  name,
  jumlah_match,
  quest_num,
  fav_topics,
  percent,
  test,
  character,
  mbti,
  mbti_desc,
  leaderboard_rank,
}: wrappedProps) => {
  const [file, setFile] = useState<File[]>();

  const handleShare = async (download: boolean) => {
    const element = document.getElementById('wrapped-summary');
    if (element) {
      await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        width: 448,
        height: 966,
        windowHeight: 966,
        y: -483,
      }).then((canvas) => {
        if (download) {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('png');
          link.download = 'Your Wrapped.png';
          link.click();
        } else {
          canvas.toBlob((blob) => {
            try {
              if (blob) {
                const img = new File([blob], 'Your Wrapped.png', {
                  type: blob.type,
                });
                setFile([img]);
              }
            } catch (error) {}
          });
        }
      });
    }
  };
  return [
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 1.png"
              alt="Wrapped 1"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/seahorse.svg"
              alt="Seahorse"
              width={250}
              height={350}
              className="absolute right-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/island.svg"
              alt="Island"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <p className="absolute left-[13%] w-3/4 pt-3 text-center font-heading text-7xl text-orange-100 blur-md">
              OSKM Wrapped
            </p>
            <p className="absolute left-[12.5%] w-3/4 text-center font-heading text-7xl text-blue-500">
              OSKM Wrapped
            </p>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 2.png"
              alt="Wrapped 2"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/jellyfish.svg"
              alt="Blue Jellyfish"
              width={250}
              height={350}
              className="absolute right-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/blue-reef.svg"
              alt="Blue Reefs"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-lightYellow">
                Kamu udah matching sebanyak
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-blue-500">
                {jumlah_match}
              </p>
              <p className="text-center font-heading text-2xl text-lightYellow">
                kali lho, selama OSKM!
              </p>
              <p className="text-md text-center font-subheading text-lightYellow">
                Banyak banget koneksi yang tercipta, keren!
              </p>
            </div>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 3.png"
              alt="Wrapped 3"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/algae.svg"
              alt="Algae"
              width={350}
              height={350}
              className="absolute right-0 top-[-30px]"
            />
            <Image
              src="/images/wrapped/svg/pink-reef.svg"
              alt="Pink Reef"
              width={340}
              height={340}
              className="absolute bottom-0 right-0"
            />
            <Image
              src="/images/wrapped/svg/small-reefs.svg"
              alt="Small Pink Reefs"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-purple">
                Selamat! Kamu telah berhasil menyelesaikan
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-pink-400">
                {quest_num}
              </p>
              <p className="text-center font-heading text-2xl text-purple">
                quest!
              </p>
              <p className="text-md text-center font-subheading text-lightYellow">
                Petualangan menantimu, dan kamu berhasil menaklukkannya!
              </p>
            </div>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 4.png"
              alt="Wrapped 4"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/michael-angelo.svg"
              alt="Sea Turtle"
              width={400}
              height={400}
              className="absolute left-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/yellow-reef.svg"
              alt="Yellow Reefs"
              width={350}
              height={350}
              className="absolute bottom-0 right-0"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-turquoise-400">
                Kamu sering banget ngobrolin
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-orange-400">
                {fav_topics[0]}
              </p>
              <p className="text-center font-heading text-2xl text-turquoise-400">
                sama temanmu.
              </p>
              <p className="text-md text-center font-subheading text-turquoise-400">
                Kayaknya kamu cinta {fav_topics[0]} banget, nih!
              </p>
            </div>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 5.png"
              alt="Wrapped 5"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/top-wave.svg"
              alt="Top Wave"
              width={500}
              height={500}
              className="absolute right-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/bottom-wave.svg"
              alt="Bottom Wave"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-blue-500">
                Kamu masuk top
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-pink-400">
                {percent}%
              </p>
              <p className="text-center font-heading text-2xl text-blue-500">
                peserta!
              </p>
              <p className="text-md text-center font-subheading text-blue-500">
                Juara sejati diantara teman-temanmu!
              </p>
            </div>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <>
            <Image
              src="/images/wrapped/background/Wrapped 6.png"
              alt="Wrapped 6"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/thin-jellyfish.svg"
              alt="Thin Jellyfish"
              width={350}
              height={350}
              className="absolute right-0 top-[-70px]"
            />
            <Image
              src="/images/wrapped/svg/sea-anemone.svg"
              alt="Sea Anemone"
              width={350}
              height={350}
              className="absolute bottom-0 right-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col items-center gap-2">
              <p className="text-center font-heading text-2xl text-pink-400">
                {test ? (
                  <>Kamu memiliki pribadi yang {mbti} seperti</>
                ) : (
                  <>Waduh! Kamu belum melakukan OSKM Personality Test :(</>
                )}
              </p>
              {test ? (
                <p className="pb-0.5 text-center font-heading text-5xl text-purple">
                  {character}
                </p>
              ) : null}
              <p className="text-md text-center font-subheading text-pink-400">
                {test ? (
                  <>{mbti_desc}</>
                ) : (
                  <>Kira-kira kamu akan mendapatkan karakter apa ya?👀</>
                )}
              </p>
              {test ? null : (
                <Button className="mt-2 w-1/2 bg-pink-400">
                  Periksa disini!
                </Button>
              )}
            </div>
          </>
        );
      },
    },
    {
      content: () => {
        return (
          <div id="wrapped-summary">
            <Image
              src="/images/wrapped/background/Wrapped 7.png"
              alt="Wrapped 7"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/bubble.svg"
              alt="Bubble"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <div className="absolute top-0 flex size-full items-center justify-center">
              <div className="flex h-full w-5/6 flex-col items-center justify-center gap-4">
                <p className="text-center font-heading text-xl text-blue-400">
                  {test ? (
                    <>
                      <span className="text-pink-400">{name}</span>, OSKM
                      Personality-mu adalah
                    </>
                  ) : (
                    <>Yuk, segera cek OSKM Personality-mu!</>
                  )}
                </p>
                <Image
                  src={
                    test
                      ? '/images/wrapped/svg/ray.svg'
                      : '/images/wrapped/svg/cancer.svg'
                  }
                  alt={test ? 'Ray' : 'Cancer'}
                  width={250}
                  height={250}
                />
                <p className="pb-0.5 text-center font-heading text-3xl text-error-600">
                  Sylas
                </p>
                <div className="items-between flex w-4/5 flex-col gap-4">
                  <div className="flex w-full gap-4">
                    <div className="flex w-3/5 flex-col">
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Top Topics
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        1.&ensp;{fav_topics[0]}
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        2. {fav_topics[1]}
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        3. {fav_topics[2]}
                      </p>
                    </div>
                    <div className="flex w-2/5 flex-col">
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Leaderboard Position
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        Rank {leaderboard_rank}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="flex w-3/5 flex-col">
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Matched Chat
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        {jumlah_match} times
                      </p>
                    </div>
                    <div className="flex w-2/5 flex-col">
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Quest Done
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        {quest_num} tasks
                      </p>
                    </div>
                  </div>
                </div>
                <div className="z-[1000] flex gap-2 pt-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(true)}
                  >
                    <Image
                      src="/icons/download.svg"
                      alt="Instagram"
                      width={32}
                      height={32}
                    />
                  </Button>
                  <Share
                    variant="ghost"
                    size="icon"
                    shareData={{ files: file }}
                    onInteraction={() => handleShare(false)}
                  >
                    <Image
                      src="/images/wrapped/svg/instagram.svg"
                      alt="Instagram"
                      width={32}
                      height={32}
                    />
                  </Share>
                  <Share
                    variant="ghost"
                    size="icon"
                    shareData={{ files: file }}
                    onInteraction={() => handleShare(false)}
                  >
                    <Image
                      src="/images/wrapped/svg/whatsapp.svg"
                      alt="Whatsapp"
                      width={32}
                      height={32}
                    />
                  </Share>
                  <Share
                    variant="ghost"
                    size="icon"
                    shareData={{ files: file }}
                    onInteraction={() => handleShare(false)}
                  >
                    <Image
                      src="/images/wrapped/svg/line.svg"
                      alt="Line"
                      width={32}
                      height={32}
                    />
                  </Share>
                  <Share
                    variant="ghost"
                    size="icon"
                    shareData={{ files: file }}
                    onInteraction={() => handleShare(false)}
                  >
                    <Image
                      src="/images/wrapped/svg/twitter.svg"
                      alt="Twitter (X)"
                      width={32}
                      height={32}
                    />
                  </Share>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
};

export { WrappedStories };
