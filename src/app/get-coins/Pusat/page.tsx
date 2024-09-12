'use client';

import React from 'react';
import Image from 'next/image';
import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';
import bgbr from 'public/images/kunjungan/UKM/bg-br.png';
import Link from 'next/link';
import LembagaDummy from 'public/images/kunjungan/LemagaDummy.png';
import { Input } from '~/components/ui/input';
import { usePathname } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { MoveRight } from 'lucide-react';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import NotFound from '~/app/not-found';
import { LembagaCard } from '~/components/kunjungan/LembagaCard';

const PusatPage = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment) {
    return;
  }
  const { data, isLoading } = api.booth.getLembagaPusat.useQuery();
  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  if (!data && !isLoading) {
    return <NotFound />;
  }
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
          <div className="space-y-2 text-center">
            <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
              {lastSegment}
            </h3>
            {lastSegment !== 'Pusat' && (
              <p className="text-2xl text-pink-300 text-shadow-orange-md">
                HMPS dan BSO HMPS
              </p>
            )}
          </div>
          <div className="space-y-4">
            {/* Input  */}
            <Input
              className="h-[50px] w-[400px] border-2 border-orange-400 placeholder:text-orange-300 focus-visible:ring-transparent"
              placeholder="Search..."
            />

            {/* Lembaga */}
            <div className="space-y-2">
              {/* Lembaga Item */}
              {data?.map((lembagaPusat) => {
                return (
                  <LembagaCard
                    key={lembagaPusat.id}
                    item={lembagaPusat}
                    link={`/get-coins/Pusat/${lembagaPusat.id}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PusatPage;
