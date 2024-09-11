"use client"

import React from 'react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import IkanHijau from 'public/images/kunjungan/IkanHijau.png'
import IkanOrange from 'public/images/kunjungan/IkanOrange.png'
import BintangLaut from 'public/images/kunjungan/BintangLaut.png'
import CoralKanan from 'public/images/kunjungan/CoralKanan.png'
import CoralTengah from 'public/images/kunjungan/CoralTengah.png'
import CoralKiri from 'public/images/kunjungan/CoralKiri.png'
import LembagaDummy from 'public/images/kunjungan/LemagaDummy.png'
import Arrow from 'public/images/kunjungan/send.svg'
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

const HMPSLembagaDetailPage = () => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean);
  // @ts-ignore
  const latestSegment = segments.length > 0 ? segments[segments.length - 1].replace(/%20/g, ' ') : '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={IkanHijau}
        alt="bg-tl"
        className="absolute left-0 -top-16 z-20"
        width={256}
      />
      <Image
        src={IkanOrange}
        alt="bg-tr"
        className="absolute right-0 top-[2vh] z-20"
        width={100}
      />
      <Image
        src={BintangLaut}
        alt="bg-bl"
        className="absolute top-[125px] left-0 z-20"
        width={90}
      />
      <Image
        src={CoralKiri}
        alt="bg-bl"
        className="absolute bottom-0 left-0 z-20"
        width={125}
      />
      <Image
        src={CoralTengah}
        alt="bg-bl"
        className="absolute bottom-0 left-[75px] z-20"
        width={125}
      />
      <Image
        src={CoralKanan}
        alt="bg-bl"
        className="absolute bottom-0 right-0 z-20"
        width={350}
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
          <div className='space-y-2 text-center translate-y-[-50px]'>
            <div className='relative'>
              {/* FRAME */}
              <Image 
                src={LembagaDummy}
                alt='Lembaga Dummy'
                className='w-[266px] h-[250px]'
              />
              {/* FOTO LEMBAGA */}
              <div className='absolute top-9 left-[50px] -z-20 rounded-full bg-orange-300 w-[175px] h-[175px]'>
              
              </div> 
            </div>
            <h3 className="text-center font-heading text-h3 text-orange-500 text-shadow-orange-xl">
              {latestSegment}
            </h3>
            {
              latestSegment !== 'Pusat' && (
                <p className='text-pink-300 text-2xl text-shadow-orange-md'>
                  HMPS dan BSO HMPS
                </p>
              )
            }
          </div>
          <div className='translate-y-[-35px] space-y-2'>
            <div className='flex items-center w-full gap-x-4'>
              <Input className='border-2 border-orange-400 w-[300px] h-[50px] placeholder:text-orange-300 shadow-orange-md' placeholder='Masukkan Kode'/>
              <Button className='bg-orange-400 hover:bg-orange-300 shadow-orange-md h-[50px]'>
                <Image 
                  src={Arrow}
                  width={24}
                  height={24}
                  className='text-white'
                  alt='Arrow'
                />
              </Button>
            </div>
            <div>
              <Button variant={"outline"} className='w-full text-orange-400 hover:text-orange-500 hover:bg-orange-100/25 h-[50px] border-2 border-orange-400 bg-transparent'>
                Tentang Lembaga
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HMPSLembagaDetailPage