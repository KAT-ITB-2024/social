'use client';

import { useTransition } from 'react';
import { Chip } from './Chip';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export const AttendanceCard = ({
  data,
}: {
  data: { Id: number; Sesi: string; Waktu: string; Status: string };
}) => {
  // !Optional for integration with backend function
  const [isLoading, startTransition] = useTransition();

  const { Id, Sesi, Waktu, Status } = data;

  const handleAbsen = () => {
    startTransition(() => {
      // !Optional
      console.log('Absen', Id);
    });
  };

  return (
    <Card className="w-full px-6 py-4 bg-card-radial border-turquoise-300 border-2 rounded-[12px]">
      <CardContent className="p-0 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-subheading font-bold text-b3 text-blue-500">
            {Sesi}
          </h1>
          <h2 className="font-subheading font-normal text-b4 text-blue-500">
            Waktu: {Waktu}
          </h2>
        </div>
        {Status === 'BELUM ABSEN' && (
          <Button
            onClick={handleAbsen}
            disabled={isLoading} // !Optional
            className="bg-pink-400 h-fit px-5 py-2 text-xs font-subheading font-normal text-shade-200 rounded-[4px] hover:bg-pink-500/80"
          >
            Tandai Hadir
          </Button>
        )}
        {Status === 'HADIR' && <Chip label="Hadir" variant="GREEN" />}
        {Status === 'TIDAK HADIR' && <Chip label="Tidak Hadir" variant="RED" />}
        {Status === 'SAKIT' && <Chip label="Sakit" variant="YELLOW" />}
      </CardContent>
    </Card>
  );
};
