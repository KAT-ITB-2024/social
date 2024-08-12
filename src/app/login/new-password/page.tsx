"use client"

import React from 'react'

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
import { ResetPasswordPayload } from '~/types/payloads/auth';

const NewPasswordPage = () => {
  type ResetPasswordPayloadSchema = z.infer<typeof ResetPasswordPayload>

  const form = useForm<ResetPasswordPayloadSchema>({
    resolver: zodResolver(ResetPasswordPayload),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    }
  })

  function onSubmit(values: ResetPasswordPayloadSchema) {
    console.log(values)
  }

  return (
    <div className='mt-[120px] flex flex-col gap-2 w-full items-center'>
      <h3 className='text-[60px] text-blue-500 text-center'>Password <br /> Baru</h3>
      <p className='text-blue-500  font-bold text-center'>Mari masukkan password baru, Aqualings!</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 z-20 w-full'>
          <FormField 
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-blue-500'>Email <span className='text-red-500'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Email' type='password' className='focus-visible:ring-transparent border-neutral-400 rounded-lg border-2'/> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-blue-500'>Confirm Password <span className='text-red-500'>*</span></FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Email' type='password' className='focus-visible:ring-transparent border-neutral-400 rounded-lg border-2'/> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='py-2' />
          <div className='w-full flex justify-center'>
            <Button type="submit" className=" bg-blue-500 hover:bg-blue-400 shadow-lg px-8">Send</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default NewPasswordPage