'use client';

import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { ErrorToast } from '~/components/ui/error-toast';
import { api } from '~/trpc/react';
import { Lembaga } from './page';

export default function MobileView({ lembaga }: { lembaga: Lembaga }) {
  const { name, currentToken, visitorCount, image } = lembaga;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshMutation = api.lembaga.refreshCurrentToken.useMutation();
  const router = useRouter();

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      await refreshMutation.mutateAsync();
    } catch {
      toast(<ErrorToast desc="Gagal mengubah refresh token" />);
    } finally {
      router.refresh();
      setIsRefreshing(false);
    }
  };
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
      <section className="flex h-[65vh] w-full flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <p className="text-center font-heading text-4xl text-orange-500 drop-shadow-orange-shadow-lg">
            {name}
          </p>
          <p className="font-body text-lg text-pink-300">
            {visitorCount} Pengunjung
          </p>
        </div>
        <div className="flex h-fit w-3/4 flex-col items-center gap-1">
          <Image
            fill
            src="/images/lembaga/bubble.png"
            alt="bubble"
            className="-z-10 object-contain p-10"
          />
          <p className="font-subheading text-lg font-bold text-orange-500">
            Kode Kunjungan
          </p>
          <p className="font-heading text-6xl text-orange-300 drop-shadow-orange-shadow-lg">
            {currentToken}
          </p>
        </div>
        <div className="flex w-2/5 flex-col gap-2 shadow-inner drop-shadow-orange-shadow-lg">
          <Button
            disabled={isRefreshing}
            onClick={handleRefreshToken}
            className="w-full min-w-fit bg-orange-400 drop-shadow-orange-shadow-lg"
          >
            Reset Token
            <RefreshCw color="#FFFFFF" className="pl-2" />
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full min-w-fit border-2 border-orange-400 bg-transparent text-orange-400 drop-shadow-orange-shadow-lg hover:bg-white hover:text-orange-400"
            disabled={isRefreshing}
          >
            <Link href="/lembaga/grant-coins">Lihat Pengunjung</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
