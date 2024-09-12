import Image from 'next/image';

import media from 'public/images/kunjungan/UKM/media.png';
import senbud from 'public/images/kunjungan/UKM/senbud.png';
import orkes from 'public/images/kunjungan/UKM/orkes.png';
import kajian from 'public/images/kunjungan/UKM/kajian.png';
import agama from 'public/images/kunjungan/UKM/agama.png';
import media2 from 'public/images/kunjungan/UKM/media2.png';
import pusat from 'public/images/kunjungan/UKM/pusat.png';

import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';
import bgbr from 'public/images/kunjungan/UKM/bg-br.png';
import Link from 'next/link';

const KunjunganUKMPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={bgtl}
        alt="bg-tl"
        className="absolute left-0 top-0 z-20 w-[35%]"
      />
      <Image
        src={bgtr}
        alt="bg-tr"
        className="absolute right-0 top-[4vh] z-20 w-[25%]"
      />
      <Image
        src={bgbl}
        alt="bg-bl"
        className="absolute bottom-0 left-0 z-20 w-[80%]"
      />
      <Image
        src={bgbr}
        alt="bg-br"
        className="absolute bottom-0 right-0 z-20 w-[70%]"
      />

      <div
        className="flex min-h-screen w-full max-w-[450px] flex-col bg-transparent p-0 py-24"
        style={{
          backgroundImage: "url('/images/kunjungan/bg-main.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="relative z-30 flex w-full flex-col items-center gap-6 p-10">
          <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
            Rumpun UKM
          </h3>
          <div className="grid grid-cols-3 place-items-start">
            <Link
              href={`/kunjungan/UKM/Media`}
              className="flex w-full flex-col items-center"
            >
              <Image src={media} alt="media" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Media
              </p>
            </Link>

            <Link
              href={`/kunjungan/UKM/Senbud`}
              className="flex w-full flex-col items-center"
            >
              <Image src={senbud} alt="senbud" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Seni dan Budaya
              </p>
            </Link>

            <Link
              href={`/kunjungan/UKM/Orkes`}
              className="flex w-full flex-col items-center"
            >
              <Image src={orkes} alt="orkes" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Olahraga & Kesehatan
              </p>
            </Link>

            <Link
              href={`/kunjungan/UKM/Kajian`}
              className="flex w-full flex-col items-center"
            >
              <Image src={kajian} alt="kajian" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Kajian
              </p>
            </Link>

            <Link
              href={`/kunjungan/UKM/Agama`}
              className="flex w-full flex-col items-center"
            >
              <Image src={agama} alt="agama" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Agama
              </p>
            </Link>

            <Link
              href={`/kunjungan/UKM/Pendidikan`}
              className="flex w-full flex-col items-center"
            >
              <Image src={media2} alt="media2" className="h-[65%]" />
              <p className="translate-y-[-15px] text-center text-sh5 font-bold leading-[150%] text-orange-400">
                Pendidikan
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KunjunganUKMPage;
