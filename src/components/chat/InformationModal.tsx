'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import Ombak from 'public/images/chat/Ombak.png';

const InformationModal = ({
  title,
  description,
  buttonLabel,
  isOpen = true,
  setIsOpen,
  onClose,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Ukuran, Warna, Typography Mengikuti Figma, Tidak Bisa Rounded :( */}
      <AlertDialogContent className="flex w-[343px] flex-col items-center overflow-hidden rounded-[32px] border-none bg-blue-600 text-white shadow-blue-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-subheading text-2xl uppercase">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-col items-center gap-y-4 space-y-4">
            <AlertDialogCancel
              className="w-[192px] rounded-[13px] border-white bg-pink-300 font-body text-xl text-neutral-50 hover:bg-pink-400 hover:text-neutral-100 focus-visible:ring-transparent"
              onClick={onClose}
            >
              {buttonLabel}
            </AlertDialogCancel>
            <p className="text-md px-8 text-center">{description}</p>
          </div>
        </AlertDialogFooter>
        <Image
          src={Ombak}
          alt="Ombak"
          className="absolute bottom-0 -z-20 w-full translate-y-[150px] rounded-[10px] opacity-50"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InformationModal;
