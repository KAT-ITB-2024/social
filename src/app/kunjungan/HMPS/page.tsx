import Image from 'next/image';

import FITB from 'public/images/kunjungan/HMPS/FITB.png';
import FMIPA from 'public/images/kunjungan/HMPS/FMIPA.png';
import FSRD from 'public/images/kunjungan/HMPS/FSRD.png';
import FTI from 'public/images/kunjungan/HMPS/FTI.png';
import FTMD from 'public/images/kunjungan/HMPS/FTMD.png';
import FTSL from 'public/images/kunjungan/HMPS/FTSL.png';
import FTTM from 'public/images/kunjungan/HMPS/FTTM.png';
import SAPPK from 'public/images/kunjungan/HMPS/SAPPK.png';
import SBM from 'public/images/kunjungan/HMPS/SBM.png';
import SF from 'public/images/kunjungan/HMPS/SF.png';
import SITH from 'public/images/kunjungan/HMPS/SITH.png';
import STEI from 'public/images/kunjungan/HMPS/STEI.png';

import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';

const KunjunganHMPSPage = () => {
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
            Rumpun Himpunan Mahasiswa Program Studi (HMPS)
          </h3>
          <div className="grid grid-cols-3 place-items-start">
            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FITB} alt="FITB" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FITB
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FMIPA} alt="FMIPA" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FMIPA
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FTI} alt="FTI" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FTI
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FTSL} alt="FTSL" height={70} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FTSL
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FTTM} alt="FTTM" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FTTM
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FTMD} alt="FTMD" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FTMD
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={FSRD} alt="FSRD" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                FSRD
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={SAPPK} alt="SAPPK" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                SAPPK
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={SBM} alt="SBM" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                SBM
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={SF} alt="SF" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                SF
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={SITH} alt="SITH" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                SITH
              </p>
            </button>

            <button className="flex h-full w-full flex-col items-center justify-between">
              <Image src={STEI} alt="STEI" height={110} />
              <p className="text-center text-sh5 font-bold leading-[150%] text-orange-400">
                STEI
              </p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KunjunganHMPSPage;
