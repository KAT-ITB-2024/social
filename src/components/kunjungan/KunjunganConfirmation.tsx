"use client"

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

import React from 'react'
import { cn } from '~/lib/utils';

const KunjunganConfirmation = ({
  image,
  title,
  description,
  isOpen,
  setIsOpen,
}:{
  image: StaticImageData
  title: String
  description: String
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className='rounded-[12px w-[300px] border border-orange-400 bg-white px-6 pb-6 pt-10 shadow-pink-xl'
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
        <AlertDialogDescription className="text-center font-normal text-pink-400">
          Apakah kamu yakin memilih kelas ini?
          <br />
          Kelas hanya dapat dipilih satu kali.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-orange-400 text-white hover:bg-orange-300 my-8"
          >
            Kembali
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default KunjunganConfirmation