"use client"

import React, { useState } from 'react'

// Form Import
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RequestResetPasswordPayload } from '~/types/payloads/auth';

// Import Alert Dialog
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
} from "@/components/ui/alert-dialog"

// Image Import
import Image from 'next/image';
import Starfish from 'public/login/Starfish.png';
import CloseIcon from 'public/login/CloseIcon.svg'

const ForgotPasswordPage = () => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

  type RequestResetPasswordPayloadSchema = z.infer<typeof RequestResetPasswordPayload>

  const form = useForm<RequestResetPasswordPayloadSchema>({
    resolver: zodResolver(RequestResetPasswordPayload),
    defaultValues: {
      email: ""
    }
  })

  function onSubmit(values: RequestResetPasswordPayloadSchema) {
    console.log(values)
    setIsAlertOpen(true)
  }

  return (
    <div className='mt-[150px] flex flex-col gap-2 w-full items-center'>
      <h3 className='text-[60px] text-blue-500 text-center'>Lupa <br /> Password?</h3>
      <p className='text-blue-500 font-bold text-center'>Jangan Khawatir, Aqualings!</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 z-20 w-full'>
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-blue-500'>Email <span className='text-red-500'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Email' type='Email' className='focus-visible:ring-transparent border-neutral-400 rounded-lg border-2'/> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='py-2' />
          <div className='w-full flex justify-center'>
            <Button type="submit" className=" bg-blue-500 hover:bg-blue-400 shadow-lg px-8">Send</Button>
          </div>

          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent className='w-[300px] bg-blue-500 flex flex-col items-center border-none text-yellow text-center'>
                <div className='absolute top-4 right-4 text-2xl text-yellow cursor-pointer' onClick={() => setIsAlertOpen(false)}>
                  <Image 
                    src={CloseIcon}
                    alt='Close Icon'
                    width={24}
                    height={24}
                  />
                </div>
                <AlertDialogTitle className='flex flex-col items-center gap-y-4'>
                  <Image 
                    src={Starfish}
                    alt="Star"
                    height={150}
                    width={150}
                  />
                  <p className='text-center text-4xl font-normal'>
                    Email Terkirim    
                  </p>
                </AlertDialogTitle>
                <AlertDialogDescription className='text-yellow text-center font-normal'>
                  Cek email mu Aqualings, untuk mengubah password!
                </AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordPage