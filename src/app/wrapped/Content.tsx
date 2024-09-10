import Image from 'next/image';
import html2canvas from 'html2canvas';
import { Button } from '~/components/ui/button';
import React from 'react';
import { Share2, Download } from 'lucide-react';
import { type OSKMWrapped } from '~/types/payloads/wrapped';

interface WrappedStoriesProps {
  oskmWrapped: OSKMWrapped;
  handleImage: (param: File) => void;
  handleBack: () => void;
}

const WrappedStories = ({
  oskmWrapped,
  handleImage,
  handleBack,
}: WrappedStoriesProps) => {
  const handleFile = async (download: boolean) => {
    const element = document.getElementById('wrapped-summary');
    if (element) {
      await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        width: 448,
        height: 796,
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
                handleImage(img);
              }
            } catch (error) {
              const link = document.createElement('a');
              link.href = canvas.toDataURL('png');
              link.download = 'Your Wrapped.png';
              link.click();
            }
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
              alt="Wrapped 2"
              fill={true}
              className="absolute"
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6 h-auto"
            />
            <Image
              src="/images/wrapped/svg/seahorse.svg"
              alt="Seahorse"
              width={250}
              height={350}
              loading="eager"
              className="absolute right-0 top-[-60px] w-auto"
            />
            <Image
              src="/images/wrapped/svg/island.svg"
              alt="Island"
              width={500}
              height={500}
              loading="eager"
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
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/jellyfish.svg"
              alt="Blue Jellyfish"
              width={250}
              height={350}
              loading="eager"
              className="absolute right-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/blue-reef.svg"
              alt="Blue Reefs"
              width={400}
              height={400}
              loading="eager"
              className="absolute bottom-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-lightYellow">
                Kamu udah matching sebanyak
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-blue-500">
                {oskmWrapped.totalMatch}
              </p>
              <p className="text-center font-heading text-2xl text-lightYellow">
                kali lho, selama OSKM!
              </p>
              <p className="text-md text-center font-subheading text-lightYellow">
                Banyak banget koneksi yang tercipta. Keren!
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
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/algae.svg"
              alt="Algae"
              width={300}
              height={300}
              loading="eager"
              className="absolute right-0 top-[-30px]"
            />
            <Image
              src="/images/wrapped/svg/pink-reef.svg"
              alt="Pink Reef"
              width={300}
              height={300}
              loading="eager"
              className="absolute bottom-0 right-0"
            />
            <Image
              src="/images/wrapped/svg/small-reefs.svg"
              alt="Small Pink Reefs"
              width={450}
              height={450}
              loading="eager"
              className="absolute bottom-0"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-purple">
                Selamat! Kamu telah berhasil menyelesaikan
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-pink-400">
                {oskmWrapped.submittedQuest}
              </p>
              <p className="text-center font-heading text-2xl text-purple">
                quest!
              </p>
              <p className="text-md text-center font-subheading text-pink-400">
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
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/michael-angelo.svg"
              alt="Sea Turtle"
              width={400}
              height={400}
              loading="eager"
              className="absolute left-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/yellow-reef.svg"
              alt="Yellow Reefs"
              width={350}
              height={350}
              loading="eager"
              className="absolute bottom-0 right-0"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6"
            />
            <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
              <p className="text-center font-heading text-2xl text-turquoise-400">
                Kamu sering banget ngobrolin
              </p>
              <p className="pb-0.5 text-center font-heading text-5xl text-orange-400">
                {oskmWrapped.favTopics[0]}
              </p>
              <p className="text-center font-heading text-2xl text-turquoise-400">
                sama temanmu.
              </p>
              {/* countMostFav Here */}
              <p className="text-md text-center font-subheading text-turquoise-400">
                Kamu obrolin topik ini sebanyak 10 kali! Kayaknya kamu cinta{' '}
                {oskmWrapped.favTopics[0]} banget, nih!
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
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/top-wave.svg"
              alt="Top Wave"
              width={500}
              height={500}
              loading="eager"
              className="absolute right-0 top-[-60px]"
            />
            <Image
              src="/images/wrapped/svg/bottom-wave.svg"
              alt="Bottom Wave"
              width={500}
              height={500}
              loading="eager"
              className="absolute bottom-0"
            />
            {oskmWrapped.rank === 1 ? (
              <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
                <p className="text-center font-heading text-2xl text-blue-500">
                  Juara 1 OSKM ITB 2024
                </p>

                <p className="text-md text-center font-subheading text-blue-500">
                  Selamat, kelompok kalian berhasil menjadi juara 1 di OSKM ITB
                  2024!
                </p>
              </div>
            ) : (
              <div className="absolute left-[12.5%] flex w-3/4 flex-col gap-2">
                <p className="text-center font-heading text-2xl text-blue-500">
                  Kamu masuk top
                </p>
                <p className="pb-0.5 text-center font-heading text-5xl text-pink-400">
                  {oskmWrapped.rankPercentage}%
                </p>
                <p className="text-center font-heading text-2xl text-blue-500">
                  peserta!
                </p>
                <p className="text-md text-center font-subheading text-blue-500">
                  Juara sejati diantara teman-temanmu!
                </p>
              </div>
            )}
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
              loading="eager"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              alt="Logo"
              width={96}
              height={50}
              loading="eager"
              className="absolute left-3 top-6"
            />
            <Image
              src="/images/wrapped/svg/thin-jellyfish.svg"
              alt="Thin Jellyfish"
              width={350}
              height={350}
              loading="eager"
              className="absolute right-0 top-[-70px]"
            />
            <Image
              src="/images/wrapped/svg/sea-anemone.svg"
              alt="Sea Anemone"
              width={350}
              height={350}
              loading="eager"
              className="absolute bottom-0 right-0"
            />
            <div className="absolute left-[12.5%] z-[1000] flex w-3/4 flex-col items-center gap-2 rounded-xl bg-white/40 py-5">
              <p className="text-center font-heading text-2xl text-pink-400">
                {oskmWrapped.test ? (
                  <>Kamu memiliki pribadi yang seperti</>
                ) : (
                  <>Waduh! Kamu belum melakukan OSKM Personality Test :(</>
                )}
              </p>
              {oskmWrapped.test && (
                <p className="pb-4 pt-2 text-center font-heading text-5xl text-purple">
                  {oskmWrapped.character.charAt(0).toUpperCase() +
                    oskmWrapped.character.slice(1)}
                </p>
              )}
              <p className="text-md text-center font-subheading text-pink-400">
                {oskmWrapped.test ? (
                  <>{oskmWrapped.personalityDesc}</>
                ) : (
                  <>Kira-kira kamu akan mendapatkan karakter apa ya?👀</>
                )}
              </p>
              {oskmWrapped.test ? null : (
                <Button
                  className="z-[1000] mt-2 w-1/2 bg-pink-400"
                  onClick={() => handleBack()}
                >
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
          <div>
            <div
              id="wrapped-summary"
              className="absolute top-0 h-[796px] w-[448px]"
            >
              <Image
                src="/images/wrapped/background/Wrapped 7.png"
                alt="Wrapped 7"
                loading="eager"
                fill={true}
                className="absolute"
              />
              <Image
                src="/images/wrapped/svg/bubble.svg"
                loading="eager"
                alt="Bubble"
                width={1000}
                height={1000}
                className="absolute bottom-5"
              />
              <div className="absolute bottom-0 flex w-full flex-row items-center justify-between px-6 py-4">
                <div className="w-2/5">
                  <Image
                    src="/images/wrapped/logo-oskm.svg"
                    alt="OSKM ITB 2024"
                    width={87}
                    height={30}
                    className="h-full w-auto"
                  />
                </div>
                <p className="mb-4 text-blue-500">app.oskmitb.com/wrapped</p>
              </div>
              <div className="absolute top-0 flex size-full flex-col items-center justify-center pb-24">
                <div className="flex h-full w-5/6 flex-col items-center justify-center gap-4">
                  <p className="pb-12 text-center font-heading text-5xl text-blue-500 drop-shadow-orange-shadow">
                    OSKM Wrapped
                  </p>
                  <p className="text-center font-heading text-xl text-blue-400">
                    {oskmWrapped.test ? (
                      <>
                        <span className="text-blue-500">
                          {oskmWrapped.name}
                        </span>
                        , OSKM Personality-mu adalah
                      </>
                    ) : (
                      <>Yuk, segera cek OSKM Personality-mu!</>
                    )}
                  </p>
                  <Image
                    src={
                      oskmWrapped.test
                        ? `/images/characters/${oskmWrapped.character}.png`
                        : '/images/wrapped/svg/cancer.svg'
                    }
                    alt="OSKM Character"
                    width={250}
                    height={250}
                    loading="eager"
                  />
                  {oskmWrapped.test && (
                    <p className="pb-0.5 text-center font-heading text-3xl text-blue-500">
                      {oskmWrapped.character.charAt(0).toUpperCase() +
                        oskmWrapped.character.slice(1)}
                    </p>
                  )}
                  <div
                    className={`flex ${oskmWrapped.favTopics.length > 0 || oskmWrapped.totalMatch > 0 ? 'items-between w-4/5 flex-col' : 'w-2/3 flex-row justify-between'} gap-4`}
                  >
                    <div className="flex w-full gap-4">
                      {oskmWrapped.favTopics.length > 0 && (
                        <div className="flex w-3/5 flex-col">
                          <p className="font-heading text-lg leading-5 text-blue-400">
                            Top Topics
                          </p>
                          {oskmWrapped.favTopics
                            .slice(0, 3)
                            .map((value, idx) => (
                              <p
                                key={idx}
                                className="font-subheading text-xl font-bold text-blue-500"
                              >
                                {idx + 1}. {value}
                              </p>
                            ))}
                        </div>
                      )}
                      <div
                        className={`flex ${oskmWrapped.favTopics.length > 0 ? 'w-2/5' : 'w-full'} flex-col`}
                      >
                        <p className="font-heading text-lg leading-5 text-blue-400">
                          Leaderboard Position
                        </p>
                        <p className="font-subheading text-xl font-bold text-blue-500">
                          Rank {oskmWrapped.rank}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full gap-4">
                      {oskmWrapped.totalMatch > 0 && (
                        <div className="flex w-3/5 flex-col">
                          <p className="font-heading text-lg leading-5 text-blue-400">
                            Matched Chat
                          </p>
                          <p className="font-subheading text-xl font-bold text-blue-500">
                            {oskmWrapped.totalMatch} times
                          </p>
                        </div>
                      )}
                      <div
                        className={`flex ${oskmWrapped.totalMatch > 0 ? 'w-2/5' : 'w-fit pl-4'} flex-col`}
                      >
                        <p className="font-heading text-lg leading-5 text-blue-400">
                          Quest Done
                        </p>
                        <p className="font-subheading text-xl font-bold text-blue-500">
                          {oskmWrapped.submittedQuest} tasks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src="/images/wrapped/background/Wrapped 7.png"
              alt="Wrapped 7"
              loading="eager"
              fill={true}
              className="absolute"
            />
            <Image
              src="/images/wrapped/svg/bubble.svg"
              loading="eager"
              alt="Bubble"
              width={500}
              height={500}
              className="absolute bottom-0 h-auto w-screen"
            />
            <Image
              src="/images/wrapped/svg/logo.svg"
              loading="eager"
              alt="Logo"
              width={96}
              height={50}
              className="absolute left-3 top-6"
            />
            <div className="absolute top-0 flex size-full items-center justify-center">
              <div className="flex h-full w-5/6 flex-col items-center justify-center gap-4">
                <p className="text-center font-heading text-xl text-blue-400">
                  {oskmWrapped.test ? (
                    <>
                      <span className="text-blue-500">{oskmWrapped.name}</span>,
                      OSKM Personality-mu adalah
                    </>
                  ) : (
                    <>Yuk, segera cek OSKM Personality-mu!</>
                  )}
                </p>
                <Image
                  src={
                    oskmWrapped.test
                      ? `/images/characters/${oskmWrapped.character}.png`
                      : '/images/wrapped/svg/cancer.svg'
                  }
                  alt="OSKM Character"
                  width={250}
                  height={250}
                  loading="eager"
                />
                {oskmWrapped.test && (
                  <p className="pb-0.5 text-center font-heading text-3xl text-blue-500">
                    {oskmWrapped.personality.charAt(0).toUpperCase() +
                      oskmWrapped.personality.slice(1)}
                  </p>
                )}
                <div
                  className={`flex ${oskmWrapped.favTopics.length > 0 || oskmWrapped.totalMatch > 0 ? 'items-between w-4/5 flex-col' : 'w-2/3 flex-row justify-between'} gap-4`}
                >
                  <div className="flex w-full gap-4">
                    {oskmWrapped.favTopics.length > 0 && (
                      <div className="flex w-3/5 flex-col">
                        <p className="font-heading text-lg leading-5 text-blue-400">
                          Top Topics
                        </p>
                        {oskmWrapped.favTopics.slice(0, 3).map((value, idx) => (
                          <p
                            key={idx}
                            className="font-subheading text-xl font-bold text-blue-500"
                          >
                            {idx + 1}. {value}
                          </p>
                        ))}
                      </div>
                    )}
                    <div
                      className={`flex ${oskmWrapped.favTopics.length > 0 ? 'w-2/5' : 'w-full'} flex-col`}
                    >
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Leaderboard Position
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        Rank {oskmWrapped.rank}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full gap-4">
                    {oskmWrapped.totalMatch > 0 && (
                      <div className="flex w-3/5 flex-col">
                        <p className="font-heading text-lg leading-5 text-blue-400">
                          Matched Chat
                        </p>
                        <p className="font-subheading text-xl font-bold text-blue-500">
                          {oskmWrapped.totalMatch} times
                        </p>
                      </div>
                    )}
                    <div
                      className={`flex ${oskmWrapped.totalMatch > 0 ? 'w-2/5' : 'w-fit pl-3.5'} flex-col`}
                    >
                      <p className="font-heading text-lg leading-5 text-blue-400">
                        Quest Done
                      </p>
                      <p className="font-subheading text-xl font-bold text-blue-500">
                        {oskmWrapped.submittedQuest} tasks
                      </p>
                    </div>
                  </div>
                </div>
                <div className="z-[1000] flex gap-2 pt-6 font-heading text-white">
                  <Button
                    onClick={() => handleFile(true)}
                    className="bg-blue-300"
                  >
                    <Download color="#fff" strokeWidth={3} className="pr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={() => handleFile(false)}
                    className="bg-blue-300"
                  >
                    <Share2 color="#fff" strokeWidth={3} className="pr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      },
      duration: 20000,
    },
  ];
};

export { WrappedStories };
