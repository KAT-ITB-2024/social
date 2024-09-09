import Image from 'next/image';

import LOGO from 'public/images/kunjungan/LOGO.png';
import UKM from 'public/images/kunjungan/UKM.png';
import BSO from 'public/images/kunjungan/BSO.png';
import HMPS from 'public/images/kunjungan/HMPS.png';
import { Button } from '~/components/ui/button';

const KunjunganPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="flex min-h-screen w-full max-w-[450px] flex-col bg-transparent p-0 py-24"
        style={{
          backgroundImage: "url('/images/kunjungan/bg-main.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="flex w-full flex-col items-center gap-8 p-6">
          <div className="flex w-full flex-col items-center">
            <Image src={LOGO} alt="logo" width={235} />
            <p className="w-full max-w-[300px] text-center font-body text-b3 leading-[150%] text-orange-500">
              Jelajahi seluruh lembaga kemahasiswaan di ITB!
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <Image src={UKM} alt="ukm" width={235} />
            <h3 className="w-[90%] text-center font-heading text-h3 text-orange-500 text-shadow-orange-lg">
              Unit Kegiatan Mahasiswa (UKM)
            </h3>
            <Button variant={'pink'}>Explore Now!</Button>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <Image src={BSO} alt="bso" width={235} />
            <h3 className="w-[90%] text-center font-heading text-h3 text-orange-500 text-shadow-orange-lg">
              Badan Semi Otonom (BSO), Pusat, Eksternal
            </h3>
            <Button variant={'pink'}>Explore Now!</Button>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <Image src={HMPS} alt="hmps" width={235} />
            <h3 className="w-[90%] text-center font-heading text-h3 text-orange-500 text-shadow-orange-lg">
              Himpunan Mahasiswa Program Studi (HMPS)
            </h3>
            <Button variant={'pink'}>Explore Now!</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KunjunganPage;
