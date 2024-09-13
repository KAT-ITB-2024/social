import { Button } from '~/components/ui/button';
import { MoveRight } from 'lucide-react';
import LembagaBorder from 'public/images/kunjungan/LemagaDummy.png';
import Image from 'next/image';
import Link from 'next/link';

interface LembagaCardProps {
  item: {
    id: string;
    logo: string | null;
    name: string;
  };
  link: string;
}

export const LembagaCard = ({ item, link }: LembagaCardProps) => {
  return (
    <div
      key={item.id}
      className="flex h-auto w-full items-center justify-between rounded-xl border-2 border-orange-500 bg-gradient-to-r from-transparent to-orange-200/75 pl-1 pr-2 shadow-orange-sm"
    >
      <div className="flex items-center gap-x-2">
        <div className="relative">
          <Image
            src={LembagaBorder}
            alt="Lembaga Dummy"
            height={72}
            width={72}
            className="min-h-[72px] min-w-[72px]"
          />

          {item.logo ? (
            <>
              <Image
                src={item.logo}
                alt="Lembaga"
                height={45}
                width={45}
                className="absolute left-4 top-[12px] -z-10 h-[45px] w-[45px] rounded-full object-cover"
              />
              <div className="absolute left-4 top-3 -z-20 h-[45px] w-[45px] rounded-full bg-white" />
            </>
          ) : (
            <div className="absolute left-4 top-3 -z-20 h-[45px] w-[45px] rounded-full bg-orange-300" />
          )}
        </div>
        <h3 className="min-w-[150px] max-w-[200px] break-words text-xl font-bold text-orange-500">
          {item.name}
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <Link href={link}>
          <Button className="flex items-center justify-center bg-orange-400 p-2 hover:bg-orange-300">
            <MoveRight className="text-xl" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
