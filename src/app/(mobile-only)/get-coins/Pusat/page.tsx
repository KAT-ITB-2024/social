'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';
import { Input } from '~/components/ui/input';
import { usePathname } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

import { LembagaCard } from '~/components/kunjungan/LembagaCard';
import NotFound from '../../not-found';
import LembagaBackButton from '~/components/kunjungan/LembagaBackButton';

const PusatPage = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const [searchQuery, setSearchQuery] = useState('');
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment) {
    return;
  }
  const { data, isLoading } = api.booth.getLembagaPusat.useQuery();
  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  const filteredLembagaData = data?.filter((lembaga) =>
    lembaga.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          <div className="flex w-full flex-row items-start justify-between">
            <LembagaBackButton />
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
            <div className="w-[40px]" />
          </div>
          <div className="space-y-4">
            {/* Input  */}
            <Input
              className="h-[50px] w-full border-2 border-orange-400 placeholder:text-orange-300 focus-visible:ring-transparent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Lembaga */}
            <div className="space-y-2">
              {/* Lembaga Item */}
              {filteredLembagaData?.map((lembagaPusat) => {
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
