import Image from 'next/image';
import { CustomPagination } from '~/components/lembaga/Pagination';
import AqualingsCard from '~/components/lembaga/AqualingsCard';
import SearchBar from '~/components/lembaga/Search';

export default function GrantCoins() {
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
            999
          </p>
          <p className="font-heading text-4xl text-orange-300 drop-shadow-orange-shadow-lg">
            Pengunjung
          </p>
          <p className="font-body text-lg leading-10 text-pink-300">
            Lembaga XYZ
          </p>
        </div>

        <div className="flex w-5/6 flex-col items-center gap-4">
          {/* Search Bar */}
          <SearchBar />

          {/* Aqualings */}
          <div className="flex w-full flex-col gap-2">
            <AqualingsCard />
            <AqualingsCard />
          </div>

          {/* Pagination */}
          <div className="flex w-full items-center justify-between">
            <p className="pl-3 font-body text-sm font-normal text-[#FFFEFE]">
              Total 10 Items
            </p>
            <CustomPagination totalPages={10} />
          </div>
        </div>
      </section>
    </div>
  );
}
