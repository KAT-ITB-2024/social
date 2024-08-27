import Image from 'next/image';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export const HistoryCard = ({
  id,
  profile,
  name,
  lastMessageTime,
}: {
  id: string;
  profile: null;
  name: string;
  lastMessageTime: Date;
}) => {
  return (
    <div
      style={{
        background:
          'linear-gradient(95deg, #0CEBCCE6 -31.4%, #3678FFE6 119.25%)',
      }}
      className=" w-full flex justify-between items-center rounded-[12px] px-[22px] py-[15px]"
    >
      <div className="w-fit flex gap-[10px] items-center">
        <Image
          src={profile ?? '/images/history/profile-default.png'}
          alt="Profile"
          width={48}
          height={48}
        />
        <h4 className="text-white font-normal">{name}</h4>
      </div>
      <p className="text-b5 text-white">
        {format(lastMessageTime, 'd/MM/yy HH.mm', {
          locale: idLocale,
        })}
      </p>
    </div>
  );
};
