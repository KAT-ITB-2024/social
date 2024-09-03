'use client';

import { useState, useTransition } from 'react';
import { Chip } from '../Chip';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import InfoModal from '../InfoModal';
import Cumi from 'public/images/attendance/cumi.png';
import { api } from '~/trpc/react';
import { ErrorToast } from '../ui/error-toast';
import { toast } from 'sonner';

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
      attendanceMutation.mutate(
        {
          eventId: Id,
          presenceEvent: Sesi as 'Opening' | 'Closing',
        },
        {
          onSuccess: () => {
            setStatus('Hadir');
            setIsAlertOpen(true);
          },
          onError: (error) => {
            console.log(error);
            toast(<ErrorToast title="Oops!" desc="Gagal melakukan absensi" />);
          },
        },
      );
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
    <Card className="bg-card-radial w-full rounded-[12px] border-2 border-turquoise-300 px-6 py-4">
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex flex-col">
          <h1 className="font-subheading text-b3 font-bold text-blue-500">
            {Sesi}
          </h1>
          <h2 className="font-subheading text-b4 font-normal text-blue-500">
            Waktu: {Waktu}
          </h2>
        </div>
        {status === 'Alpha' && isInRange() && (
          <Button
            onClick={handleAbsen}
            disabled={isLoading}
            className="h-fit rounded-[4px] bg-pink-400 px-5 py-2 font-subheading text-xs font-normal text-shade-200 hover:bg-pink-500/80"
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
        <InfoModal
          image={Cumi}
          title="HADIR!"
          description="Kehadiran berhasil dicatat"
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          className="flex flex-col items-center rounded-[12px] border-none bg-blue-500 text-center text-yellow"
        />
      </CardContent>
    </Card>
  );
};
