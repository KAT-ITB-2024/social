import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function ResetToken() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {/* Background Section */}
      <div className="absolute -z-10 h-screen w-full">
        <Image
          fill
          src="/images/lembaga/reset-token.png"
          alt="background-image"
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Main Section */}
      <section className="flex h-3/5 w-full flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <p className="font-heading text-4xl text-orange-500 drop-shadow-orange-shadow-lg">
            LEMBAGA XYZ
          </p>
          <p className="font-body text-lg text-pink-300">999 Pengunjung</p>
        </div>
        <div className="flex h-fit w-3/4 flex-col items-center gap-1">
          <Image
            fill
            src="/images/lembaga/bubble.png"
            alt="bubble"
            className="object-contain p-10"
          />
          <p className="font-subheading text-lg font-bold text-orange-500">
            Kode Kunjungan
          </p>
          <p className="font-heading text-6xl text-orange-300 drop-shadow-orange-shadow-lg">
            123456
          </p>
        </div>
        <div className="flex w-2/5 flex-col gap-2 shadow-inner drop-shadow-orange-shadow-lg">
          <Button className="w-full min-w-fit bg-orange-400 drop-shadow-orange-shadow-lg">
            Reset Token
            <RefreshCw color="#FFFFFF" className="pl-2" />
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full min-w-fit border-2 border-orange-400 bg-transparent text-orange-400 drop-shadow-orange-shadow-lg hover:bg-white hover:text-orange-400"
          >
            <Link href="/lembaga/grant-coins">Lihat Pengunjung</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
