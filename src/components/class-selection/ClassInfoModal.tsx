'use client';

import Image, { type StaticImageData } from 'next/image';
import SeaSlug from 'public/images/class-selection/SeaSlug.png';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CloseIcon from 'public/icons/class-selection/CloseIcon.svg';
import { cn } from '~/lib/utils';

const ClassInfoModal = ({
  isOpen,
  setIsOpen,
  className,
}: {
  image: StaticImageData;
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  className?: string;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={cn(
          'w-[300px] rounded-[12px] bg-white px-4 py-14 shadow-pink-xl',
          className,
        )}
      >
        <div
          className="text-2x absolute right-4 top-4 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Image src={CloseIcon} alt="Close Icon" width={32} height={32} />
        </div>
        <AlertDialogTitle className="flex flex-col items-center gap-y-2">
          <Image src={SeaSlug} alt="SeaSlug" height={200} width={200} />
          <p className="text-center text-h3 font-normal text-orange-500">
            Yeay!
          </p>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-pink-400">
          Kamu berhasil terdaftar di kelas ini
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClassInfoModal;
