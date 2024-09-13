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

const DesktopView = ({ lembaga }: { lembaga: Lembaga }) => {
  const { name, currentToken, image } = lembaga;
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
    <div className="flex h-screen w-full flex-col items-center justify-center overflow-x-auto">
      {/* Background Section */}
      <div className="absolute -z-20 h-screen w-full">
        <Image
          fill
          src="/images/lembaga/desktop-lembaga-bg.png"
          alt="background-image"
          quality={100}
          className="object-cover"
        />
      </div>

      {/* Main Section */}
      <section className="flex flex-row items-center justify-around">
        <div className="flex w-full flex-col items-center">
          <div className="relative -z-10 h-[600px] w-[600px]">
            <Image
              src={'/images/lembaga/lembaga-frame.png'}
              fill
              alt="Foto lembaga"
            />
            <div className="relative left-[152px] top-[150px] h-[317px] w-[317px]">
              <Image
                src={image ?? '/images/profile/PersonImage.png'}
                alt="Lembaga Logo"
                fill
                className="absolute rounded-full object-cover"
              />
            </div>
          </div>
          <p className="-mt-20 text-center font-heading text-4xl text-orange-500 drop-shadow-orange-shadow-lg">
            {name}
          </p>
        </div>

        {/* Kode Kunjungan */}
        <div className="flex w-full">
          {/* Bubble Image */}
          <div className="relative h-[593px] w-[600px]">
            <Image
              src={'/images/lembaga/bubble-desktop.png'}
              alt="Foto bubble"
              className="object-cover"
              fill
            />

            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4">
              <p className="font-subheading text-lg font-bold text-orange-500">
                Kode Kunjungan
              </p>
              <p className="font-heading text-6xl text-turquoise-500 text-shadow-orange-xl">
                {currentToken}
              </p>
              <div className="flex flex-row gap-4">
                <Button
                  className="w-full min-w-fit bg-orange-400 drop-shadow-orange-shadow-lg"
                  disabled={isRefreshing}
                  onClick={handleRefreshToken}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesktopView;
