import React from 'react';
import Image from 'next/image';

export default function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-orange-900">
      <div
        className="fixed-width-container flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/components/bg-comingsoon.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Image
          src="/components/comingsoon.png"
          alt="Maintenance"
          width={350}
          height={350}
        />
        <div>
          <p className="-mt-2.5 text-pink-400 text-center text-xl px-10">
            {' '}
            Kapal selam kami sedang{' '}
          </p>
          <p className="text-pink-400 text-center text-xl px-10">
            {' '}
            menjelajahi samudera{' '}
          </p>
          <p className="text-pink-400 text-center text-xl px-10">
            {' '}
            selanjutnya....
          </p>
        </div>
        <p className="mt-64"></p>
      </div>
    </main>
  );
}
