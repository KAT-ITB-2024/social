'use client';
import Image from 'next/image';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

export const HistoryCard = ({
  id,
  profile,
  name,
  lastMessageTime,
}: {
  id: string;
  profile: string | null;
  name: string;
  lastMessageTime: Date | null;
}) => {
  const router = useRouter();
  return (
    <div
      style={{
        background:
          'linear-gradient(95deg, #0CEBCCE6 -31.4%, #3678FFE6 119.25%)',
      }}
      className=" w-full flex justify-between items-center rounded-[12px] px-[22px] py-[15px] hover:cursor-pointer"
      onClick={() => router.push(`/chat/history/${id}`)}
    >
      <div className="w-fit flex gap-[10px] items-center">
        <Image
          src={
            profile != null && profile != ''
              ? profile
              : '/images/history/profile-default.png'
          }
          alt="Profile"
          width={48}
          height={48}
        />
        <h4 className="text-white font-normal truncate max-w-[140px]">
          {name}
        </h4>
      </div>
      <p className="text-b5 text-white">
        {format(lastMessageTime ?? Date.now(), 'd/MM/yy HH.mm', {
          locale: idLocale,
        })}
      </p>
    </div>
  );
};
