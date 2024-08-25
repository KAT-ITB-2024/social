'use client';

import Image, { type StaticImageData } from 'next/image';
import Penyu from 'public/images/class-selection/Penyu.png';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog-assignment';
// import DeleteIcon from 'public/images/modal-component/delete.svg';
import { cn } from '~/lib/utils';

const ClassConfirmationModal = ({
  image,
  title,
  description,
  isOpen,
  setIsOpen,
  onConfirm,
  className,
}: {
  image?: StaticImageData;
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  onConfirm: () => void;
  className?: string;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className={cn(
          'w-[300px] px-6 pb-6 pt-10 bg-white rounded-[12px border border-orange-400 shadow-pink-xl',
          className,
        )}
      >
        <AlertDialogTitle className="flex flex-col items-center gap-y-2">
          <Image
            src={Penyu}
            alt="Penyu"
            height={150}
            width={150}
            className="pb-4"
          />
          <p className="text-center text-h3 font-normal text-orange-500">
            Pilih Kelas
          </p>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-pink-400 text-center font-normal ">
          Apakah kamu yakin memilih <br />
          kelas ini?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-orange-400 text-white hover:bg-orange-300"
            onClick={onConfirm}
          >
            Pilih Sekarang
          </AlertDialogAction>
          <AlertDialogCancel className="bg-white border-orange-400 text-orange-400 hover:bg-orange-50 hover:text-orange-500">
            Batal
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClassConfirmationModal;
