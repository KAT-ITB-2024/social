import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';
import { FacultyEnumType } from '~/types/enums/faculty';
import { FC } from 'react';

interface GrantDesktopViewProps {
  paginatedData: {
    userId: string;
    nim: string;
    name: string;
    faculty: FacultyEnumType;
    profileImage: string | null;
    totalCount: number;
  }[];
  totalItems: number;
  totalPages: number;
  boothData: {
    visitorCount: number | null;
    name: string;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}
const GrantDesktopView: FC<GrantDesktopViewProps> = ({
  paginatedData,
  totalPages,
  boothData,
  totalItems,
}) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-x-auto">
      {/* Background Section */}
      <div className="absolute -z-20 h-screen w-full">
        <Image
          fill
          src="/images/lembaga/desktop-pengunjung-bg.png"
          alt="background-image"
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Main Section */}
      <section className="mt-20 flex h-4/5 w-full flex-row items-center justify-center gap-10">
        {/* Number of Visitor */}
        <div className="relative flex h-[638px] w-[640px] flex-col items-center justify-center">
          <Image
            src="/images/lembaga/pengunjung-frame-desktop.png"
            alt="bubble"
            fill
          />
          <div className="absolute inset-0 left-0 flex h-full w-full flex-col items-center justify-center gap-4">
            <p className="font-heading text-7xl leading-[4rem] text-orange-500 drop-shadow-orange-shadow-lg">
              {boothData.visitorCount}
            </p>
            <p className="font-heading text-4xl text-orange-300 drop-shadow-orange-shadow-lg">
              Pengunjung
            </p>
            <p className="text-center font-body text-lg leading-10 text-pink-300">
              {boothData.name}
            </p>
          </div>
        </div>

        <div className="flex h-full w-[35%] flex-col items-center gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Aqualings */}
          <div className="no-scrollbar flex max-h-[80vh] w-full flex-col gap-2 overflow-y-scroll">
            {paginatedData.length > 0 ? (
              paginatedData.map((user) => {
                return (
                  <AqualingsCard
                    key={user.userId}
                    name={user.name}
                    nim={user.nim}
                    profileImage={user.profileImage}
                    isGranted={false}
                  />
                );
              })
            ) : (
              <p className="text-pink-300p text-center font-body text-lg leading-10">
                Tidak ada pengunjung yang ditemukan
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex w-full items-center justify-between">
            <p className="pl-3 font-body text-sm font-normal text-[#FFFEFE]">
              Total {totalItems} Items
            </p>
            <CustomPagination totalPages={totalPages} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrantDesktopView;
