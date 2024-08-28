import Image from 'next/image';
import { Share } from '~/components/Share';

interface wrappedProps {
  jumlah_match: number | string;
  quest_num: number | string;
  fav_topic: string;
  percent: number | string;
  mbti: string;
  mbti_desc: string;
  jam: number | string;
}

const WrappedStories = ({
  jumlah_match,
  quest_num,
  fav_topic,
  percent,
  mbti,
  mbti_desc,
  jam,
}: wrappedProps) => {
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
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-lightYellow">
                Kamu udah matching sebanyak
              </p>
              <p className="text-center font-heading text-5xl text-blue-500 pb-0.5">
                {jumlah_match}
              </p>
              <p className="text-center font-heading text-2xl text-lightYellow">
                kali lho, selama OSKM!
              </p>
              <p className="text-center font-subheading text-md text-lightYellow">
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
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-purple">
                Selamat! Kamu telah berhasil menyelesaikan
              </p>
              <p className="text-center font-heading text-5xl text-pink-400 pb-0.5">
                {quest_num}
              </p>
              <p className="text-center font-heading text-2xl text-purple">
                quest!
              </p>
              <p className="text-center font-subheading text-md text-lightYellow">
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
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-turquoise-400">
                Kamu sering banget ngobrolin
              </p>
              <p className="text-center font-heading text-5xl text-orange-400 pb-0.5">
                {fav_topic}
              </p>
              <p className="text-center font-heading text-2xl text-turquoise-400">
                sama temanmu.
              </p>
              <p className="text-center font-subheading text-md text-turquoise-400">
                Kayaknya kamu cinta {fav_topic} banget, nih!
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
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-blue-500">
                Kamu masuk top
              </p>
              <p className="text-center font-heading text-5xl text-pink-400 pb-0.5">
                {percent}%
              </p>
              <p className="text-center font-heading text-2xl text-blue-500">
                peserta!
              </p>
              <p className="text-center font-subheading text-md text-blue-500">
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
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-pink-400">
                MBTI kamu di OSKM adalah
              </p>
              <p className="text-center font-heading text-5xl text-purple pb-0.5">
                {mbti}
              </p>
              <p className="text-center font-subheading text-md text-pink-400">
                {mbti_desc}
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
              src="/images/wrapped/background/Wrapped 7.png"
              alt="Wrapped 7"
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
              src="/images/wrapped/svg/cancer.svg"
              alt="Cancer"
              width={500}
              height={500}
              className="absolute bottom-0"
            />
            <Image
              src="/images/wrapped/svg/bubble.svg"
              alt="Bubble"
              width={500}
              height={500}
              className="absolute self-center bottom-35"
            />
            <div className="flex flex-col absolute w-3/4 left-[12.5%] gap-2">
              <p className="text-center font-heading text-2xl text-turquoise-500">
                Tanpa disadari, kamu telah menghabiskan
              </p>
              <p className="text-center font-heading text-5xl text-error-600 pb-0.5">
                {jam}
              </p>
              <p className="text-center font-heading text-2xl text-turquoise-500">
                jam di website OSKM, lho!
              </p>
              <p className="text-center font-subheading text-md text-turquoise-500">
                Dedikasi yang luar biasa!
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
            <p className="absolute left-[13%] w-3/4 pt-3 text-center font-heading text-6xl text-orange-100 blur-md">
              Share Your Wrapped!
            </p>
            <p className="absolute left-[12.5%] w-3/4 text-center font-heading text-6xl text-blue-500">
              Share Your Wrapped!
            </p>
            <div className="absolute left-[12.5%] bottom-[35%] w-3/4 text-center font-heading z-[1000]">
              <Share
                shareData={{
                  title: 'Share',
                  text: 'Share message',
                  url: 'https://www.brannen.dev',
                }}
              >
                <span>Share</span>
              </Share>
            </div>
          </>
        );
      },
    },
  ];
};

export { WrappedStories };
