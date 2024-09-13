import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';
import { FacultyEnumType } from '~/types/enums/faculty';
import { FC } from 'react';

interface GrantMobileViewProps {
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

const GrantMobileView: FC<GrantMobileViewProps> = ({
  paginatedData,
  totalPages,
  boothData,
  totalItems,
}) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
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

        <div className="flex w-5/6 flex-col items-center gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Aqualings */}
          <div className="flex w-full flex-col gap-2">
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
              <p className="font-body text-lg leading-10 text-white">
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

export default GrantMobileView;
