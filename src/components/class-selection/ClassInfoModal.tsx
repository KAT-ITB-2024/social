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
          'w-[300px] px-4 py-14 bg-white rounded-[12px] shadow-pink-xl',
          className,
        )}
      >
        <div
          className="absolute top-4 right-4 text-2x cursor-pointer"
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
        <AlertDialogDescription className="text-pink-400 text-center">
          Kamu berhasil terdaftar di kelas ini
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClassInfoModal;
