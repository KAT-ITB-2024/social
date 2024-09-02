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

interface RulesModalProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const RulesModal = ({ isOpen = true, setIsOpen }: RulesModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Ukuran, Warna, Typography Mengikuti Figma, Tidak Bisa Rounded :( */}
      <AlertDialogContent className="flex w-[343px] flex-col items-center space-y-4 rounded-[32px] border-none bg-blue-600 text-white shadow-blue-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-subheading">
            <span className="text-[24px]">SEBELUM CHAT-AN</span> <br />{' '}
            <span className="text-[32px]">JANJI DULU YUK!</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="w-full rounded-[20px] bg-white px-6 py-4 text-start text-blue-400">
          <p>
            1. Tidak boleh melakukan{' '}
            <span className="font-bold italic">harassment</span>
          </p>
          <p>
            2. Tidak boleh chat yang{' '}
            <span className="font-bold">tidak pantas</span>
          </p>
          <p>
            3. Tidak boleh menyinggung <span className="font-bold">SARA</span>
          </p>
          <p>
            4. Menggunakan bahasa yang <span className="font-bold">baik </span>
            dan <span className="font-bold">sopan</span>
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-[192px] rounded-[13px] border-white bg-pink-300 font-body text-xl text-neutral-50 hover:bg-pink-400 hover:text-neutral-100 focus-visible:ring-transparent">
            Siap Kak!
          </AlertDialogCancel>
        </AlertDialogFooter>
        <Image
          src={Ombak}
          alt="Ombak"
          className="absolute bottom-0 -z-20 w-full rounded-[10px]"
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RulesModal;
