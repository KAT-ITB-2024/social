import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function GrantCoins() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
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
      <section className="mt-16 flex h-3/5 w-full flex-col items-center justify-between">
        <div className="flex h-fit w-full flex-col items-center">
          <Image
            src="/images/lembaga/bubble-2.png"
            alt="bubble"
            width={448}
            height={448}
            className="absolute top-[2%] -z-10"
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

        {/* Search Bar */}

        {/* Aqualings */}

        {/* Pagination */}
      </section>
    </div>
  );
}
