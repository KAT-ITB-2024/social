'use client';

import Image from 'next/image';
import { useRouter, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClassData, ClassDetails } from '../classData';

export default function ClassDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<
    ClassDetails | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundClass = ClassData.find((cls) => cls.id === Number(params.id));
      if (!foundClass) {
        notFound();
        return;
      } else {
        setSelectedClass(foundClass);
      }
    }
  }, [params.id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmSelection = () => {
    if (selectedClass) {
      localStorage.setItem('confirmedClassId', selectedClass.id.toString());
    }
    closeModal();
    router.push('/ClassSelection');
  };

  if (!selectedClass) {
    return notFound;
  }

  return (
    <main className="flex flex-col items-center justify-center bg-orange-900 min-h-screen">
      <div
        className="fixed-width-container flex flex-col items-center"
        style={{
          backgroundImage:
            "url('/images/classSelection/bg-classSelection.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mt-24">
          <div className="-ml-2">
            <Image
              src="/icons/classSelection/keyboard_backspace.svg"
              alt="back"
              width={40}
              height={40}
              onClick={() => router.push('/ClassSelection')}
              className="cursor-pointer"
            />
          </div>
          <h3 className="text-orange-500 text-left mt-4 text-shado">
            {selectedClass.title}
          </h3>
          <div className="mt-2">
            <p className="inline-block border border-orange-500 text-orange-400 rounded-full px-4 py-1 text-sm">
              {selectedClass.date}
            </p>
          </div>
          <div className="mt-6">
            <b className="font-bold text-orange-400">PEMBICARA</b>
            <p className="text-orange-400 text-left">{selectedClass.speaker}</p>
          </div>
          <div className="mt-6">
            <b className="font-bold text-orange-400">DESKRIPSI</b>
            <p className="text-orange-400 text-left">{selectedClass.desc}</p>
          </div>
          <div className="mt-6">
            <b className="font-bold text-orange-400">LOKASI & WAKTU</b>
            <p className="text-orange-400 text-left">
              {selectedClass.location}
            </p>
            <p className="text-orange-400 text-left">{selectedClass.time}</p>
          </div>
        </div>
        <div className="mt-10">
          <Button className="bg-pink-400" onClick={openModal}>
            Daftar
          </Button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <h3 className="font-bold text-orange-500 mb-2">Pilih Kelas</h3>
              <p className="text-xs text-pink-400 mb-4">
                Apakah kamu yakin memilih kelas ini?
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  className="bg-orange-400 min-w-full h-auto text-xs text-white px-4 py-2 rounded"
                  onClick={confirmSelection}
                >
                  Pilih Sekarang
                </Button>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
                <Button
                  className="bg-transparent min-w-full h-auto text-xs inline-block border border-orange-400 text-orange-400 px-4 py-2 rounded "
                  onClick={closeModal}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
