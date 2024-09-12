'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import IkanHijau from 'public/images/kunjungan/IkanHijau.png';
import IkanOrange from 'public/images/kunjungan/IkanOrange.png';
import BintangLaut from 'public/images/kunjungan/BintangLaut.png';
import CoralKanan from 'public/images/kunjungan/CoralKanan.png';
import CoralTengah from 'public/images/kunjungan/CoralTengah.png';
import CoralKiri from 'public/images/kunjungan/CoralKiri.png';
import LembagaDummy from 'public/images/kunjungan/LemagaDummy.png';
import Arrow from 'public/images/kunjungan/send.svg';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import Penyu from 'public/images/kunjungan/Penyu.png';
import Gurita from 'public/images/kunjungan/Gurita.png';
import KunjunganConfirmation from '~/components/kunjungan/KunjunganConfirmation';

const UKMLembagaDetailPage = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isFalseOpen, setIsFalseOpen] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1]?.replace(/%20/g, ' ');
  if (!lastSegment) {
    return;
  }

  const { data, isLoading } = api.booth.getSpecificLembaga.useQuery({
    lembagaId: lastSegment,
  });

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={IkanHijau}
        alt="bg-tl"
        className="absolute -top-16 left-0 z-20"
        width={256}
      />
      <Image
        src={IkanOrange}
        alt="bg-tr"
        className="absolute right-0 top-[2vh] z-20"
        width={100}
      />
      <Image
        src={BintangLaut}
        alt="bg-bl"
        className="absolute left-0 top-[125px] z-20"
        width={90}
      />
      <Image
        src={CoralKiri}
        alt="bg-bl"
        className="absolute bottom-0 left-0 z-20"
        width={125}
      />
      <Image
        src={CoralTengah}
        alt="bg-bl"
        className="absolute bottom-0 left-[75px] z-20"
        width={125}
      />
      <Image
        src={CoralKanan}
        alt="bg-bl"
        className="absolute bottom-0 right-0 z-20"
        width={350}
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
          <div className="translate-y-[-50px] space-y-2 text-center">
            <div className="relative flex items-center justify-center">
              {/* FRAME */}
              <Image
                src={LembagaDummy}
                alt="Lembaga Dummy"
                className="h-[250px] w-[266px]"
              />
              {/* FOTO LEMBAGA */}
              <div className="absolute inset-0 top-2 flex items-center justify-center">
                {data?.specificLembaga?.logo ? (
                  <Image
                    src={data?.specificLembaga?.logo}
                    alt="Lembaga"
                    height={170}
                    width={170}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-[170px] w-[170px] rounded-full bg-orange-300" />
                )}
              </div>
            </div>
            <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
              {data?.specificLembaga?.name ?? ''}
            </h3>
            {lastSegment !== 'Pusat' && (
              <p className="text-2xl text-pink-300 text-shadow-orange-md">
                Unit Kegiatan Mahasiswa
              </p>
            )}
          </div>
          <div className="translate-y-[-35px] space-y-2">
            <div className="flex w-full items-center gap-x-4">
              <Input
                className="h-[50px] w-[300px] border-2 border-orange-400 shadow-orange-md placeholder:text-orange-300"
                placeholder="Masukkan Kode"
                disabled={data?.hasVisited}
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
              />
              <Button className="h-[50px] bg-orange-400 shadow-orange-md hover:bg-orange-300">
                <Image
                  src={Arrow}
                  width={24}
                  height={24}
                  className="text-white"
                  alt="Arrow"
                />
              </Button>
            </div>
            <div>
              {data?.specificLembaga?.detailLink && (
                <Button
                  variant={'outline'}
                  className="h-[50px] w-full border-2 border-orange-400 bg-transparent text-orange-400 hover:bg-orange-100/25 hover:text-orange-500"
                  // TO DO : Pasang link dri info
                >
                  Tentang Lembaga
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IF SUCCESS */}
      <KunjunganConfirmation
        title="100 Coins"
        image={Penyu}
        description="Yeay! Kamu mendapatkan 100 coins sebagai hadiah atas kunjunganmu!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* IF FALSE */}
      <KunjunganConfirmation
        title="Oops!"
        image={Gurita}
        description="Sepertinya ada sedikit kesalahan. Periksa kembali kodenya dan coba lagi!"
        isOpen={isFalseOpen}
        setIsOpen={setIsFalseOpen}
      />
    </main>
  );
};

export default UKMLembagaDetailPage;
