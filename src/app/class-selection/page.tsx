'use client';

import Image from 'next/image';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CustomCard } from '@/components/class-selection/ClassCard';
import { api } from '~/trpc/react';

export default function ClassSelection() {

  const router = useRouter();
  const { data: classes, isLoading, error } = api.class.getAllClasses.useQuery();
  const { data: enrolledClass } = api.class.getEnrolledClass.useQuery();

  const [confirmedClassId, setConfirmedClassId] = useState<string | null>(null);

  useEffect(() => {
    if (enrolledClass) {
      setConfirmedClassId(enrolledClass.id);
    }
  }, [enrolledClass]);

  const handleCardClick = (id: string) => {
    router.push(`/class-selection/${id}`);
  };

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error loading classes: {error.message}</p>;

  const sortedClasses = classes?.sort((a, b) => {
    if (a.id === confirmedClassId) return -1;
    if (b.id === confirmedClassId) return 1;
    return 0;
  });

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
          <div className="grid gap-3">
            {sortedClasses?.map((cls) => (
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
