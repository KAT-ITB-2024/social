import React from 'react';
import Image from 'next/image';

export default function Maintenance() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-teal-800">
      <div
        className="fixed-width-container flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/components/bg-maintenance.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Image
          className="-mb-12"
          src="/components/maintenance.png"
          alt="Maintenance"
          width={300}
          height={300}
        />
        <h2 className="text-blue-600 text-center px-10">UNDER MAINTENANCE</h2>
        <p className="text-blue-600 text-center text-xl px-20">
          {' '}
          Bersiaplah Aqualings!{' '}
        </p>
        <p className="text-blue-600 text-center text-xl px-10">
          {' '}
          Sesuatu yang menakjubkan sedang dipersiapkan.{' '}
        </p>
      </div>
    </main>
  );
}
