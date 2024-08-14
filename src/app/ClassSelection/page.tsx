'use client';

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
    router.push(`/ClassSelection/${id}`);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-orange-900">
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
        <div className="w-full max-w-md max-h-screen overflow-y-scroll p-4 mt-24 scroll-container">
          <div className="grid gap-3">
            {ClassData.map((cls) => (
              <Card
                key={cls.id}
                className={`flex flex-col h-auto border-white shadow-orange-lg rounded-lg p-4 ${
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
