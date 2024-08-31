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
    <main className="flex max-h-screen flex-col items-center justify-center bg-turquoise-100">
      <div className="fixed-width-container z-0 flex min-h-screen flex-col items-center bg-classes bg-cover bg-center bg-no-repeat p-6 pt-32">
        <Image
          src={Coral1}
          alt="coral-1"
          className="absolute bottom-0 left-[12%] z-0 w-[29%]"
        />
        <Image
          src={Coral2}
          alt="coral-2"
          className="absolute bottom-0 left-0 z-0 w-[23%]"
        />
        <div className="scroll-container md:no-scrollbar z-10 mt-20 w-full max-w-md overflow-y-scroll px-6 py-4">
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
                onClick={() => handleCardClick(String(cls.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
