import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';
import { FacultyEnum } from '~/types/enums/faculty';
import { useState } from 'react';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { useSearchParams } from 'next/navigation';
import LembagaModal from '~/components/lembaga/LembagaModal';

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
const GrantDesktopView = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? undefined;
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="absolute flex h-screen w-screen flex-col bg-[transparent] p-0"
        style={{
          backgroundImage: "url('/images/lembaga/desktop-pengunjung-bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        {/* Main Section */}
        <section className="mt-20 flex h-4/5 w-full flex-row items-center justify-center gap-10">
          {/* Number of Visitor */}
          <div className="relative flex h-[638px] w-[640px] flex-col items-center justify-center">
            <Image
              src="/images/lembaga/pengunjung-frame-desktop.png"
              alt="bubble"
              fill
            />
            <div className="absolute inset-0 left-5 flex h-full w-full flex-col items-center justify-center gap-4">
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

          <div className="flex h-full w-[35%] flex-col items-center gap-4">
            {/* Search Bar */}
            <SearchBar />

            {/* Aqualings */}
            <div className="no-scrollbar flex max-h-[85vh] w-full flex-col gap-2 overflow-y-scroll">
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
    </main>
  );
};

export default GrantDesktopView;
