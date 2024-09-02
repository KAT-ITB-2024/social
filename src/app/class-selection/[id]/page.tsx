'use client';

import Image from 'next/image';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';
import Jellyfish1 from 'public/images/class-selection/sea-creatures-1.png';
import Jellyfish2 from 'public/images/class-selection/sea-Creatures-2.png';
import SeaSlug from 'public/images/class-selection/SeaSlug.png';

import { useRouter, notFound } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ClassConfirmationModal from '@/components/class-selection/ClassConfirmationModal';
import ClassInfoModal from '@/components/class-selection/ClassInfoModal';
import ClassFullModal from '@/components/class-selection/ClassFullModal';
import ClassEnrolledModal from '@/components/class-selection/ClassEnrolled';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { toast } from 'sonner';
import { SuccessToast } from '~/components/ui/success-toast';
import { ErrorToast } from '~/components/ui/error-toast';

export default function ClassDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isClassFullModalOpen, setIsClassFullModalOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isEnrolledModalOpen, setIsEnrolledModalOpen] = useState(false);

  const { data: enrolledClass } = api.class.getEnrolledClass.useQuery();

  const {
    data: selectedClass,
    isLoading,
    error,
  } = api.class.getClassById.useQuery(params.id);

  const { mutate: enrollClass } = api.class.enrollClass.useMutation({
    onSuccess: () => {
      localStorage.setItem('confirmedClassId', params.id);
      closeConfirmationModal();
      setIsInfoModalOpen(true);
      toast(
        <SuccessToast
          title="Enrollment success!"
          desc="You have successfully enrolled in the class."
        />,
      );
    },
    onError: (err) => {
      console.error(err.message);
      setIsEnrolledModalOpen(true);
      toast(<ErrorToast desc={`Enrollment failed: ${err.message}`} />);
    },
  });

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }
  if (error ?? !selectedClass) {
    notFound();
    return notFound;
  }

  const openConfirmationModal = () => {
    const totalSeats = selectedClass?.totalSeats ?? 0;
    const reservedSeats = selectedClass?.reservedSeats ?? 0;

    if (selectedClass && reservedSeats >= totalSeats) {
      setIsClassFullModalOpen(true);
    } else {
      setIsConfirmationModalOpen(true);
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const confirmSelection = () => {
    if (enrolledClass && enrolledClass.id !== selectedClass?.id) {
      setIsEnrolledModalOpen(true);
    } else {
      const classId = selectedClass?.id ?? '';
      enrollClass({ classId });
    }
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

  const totalSeats = selectedClass?.totalSeats ?? 0;
  const reservedPercentage =
    (selectedClass?.reservedSeats ?? 0 / totalSeats) * 100;
  let seatColor;

  if (reservedPercentage >= 100) {
    seatColor = 'text-red-500';
  } else if (reservedPercentage >= 90) {
    seatColor = 'text-warning-500';
  } else {
    seatColor = 'text-green-500';
  }

  const description = selectedClass?.description ?? 'Tidak ada penjelasan';

  return (
    <main className="z-0 flex min-h-screen flex-col items-center justify-center bg-turquoise-100">
      <div className="fixed-width-container no-scrollbar flex min-h-screen flex-col items-center overflow-y-auto bg-classes bg-cover bg-center bg-no-repeat p-6 pt-32">
        <Image
          src={Jellyfish2}
          alt="jellyfish-2"
          className="absolute -top-1 right-0 z-0 w-[20%]"
        />
        <Image
          src={Jellyfish1}
          alt="jellyfish-1"
          className="absolute right-0 top-[5%] z-0 w-[27%]"
        />
        <Image
          src={Coral1}
          alt="coral-1"
          className="absolute bottom-0 left-[12%] z-0 w-[29%]"
        />
        <Image
          src={Coral2}
          alt="coral-2"
          className="absolute bottom-0 left-0 z-0 w-[27%]"
        />

        <div className="container z-10 mt-20">
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
          <h3 className="-mt-1 text-left text-orange-500">
            {selectedClass.title}
          </h3>
          <div className="mt-[10px]">
            <p className="inline-block rounded-full border-2 border-orange-500 px-4 py-1 text-sm text-orange-400">
              {selectedClass.formattedDate}
            </p>
            <p
              className={`inline-block border-2 border-orange-500 ${seatColor} ml-2 rounded-full px-4 py-1 text-sm`}
            >
              {selectedClass.reservedSeats} / {selectedClass.totalSeats}
            </p>
          </div>
        </div>
        <div className="container z-10 my-4">
          <div className="rounded-sm border-2 border-orange-500 bg-white">
            <div className="ml-2 mt-2">
              <b className="font-bold text-orange-400">PEMBICARA</b>
              <p className="text-left text-orange-400">
                {selectedClass.speaker}
              </p>
            </div>
            <div className="ml-2 mt-2">
              <b className="font-bold text-orange-400">LOKASI & WAKTU</b>
              <p className="text-left text-orange-400">
                {selectedClass.location}
              </p>
              <p className="text-left text-orange-400">
                {selectedClass.formattedTime} WIB
              </p>
            </div>
            <div className="ml-2 mt-2">
              <b className="font-bold text-orange-400">DESKRIPSI</b>
              <div className="z-10 mb-3 h-28 overflow-y-scroll">
                <p className="text-left text-orange-400">
                  {truncatedText(String(description), 100)}
                </p>
                {description.length > 50 && (
                  <button
                    onClick={toggleText}
                    className="text-orange-500 underline"
                  >
                    {showFullText ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {!enrolledClass || enrolledClass.id !== selectedClass?.id ? (
          <Button
            className="z-0 mb-8 bg-pink-400"
            onClick={openConfirmationModal}
          >
            Daftar
          </Button>
        ) : null}

        <ClassConfirmationModal
          isOpen={isConfirmationModalOpen}
          setIsOpen={setIsConfirmationModalOpen}
          title="Pilih Kelas"
          description="Apakah kamu yakin memilih kelas ini?"
          onConfirm={confirmSelection}
        />

        <ClassInfoModal
          isOpen={isInfoModalOpen}
          setIsOpen={setIsInfoModalOpen}
          image={SeaSlug}
        />

        <ClassFullModal
          isOpen={isClassFullModalOpen}
          setIsOpen={setIsClassFullModalOpen}
        />

        <ClassEnrolledModal
          isOpen={isEnrolledModalOpen}
          setIsOpen={setIsEnrolledModalOpen}
        />
      </div>
    </main>
  );
}
