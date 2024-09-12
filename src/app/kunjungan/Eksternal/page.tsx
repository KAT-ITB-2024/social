"use client"

import React from 'react'
import Image from 'next/image';
import bgtl from 'public/images/kunjungan/UKM/bg-tl.png';
import bgtr from 'public/images/kunjungan/UKM/bg-tr.png';
import bgbl from 'public/images/kunjungan/UKM/bg-bl.png';
import LembagaDummy from 'public/images/kunjungan/LemagaDummy.png'
import Link from 'next/link';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { MoveRight } from 'lucide-react';

const EksternalPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={bgtl}
        alt="bg-tl"
        className="absolute left-0 top-0 z-20 w-[35%]"
      />
      <Image
        src={bgtr}
        alt="bg-tr"
        className="absolute right-0 top-[4vh] z-20 w-[25%]"
      />
      <Image
        src={bgbl}
        alt="bg-bl"
        className="absolute bottom-0 left-0 z-20 w-[80%]"
      />

      <div
        className="flex min-h-screen w-full max-w-[450px] flex-col bg-transparent p-0 py-24"
        style={{
          backgroundImage: "url('/images/kunjungan/bg-main.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="relative z-30 flex w-full flex-col items-center gap-6 p-10">
          <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
            Eksternal
          </h3>
          <div className='space-y-4'>
            {/* Input  */}
            <Input className='w-[400px] h-[50px] focus-visible:ring-transparent border-orange-400 border-2 placeholder:text-orange-300' placeholder='Search...' />

            {/* Lembaga */}
            <div className='space-y-2'>
              {/* Lembaga Item */}
              <div className='w-[400px] h-[75px] border-2 border-orange-500 shadow-orange-sm rounded-xl bg-gradient-to-r from-transparent to-orange-200/75 flex items-center justify-between px-4'>
                <div className='flex gap-x-2 items-center'>
                  <div className='relative'>
                    <Image 
                      src={LembagaDummy}
                      alt='Lembaga Dummy'
                      height={72}
                      width={72}
                    />
                    {/* Gambar Lembaga */}
                    <div className='absolute top-3 left-4 -z-20 rounded-full bg-orange-300 w-[45px] h-[45px]'>

                    </div>
                  </div>
                  <h3 className='text-2xl font-bold text-orange-500'>Lembaga Skibidi</h3>
                </div>
                <div>
                  <Link href={`/kunjungan/eksternal`}>
                    <Button className='bg-orange-400 hover:bg-orange-300 flex items-center justify-center p-2'>
                      <MoveRight className='text-xl' />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Lembaga Item */}
              <div className='w-[400px] h-[75px] border-2 border-orange-500 shadow-orange-sm rounded-xl bg-gradient-to-r from-transparent to-orange-200/75 flex items-center justify-between px-4'>
                <div className='flex gap-x-2 items-center'>
                  <div className='relative'>
                    <Image 
                      src={LembagaDummy}
                      alt='Lembaga Dummy'
                      height={72}
                      width={72}
                    />
                    {/* Gambar Lembaga */}
                    <div className='absolute top-3 left-4 -z-20 rounded-full bg-orange-300 w-[45px] h-[45px]'>

                    </div>
                  </div>
                  <h3 className='text-2xl font-bold text-orange-500'>Lembaga Skibidi</h3>
                </div>
                <div>
                  <Link href={`/kunjungan/eksternal`}>
                    <Button className='bg-orange-400 hover:bg-orange-300 flex items-center justify-center p-2'>
                      <MoveRight className='text-xl' />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EksternalPage