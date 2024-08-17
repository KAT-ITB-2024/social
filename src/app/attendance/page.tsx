import Image from 'next/image';

// Image import
import Bubble from 'public/images/attendance/Bubble.png';
import Coral from 'public/images/attendance/Coral.png';
import CoralPensu from 'public/images/attendance/Coral Pensu.png';
import { AttendanceCard } from '~/components/attendance-card';

const dummy = [
  {
    day: 'DAY 2',
    data: [
      {
        Id: 1,
        Sesi: 'Sesi - 1 (Mentoring)',
        Waktu: '10:00 - 11:00',
        Status: 'BELUM ABSEN',
      },
      {
        Id: 2,
        Sesi: 'Sesi - 2 (Mentoring)',
        Waktu: '11:00 - 12:00',
        Status: 'SAKIT',
      },
    ],
  },
  {
    day: 'DAY 1',
    data: [
      {
        Id: 3,
        Sesi: 'Sesi - 1 (Mentoring)',
        Waktu: '09:00 - 10:00',
        Status: 'HADIR',
      },
      {
        Id: 4,
        Sesi: 'Sesi - 2 (Mentoring)',
        Waktu: '10:00 - 11:00',
        Status: 'TIDAK HADIR',
      },
    ],
  },
];

export default function AttendancePage() {
  return (
    <main className="flex min-h-screen w-screen max-w-md flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white z-0">
      <div className="min-h-screen w-full bg-[url('/images/attendance/Background.png')] bg-center bg-no-repeat bg-cover p-6 pt-28">
        {/* Background Component */}
        <Image
          src={Bubble}
          alt="bubble"
          className="absolute top-0 right-0 w-[90%] z-10"
        />
        <Image
          src={Coral}
          alt="coral"
          className="absolute right-0 bottom-0 w-[60%] z-10 opacity-70"
        />
        <Image
          src={CoralPensu}
          alt="coral pensu"
          className="absolute left-0 bottom-0 z-10"
        />

        {/* Content */}
        <h1 className="w-full relative z-20 text-blue-600 text-center font-heading font-normal text-h3 drop-shadow-orange-shadow pb-6">
          Attendance List
        </h1>
        <div className="flex flex-col gap-7">
          {dummy.map((day, index) => (
            <div
              key={index}
              className="w-full relative z-20 flex flex-col items-center justify-center gap-4"
            >
              <h1 className="w-full text-blue-600 text-center font-heading font-normal text-h4 drop-shadow-orange-shadow">
                {day.day}
              </h1>
              {day.data.map((data, index) => (
                <AttendanceCard key={index} data={data} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
