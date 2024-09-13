'use client';

import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';
import { api } from '~/trpc/react';
import { useState } from 'react';
import LembagaModal from '~/components/lembaga/LembagaModal';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

type fakultas =
  | 'FITB'
  | 'FMIPA'
  | 'FSRD'
  | 'FTMD'
  | 'FTTM'
  | 'FTSL'
  | 'FTI'
  | 'SAPPK'
  | 'SBM'
  | 'SF'
  | 'SITH'
  | 'STEI'
  | undefined;

export default function GrantCoins({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    faculty?: fakultas;
    page?: string;
  };
}) {
  const query = searchParams?.query ?? undefined;
  const faculty = searchParams?.faculty ?? undefined;
  const page = Number(searchParams?.page) || 1;

  const { data: profile, refetch } = api.lembaga.getCurrentProfile.useQuery();

  const { data: visitorData } = api.lembaga.getAllVisitors.useQuery({
    faculty,
    nameOrNim: query,
    limit: 10,
    page,
  });

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [visitorId, setVisitorId] = useState<string>('');

  const handleConfirmation = (id: string) => {
    setShowConfirmationModal(true);
    setVisitorId(id);
  };

  const grantCoinsMutation = api.lembaga.grantCoins.useMutation();

  const handleGrantCoins = (id: string) => {
    grantCoinsMutation.mutate({
      userId: id,
      coins: 100,
    });

    setShowConfirmationModal(false);
    setShowResultModal(true);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      {/* Background Section */}
      <div className="absolute -z-10 h-screen w-full">
        <Image
          fill
          src="/images/lembaga/grant-coins.png"
          alt="background-image"
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Main Section */}
      <section className="mt-16 flex h-4/5 w-full flex-col items-center justify-between">
        {/* Number of Visitor */}
        <div className="flex h-fit w-full flex-col items-center pt-[20%]">
          <Image
            src="/images/lembaga/bubble-2.png"
            alt="bubble"
            width={448}
            height={448}
            className="absolute top-0 -z-10"
          />
          <p className="font-heading text-7xl leading-[4rem] text-orange-500 drop-shadow-orange-shadow-lg">
            {profile?.data?.visitorCount ?? 0}
          </p>
          <p className="font-heading text-4xl text-orange-300 drop-shadow-orange-shadow-lg">
            Pengunjung
          </p>
          <p className="font-body text-lg leading-10 text-pink-300">
            {profile?.data?.name ?? 'Unavailable'}
          </p>
        </div>

        <div className="flex h-1/2 w-5/6 flex-col items-center gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Aqualings */}
          <div className="no-scrollbar flex h-3/4 w-full flex-col gap-2 overflow-y-scroll">
            {visitorData?.data.map((elmt, idx) => (
              <AqualingsCard
                key={idx}
                nim={elmt.nim}
                name={elmt.name}
                profileImage={elmt.profileImage}
                onClick={() => handleConfirmation(String(elmt.userId))}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex w-full items-center justify-between">
            <p className="pl-3 font-body text-sm font-normal text-[#FFFEFE]">
              Total {visitorData?.totalItems ?? 0} Items
            </p>
            <CustomPagination totalPages={visitorData?.totalPages ?? 1} />
          </div>
        </div>
      </section>

      {/* Modal */}
      {showConfirmationModal && (
        <div className="absolute flex size-full items-center justify-center bg-black/15">
          <LembagaModal
            type="Confirm"
            onClick={() => handleGrantCoins(visitorId)}
          />
        </div>
      )}
      {grantCoinsMutation.isPending && (
        <div className="absolute flex size-full items-center justify-center bg-black/15">
          <LoadingSpinnerCustom />
        </div>
      )}
      {(grantCoinsMutation.isSuccess || grantCoinsMutation.isError) &&
        showResultModal && (
          <div className="absolute flex size-full items-center justify-center bg-black/15">
            <LembagaModal
              type={grantCoinsMutation.isSuccess ? 'Success' : 'Error'}
              onClick={() => setShowResultModal(false)}
            />
          </div>
        )}
    </div>
  );
}
