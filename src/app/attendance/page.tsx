import Image from 'next/image';

// Image import
import Bubble from 'public/images/Bubble.png';
import Coral from 'public/images/Coral.png';
import CoralPensu from 'public/images/Coral Pensu.png';
import { AttendanceCard } from '~/components/attendance-card';

const dummy = [
  {
    day: 'DAY 2',
    data: [
      {
        Sesi: 'Sesi - 1 (Mentoring)',
        Waktu: '10:00 - 11:00',
        Status: 'BELUM ABSEN',
      },
      {
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
        Sesi: 'Sesi - 1 (Mentoring)',
        Waktu: '09:00 - 10:00',
        Status: 'HADIR',
      },
      {
        Sesi: 'Sesi - 2 (Mentoring)',
        Waktu: '10:00 - 11:00',
        Status: 'TIDAK HADIR',
      },
    ],
  },
];

export default function AttendancePage() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white z-0">
      <div className="h-screen w-full bg-turkwa bg-center bg-no-repeat bg-cover p-6 pt-32">
        {/* Background Component */}
        <Image
          src={Bubble}
          alt="bubble"
          className="fixed top-0 right-0 w-[90%] z-10"
        />
        <Image
          src={Coral}
          alt="coral"
          className="fixed right-0 bottom-0 w-[60%] z-10 opacity-70"
        />
        <Image
          src={CoralPensu}
          alt="coral pensu"
          className="fixed left-0 bottom-0 z-10"
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
