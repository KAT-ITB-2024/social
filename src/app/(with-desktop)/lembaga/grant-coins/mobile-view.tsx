import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';
import { FacultyEnum, FacultyEnumType } from '~/types/enums/faculty';
import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '~/trpc/react';
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

const GrantMobileView = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? undefined;
  const router = useRouter();
  // Ensure faculty is within the Fakultas type
  let faculty: fakultas =
    (searchParams?.get('faculty') as fakultas) ?? undefined;

  const page = searchParams?.get('page') ?? undefined;

  // Validate faculty based on the enum
  if (faculty && !Object.values(FacultyEnum).includes(faculty as FacultyEnum)) {
    faculty = undefined;
  }

  const {
    data: visitorData,
    isLoading,
    refetch,
  } = api.lembaga.getAllVisitors.useQuery({
    faculty,
    nameOrNim: query,
    limit: 10,
    page: page ? Number(page) : 1,
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

  const handleGrantCoins = async (id: string) => {
    await grantCoinsMutation.mutateAsync({
      userId: id,
      coins: 100,
    });

    setShowConfirmationModal(false);
    setShowResultModal(true);

    await refetch();
  };
  if (isLoading) return <LoadingSpinnerCustom />;

  if (visitorData?.data.paginatedData == null) return null;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {/* Background Section */}
      <div className="absolute -z-20 h-screen w-full">
        <Image
          fill
          src="/images/lembaga/grant-coins.png"
          alt="background-image"
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Main Section */}
      <section className="flex h-4/5 w-full flex-col items-center justify-start">
        {/* Number of Visitor */}
        <div className="relative flex h-[448px] w-full">
          {/* Bubble image */}
          <Image
            src="/images/lembaga/bubble-2.png"
            alt="bubble"
            fill
            className="object-contain"
          />
          {/* Text inside the bubble */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-heading text-7xl leading-[4rem] text-orange-500 drop-shadow-orange-shadow-lg">
              {visitorData?.data.boothData.visitorCount ?? 0}
            </p>
            <p className="font-heading text-4xl text-orange-300 drop-shadow-orange-shadow-lg">
              Pengunjung
            </p>
            <p className="text-center font-body text-lg leading-10 text-pink-300">
              {visitorData?.data.boothData.name ?? 'Unavailable'}
            </p>
          </div>
        </div>

        <div className="flex w-5/6 flex-col items-center gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Aqualings */}
          <div className="no-scrollbar flex max-h-[20vh] w-full flex-col gap-2 overflow-y-scroll">
            {visitorData?.data.paginatedData.length > 0 ? (
              visitorData?.data.paginatedData.map((elmt, idx) => (
                <AqualingsCard
                  isGranted={elmt.isGranted}
                  key={idx}
                  nim={elmt.nim}
                  name={elmt.name}
                  profileImage={elmt.profileImage}
                  onClick={() => handleConfirmation(String(elmt.userId))}
                />
              ))
            ) : (
              <p className="font-body text-lg leading-10 text-white">
                Tidak ada pengunjung yang ditemukan
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex w-full items-center justify-between">
            <p className="pl-3 font-body text-sm font-normal text-[#FFFEFE]">
              Total {visitorData?.totalItems ?? 0} Items
            </p>
            <CustomPagination totalPages={visitorData?.totalPages ?? 1} />
          </div>
        </div>

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
      </section>
    </div>
  );
};

export default GrantMobileView;
