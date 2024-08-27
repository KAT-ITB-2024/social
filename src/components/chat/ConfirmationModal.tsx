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

const ConfirmationModal = ({
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
      <AlertDialogContent className="w-[343px] rounded-[32px] border-none bg-blue-600 text-white flex flex-col items-center shadow-blue-xl overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-subheading text-2xl uppercase">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-col items-center gap-y-4">
            <div className="flex items-center gap-x-4">
              <AlertDialogAction
                className="bg-pink-300 hover:bg-pink-400 border-white text-neutral-50 hover:text-neutral-100 rounded-[13px] font-body focus-visible:ring-transparent w-[120px] text-lg"
                onClick={onConfirm}
              >
                {buttonLabelConfirm}
              </AlertDialogAction>
              <AlertDialogCancel
                className="bg-neutral-50 border-blue-200 border-[2px] text-blue-600 hover:bg-neutral-200 w-[120px] rounded-[13px] font-body text-lg"
                onClick={onCancel}
              >
                {buttonLabelCancel}
              </AlertDialogCancel>
            </div>
            <p className="text-center text-md px-8">{description}</p>
          </div>
        </AlertDialogFooter>
        <Image
          src={Ombak}
          alt="Ombak"
          className="absolute bottom-0 w-full translate-y-[150px] -z-20 rounded-[10px] opacity-50"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;
