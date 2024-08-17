'use client';

import { useState, useTransition } from 'react';
import { Chip } from './Chip';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import CustomDialog from './custom-dialog';
import Cumi from 'public/images/attendance/cumi.png';
import { api } from '~/trpc/react';
import { ErrorToast } from './ui/error-toast';

export const AttendanceCard = ({
  data,
}: {
  data: {
    Id: string;
    Tanggal: Date;
    Sesi: string;
    Waktu: string;
    Status: string;
  };
}) => {
  const { Id, Tanggal, Sesi, Waktu, Status } = data;

  const attendanceMutation = api.attendance.attend.useMutation();
  const [isLoading, startTransition] = useTransition();
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(Status);

  const handleAbsen = () => {
    startTransition(() => {
      try {
        attendanceMutation.mutate({
          eventId: Id,
          presenceEvent: Sesi as 'Opening' | 'Closing',
        });
        setStatus('Hadir');
        setIsAlertOpen(true);
      } catch (e) {
        ErrorToast({ title: 'Oops!', desc: 'Gagal melakukan absensi' });
      }
    });
  };

  const isInRange = () => {
    const currentTime = new Date();
    const timeRange = Waktu.split(' - ');
    const startTime = new Date(Tanggal);
    const endTime = new Date(Tanggal);
    startTime.setHours(
      parseInt(timeRange[0]?.split(':')[0] ?? ''),
      parseInt(timeRange[0]?.split(':')[1] ?? ''),
    );
    endTime.setHours(
      parseInt(timeRange[1]?.split(':')[0] ?? ''),
      parseInt(timeRange[1]?.split(':')[1] ?? ''),
    );

    return currentTime >= startTime && currentTime <= endTime;
  };

  const isLate = () => {
    const currentTime = new Date();
    const timeRange = Waktu.split(' - ');
    const endTime = new Date(Tanggal);
    endTime.setHours(
      parseInt(timeRange[1]?.split(':')[0] ?? ''),
      parseInt(timeRange[1]?.split(':')[1] ?? ''),
    );

    return currentTime > endTime;
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
        {status === 'Alpha' && isInRange() && (
          <Button
            onClick={handleAbsen}
            disabled={isLoading}
            className="bg-pink-400 h-fit px-5 py-2 text-xs font-subheading font-normal text-shade-200 rounded-[4px] hover:bg-pink-500/80"
          >
            Tandai Hadir
          </Button>
        )}
        {status === 'Hadir' && <Chip label="Hadir" variant="GREEN" />}
        {status === 'Alpha' && isLate() && (
          <Chip label="Tidak Hadir" variant="RED" />
        )}
        {status === 'Izin/Sakit' && <Chip label="Sakit" variant="YELLOW" />}

        {/* Modal Hadir */}
        <CustomDialog
          image={Cumi}
          title="HADIR!"
          description="Kehadiran berhasil dicatat"
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          className="bg-blue-500 flex flex-col items-center border-none text-yellow text-center rounded-[12px]"
        />
      </CardContent>
    </Card>
  );
};
