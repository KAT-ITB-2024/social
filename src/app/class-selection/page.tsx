'use client';

import Image from 'next/image';

import Coral1 from 'public/images/class-selection/coral-1.png';
import Coral2 from 'public/images/class-selection/coral-2.png';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ClassData } from './classData';

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
      <div className="fixed-width-container bg-classes bg-center bg-no-repeat bg-cover p-6 pt-32 flex flex-col items-center min-h-screen">
        <Image
          src={Coral1}
          alt="coral-1"
          className="absolute bottom-0 left-[12%] w-[29%] z-10"
        />
        <Image
          src={Coral2}
          alt="coral-2"
          className="absolute bottom-0 left-0 w-[27%] z-10"
        />

        <div className="w-full max-w-md overflow-y-scroll p-4 mt-20 mb-32 scroll-container">
          <div className="grid gap-3">
            {ClassData.map((cls) => (
              <Card
                key={cls.id}
                className={`flex flex-col h-auto border-orange-400 shadow-orange-xl rounded-lg p-4 ${
                  cls.id === confirmedClassId ? 'bg-orange-200' : 'bg-white'
                } cursor-pointer`}
                onClick={() => handleCardClick(cls.id)}
              >
                <CardContent className="flex items-center justify-between">
                  <div className="-mb-5">
                    <CardTitle className="text-h5 md:text-base font-subheading flex-grow pr-4">
                      {cls.title}
                    </CardTitle>
                    <p>{cls.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
