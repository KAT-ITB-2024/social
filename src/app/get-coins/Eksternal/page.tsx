'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';
import { Input } from '~/components/ui/input';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { LembagaCard } from '~/components/kunjungan/LembagaCard';

const EksternalPage = () => {
  const { data: lembagaData, isLoading } =
    api.booth.getLembagaExternal.useQuery();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredLembagaData = lembagaData?.filter((lembaga) =>
    lembaga.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <LoadingSpinnerCustom />;
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
          <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
            Eksternal
          </h3>
          <div className="space-y-4">
            {/* Input untuk search */}
            <Input
              className="h-[50px] w-[400px] border-2 border-orange-400 placeholder:text-orange-300 focus-visible:ring-transparent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Lembaga */}
            <div className="space-y-2">
              {/* Lembaga Item */}
              {filteredLembagaData?.map((lembaga) => {
                return (
                  <LembagaCard
                    key={lembaga.id}
                    item={lembaga}
                    link={`/get-coins/Eksternal/${lembaga.id}`}
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

export default EksternalPage;
