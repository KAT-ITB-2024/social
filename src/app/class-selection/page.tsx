'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomCard } from '@/components/class-selection/ClassCard';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { toast } from 'sonner';
import { ErrorToast } from '~/components/ui/error-toast';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';
import { type Class } from '@katitb2024/database';

export default function ClassSelection() {
  const router = useRouter();
  const [confirmedClassId, setConfirmedClassId] = useState<string | null>(null);
  const [allClasses, setAllClasses] = useState<Class[]>([]);

  const {
    data: classes,
    isLoading: classesLoading,
    error: classesError,
  } = api.class.getAllClasses.useQuery();

  const {
    data: enrolledClass,
    isLoading: enrolledClassLoading,
    error: enrolledClassError,
  } = api.class.getEnrolledClass.useQuery();

  useEffect(() => {
    if (enrolledClass) {
      setConfirmedClassId(enrolledClass.id);
    }
  }, [enrolledClass]);

  useEffect(() => {
    if (classes) {
      const sortedClasses = (classes ?? []).sort((a, b) => {
        if (a.id === confirmedClassId) return -1;
        if (b.id === confirmedClassId) return 1;
        return 0;
      });
      setAllClasses(sortedClasses);
    }
  }, [classes]);

  useEffect(() => {
    if (classesError ?? enrolledClassError) {
      toast(
        <ErrorToast desc="Failed to load classes. Please try again later." />,
      );
    }
  }, [classesError, enrolledClassError]);

  const handleCardClick = (id: string) => {
    router.push(`/class-selection/${id}`);
  };

  if (classesLoading ?? enrolledClassLoading) {
    return <LoadingSpinnerCustom />;
  }

  return (
    <main className="flex flex-col items-center justify-center bg-orange-900 max-h-screen">
      <div className="fixed-width-container bg-classes bg-center bg-no-repeat bg-cover p-6 pt-32 flex flex-col items-center min-h-screen z-0">
        <Image
          src={Coral1}
          alt="coral-1"
          className="absolute bottom-0 left-[12%] w-[29%] z-0"
        />
        <Image
          src={Coral2}
          alt="coral-2"
          className="absolute bottom-0 left-0 w-[23%] z-0"
        />
        <div className="z-10 w-full max-w-md overflow-y-scroll p-4 mt-20 scroll-container">
          <div className="grid gap-5">
            {allClasses?.map((cls) => (
              <CustomCard
                key={cls.id}
                topic={cls.topic ?? 'Unknown Topic'}
                title={cls.title}
                quota={cls.totalSeats}
                reserved={cls.reservedSeats ?? 0}
                desc={cls.description}
                variant={cls.id === confirmedClassId ? 'clicked' : 'default'}
                onClick={() => handleCardClick(cls.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
