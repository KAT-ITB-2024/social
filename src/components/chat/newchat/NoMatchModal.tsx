'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import Ombak from 'public/images/chat/Ombak.png';

const NoMatchModal = ({
  title,
  description,
  buttonLabelConfirm,
  buttonLabelCancel = 'Batal',
  onConfirm,
  onCancel,
  isOpen = true,
  setIsOpen,
}: {
  title: string;
  description?: string;
  buttonLabelConfirm: string;
  buttonLabelCancel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
          <div className="flex flex-col items-center gap-y-4">
            <p className="text-md px-8 text-center">{description}</p>
            <div className="flex flex-col items-center gap-y-4">
              <AlertDialogAction
                className="w-full rounded-[13px] border-white bg-pink-300 font-body text-lg text-neutral-50 hover:bg-pink-400 hover:text-neutral-100 focus-visible:ring-transparent"
                onClick={onConfirm}
              >
                {buttonLabelConfirm}
              </AlertDialogAction>
              <AlertDialogCancel
                className="w-full rounded-[13px] border-[2px] border-blue-200 bg-neutral-50 font-body text-lg text-blue-600 hover:bg-neutral-200"
                onClick={onCancel}
              >
                {buttonLabelCancel}
              </AlertDialogCancel>
            </div>
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

export default NoMatchModal;
