'use client';

import Image from 'next/image';
import Bubly from 'public/images/merch/burbub.png';
import Receipt from 'public/icons/merch/receipt.svg';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CloseIcon from 'public/icons/merch/close.svg';
import { cn } from '~/lib/utils';
import { useRouter } from 'next/navigation';

export const RequestSuccess = ({
  total_coins,
  isOpen,
  setIsOpen,
  className,
}: {
  total_coins: number;
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={cn(
          'h-[446px] w-[345px] rounded-[12px] border-blue-500 bg-blue-500 px-4 py-8',
          className,
        )}
      >
        <div
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Image src={CloseIcon} alt="Close Icon" width={32} height={32} />
        </div>
        <AlertDialogTitle className="-mt-16 flex flex-col items-center">
          <Image src={Bubly} alt="Jelly" height={300} width={300} />
          <p className="-mt-12 text-center text-h3 font-normal text-white">
            Requestmu Berhasil!
          </p>
        </AlertDialogTitle>
        <AlertDialogDescription className="-mt-4 text-center text-sm text-white">
          Silakan kunjungi booth merchandise untuk pengambilan pesananmu!
          <div className="mt-1 text-xs text-neutral-200">
            (Koinmu sekarang: {total_coins})
          </div>
        </AlertDialogDescription>
        <Button
          className="mt-5 bg-turquoise-100 px-2 text-blue-500"
          onClick={() => router.push('/order-history')}
        >
          <Image
            src={Receipt}
            alt="cart"
            className="relative right-2 w-[20px]"
          />
          Cek Order History
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
