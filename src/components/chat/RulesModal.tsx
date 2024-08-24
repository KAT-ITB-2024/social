import React from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import Ombak from 'public/images/chat/Ombak.png'

const RulesModal = ({
  isOpen,
  setIsOpen
}:{
  isOpen: boolean
  setIsOpen: (params: boolean) =>  void;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Ukuran, Warna, Typography Mengikuti Figma */}
      <AlertDialogContent className='w-[343px] rounded-[32px] border-none bg-blue-600 text-white flex flex-col items-center space-y-4 shadow-blue-xl'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-center font-subheading'>
            <span className='text-[24px]'>SEBELUM CHAT-AN</span> <br /> <span className='text-[32px]'>JANJI DULU YUK!</span>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className='bg-white rounded-[20px] py-4 px-6 w-full text-start text-blue-400'>
          <p>1. Tidak boleh melakukan <span className='font-bold italic'>harassment</span></p>
          <p>2. Tidak boleh chat yang <span className='font-bold'>tidak pantas</span></p>
          <p>3. Tidak boleh menyinggung <span className='font-bold'>SARA</span></p>
          <p>4. Menggunakan bahasa yang <span className='font-bold'>baik </span>dan <span className='font-bold'>sopan</span></p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-pink-300 hover:bg-pink-400 border-white text-neutral-50 hover:text-neutral-100 rounded-[13px] font-body focus-visible:ring-transparent w-[192px] text-xl'>
            Siap Kak!
          </AlertDialogCancel>
        </AlertDialogFooter>
        <Image 
          src={Ombak}
          alt='Ombak'
          className='absolute bottom-0 w-full -z-20 rounded-[10px]'
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RulesModal