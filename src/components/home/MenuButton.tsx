'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const MenuButton = ({
  label,
  variant,
}: {
  label: string;
  variant:
    | 'Assignment'
    | 'Attendance'
    | 'Chat'
    | 'Leaderboard'
    | 'OSKM MBTI'
    | 'Class Selection';
}) => {
  const router = useRouter();

  let cn = '';
  let imgSrc = '';
  let routePath = '';

  switch (variant) {
    case 'Assignment':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-3';
      imgSrc = '/images/home/navigation/assignment.png';
      routePath = '/assignment';
      break;
    case 'Attendance':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-3';
      imgSrc = '/images/home/navigation/attendance.png';
      routePath = '/attendance';
      break;
    case 'Chat':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-3';
      imgSrc = '/images/home/navigation/chat.png';
      routePath = '/chat';
      break;
    case 'Leaderboard':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5';
      imgSrc = '/images/home/navigation/leaderboard.png';
      routePath = '/leaderboard';
      break;
  }

  return (
    <>
      <div className="flex flex-col mt-24">
        <div className={cn} onClick={() => router.push(routePath)}>
          <Image
            src={imgSrc}
            className="w-16 h-auto"
            alt={label}
            width={70}
            height={70}
          />
        </div>
        <div className="text-sm text-turquoise-100 mt-3 text-center -mr-4">
          {label}
        </div>
      </div>
    </>
  );
};

export default MenuButton;
