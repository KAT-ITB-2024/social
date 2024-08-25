'use client';

import Image from 'next/image';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';
import Jellyfish1 from 'public/images/class-selection/sea-creatures-1.png';
import Jellyfish2 from 'public/images/class-selection/sea-Creatures-2.png';
import SeaSlug from 'public/images/class-selection/SeaSlug.png';

import { useRouter, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClassData, ClassDetails } from '../classData';
import ClassConfirmationModal from '@/components/class-selection/ClassConfirmationModal';
import ClassInfoModal from '@/components/class-selection/ClassInfoModal';
import ClassFullModal from '@/components/class-selection/ClassFullModal';

export default function ClassDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<
    ClassDetails | undefined
  >();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isClassFullModalOpen, setIsClassFullModalOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

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

  const openConfirmationModal = () => {
    if (selectedClass && selectedClass.reserved >= selectedClass.quota) {
      setIsClassFullModalOpen(true);
    } else {
      setIsConfirmationModalOpen(true);
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const confirmSelection = () => {
    if (selectedClass) {
      localStorage.setItem('confirmedClassId', selectedClass.id.toString());
    }
    closeConfirmationModal();
    setIsInfoModalOpen(true);
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText = (text: string, maxLength: number) => {
    if (text.length > maxLength && !showFullText) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // const closeInfoModal = () => {
  //   setIsInfoModalOpen(false);
  //   router.push('/class-selection');
  // };

  if (!selectedClass) {
    return notFound;
  }

  const reservedPercentage =
    (selectedClass.reserved / selectedClass.quota) * 100;
  let seatColor;

  if (reservedPercentage >= 100) {
    seatColor = 'text-red-500';
  } else if (reservedPercentage >= 90) {
    seatColor = 'text-warning-500';
  } else {
    seatColor = 'text-green-500';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-orange-900 z-0">
      <div className="fixed-width-container bg-classes bg-center bg-no-repeat bg-cover p-6 pt-32 flex flex-col items-center min-h-screen">
        <Image
          src={Jellyfish2}
          alt="jellyfish-2"
          className="absolute -top-1 right-0 w-[20%] z-0"
        />
        <Image
          src={Jellyfish1}
          alt="jellyfish-1"
          className="absolute top-[5%] right-0 w-[27%] z-0"
        />
        <Image
          src={Coral1}
          alt="coral-1"
          className="absolute bottom-0 left-[12%] w-[29%] z-0"
        />
        <Image
          src={Coral2}
          alt="coral-2"
          className="absolute bottom-0 left-0 w-[27%] z-0"
        />

        <div className="container mt-20 z-10">
          <div className="-ml-2">
            <Image
              src="/icons/class-selection/keyboard_backspace.svg"
              alt="back"
              width={40}
              height={40}
              onClick={() => router.push('/class-selection')}
              className="cursor-pointer"
            />
          </div>
          <h3 className="text-orange-500 text-left -mt-1">
            {selectedClass.title}
          </h3>
          <div className="mt-1">
            <p className="inline-block border-2 border-orange-500 text-orange-400 rounded-full px-4 py-1 text-sm">
              {selectedClass.date}
            </p>
            <p
              className={`inline-block border-2 border-orange-500 ${seatColor} rounded-full px-4 py-1 text-sm ml-2`}
            >
              {selectedClass.reserved} / {selectedClass.quota}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="mt-2 ml-2">
            <b className="font-bold text-orange-400">PEMBICARA</b>
            <p className="text-orange-400 text-left">{selectedClass.speaker}</p>
          </div>
          <div className="mt-2 ml-2">
            <b className="font-bold text-orange-400">LOKASI & WAKTU</b>
            <p className="text-orange-400 text-left">
              {selectedClass.location}
            </p>
            <p className="text-orange-400 text-left">{selectedClass.time}</p>
          </div>
          <div className="mt-2 ml-2 mb-2">
            <b className="font-bold text-orange-400">DEPSKRIPSI</b>
          </div>
        </div>
        <div className="container -mt-2 z-10 overflow-y-scroll mb-3 h-28">
          <div className="mt-2 ml-2">
            <p className="text-orange-400 text-left">
              {truncatedText(selectedClass.desc, 100)}
            </p>
            {selectedClass.desc.length > 50 && (
              <button
                onClick={toggleText}
                className="text-orange-500 underline"
              >
                {showFullText ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
        <Button
          className="mb-32 w- bg-pink-400 z-0"
          onClick={openConfirmationModal}
        >
          Daftar
        </Button>

        <ClassConfirmationModal
          isOpen={isConfirmationModalOpen}
          setIsOpen={setIsConfirmationModalOpen}
          title="Pilih Kelas"
          description="Apakah kamu yakin memilih kelas ini?"
          onConfirm={confirmSelection}
          className=""
        />

        <ClassInfoModal
          isOpen={isInfoModalOpen}
          setIsOpen={setIsInfoModalOpen}
          title="Yeay!"
          description="Kamu berhasil terdaftar di kelas ini"
          image={SeaSlug}
          className=""
        />

        <ClassFullModal
          isOpen={isClassFullModalOpen}
          setIsOpen={setIsClassFullModalOpen}
        />
      </div>
    </main>
  );
}
