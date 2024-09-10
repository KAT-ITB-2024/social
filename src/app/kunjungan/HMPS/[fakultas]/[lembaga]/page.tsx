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
          <div className='space-y-2 text-center'>
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
         
        </div>
      </div>
    </main>
  )
}

export default HMPSLembagaDetailPage