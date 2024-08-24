"use client"

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import Ombak from 'public/images/chat/Ombak.png'

const ConfirmationModal = ({
  title,
  description,
  buttonLabel1,
  buttonLabel2,
}:{
  title: string
  description?: string
  buttonLabel1: string
  buttonLabel2?: string
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Ukuran, Warna, Typography Mengikuti Figma, Tidak Bisa Rounded :( */}
      <AlertDialogContent className='w-[343px] rounded-[32px] border-none bg-blue-600 text-white flex flex-col items-center shadow-blue-xl overflow-hidden'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center font-subheading text-2xl uppercase'>
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className='flex flex-col items-center gap-y-4 space-y-4'>
            <div className='flex items-center gap-x-4'>
              <AlertDialogCancel className='bg-pink-300 hover:bg-pink-400 border-white text-neutral-50 hover:text-neutral-100 rounded-[13px] font-body focus-visible:ring-transparent w-[120px] text-xl'>
                {buttonLabel1}
              </AlertDialogCancel>
              <AlertDialogAction className='bg-neutral-50 border-blue-200 text-blue-600 hover:bg-neutral-100 w-[120px] rounded-[13px]'>
                {buttonLabel2}
              </AlertDialogAction>
            </div>
            <p>{description}</p>
          </div>
        </AlertDialogFooter>
        <Image 
          src={Ombak}
          alt='Ombak'
          className='absolute bottom-0 w-full translate-y-[150px] -z-20 rounded-[10px] opacity-50'
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationModal