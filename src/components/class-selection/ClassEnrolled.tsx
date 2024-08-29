'use client';

import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CloseIcon from 'public/icons/class-selection/CloseIcon.svg';
import { cn } from '~/lib/utils';

const ClassEnrolledModal = ({
  isOpen,
  setIsOpen,
  className,
}: {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  className?: string;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={cn(
          'w-[300px] px-4 py-14 bg-white rounded-[12px] shadow-black',
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
          <p className="text-center text-h2 font-normal text-error-500">
            Maaf..
          </p>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-pink-400 text-center">
          Kamu sudah memilih kelas sebelumnya. Kelas hanya bisa dipilih satu
          kali.
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClassEnrolledModal;
