'use client';

import Image from 'next/image';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClassData } from './classData';
import { CustomCard } from '@/components/class-selection/ClassCard';

export default function ClassSelection() {
  const router = useRouter();
  const [confirmedClassId, setConfirmedClassId] = useState<number | null>(null);

  useEffect(() => {
    const savedClassId = localStorage.getItem('confirmedClassId');
    if (savedClassId) {
      setConfirmedClassId(Number(savedClassId));
    }
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/class-selection/${id}`);
  };

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
            {ClassData.filter((cls) => cls.reserved < cls.quota).map((cls) => (
              <CustomCard
                key={cls.id}
                topic={cls.topic}
                theme={cls.theme}
                title={cls.title}
                quota={cls.quota}
                reserved={cls.reserved}
                desc={cls.title}
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
