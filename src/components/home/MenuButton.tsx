'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const MenuButton = ({
  label,
  variant,
}: {
  label: string;
  variant: 'Chat' | 'Leaderboard' | 'OSKM MBTI' | 'Class Selection';
}) => {
  const router = useRouter();

  let cn = '';
  let imgSrc = '';
  let routePath = '';

  switch (variant) {
    case 'Chat':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-3';
      imgSrc = '/components/icon-chat.png';
      routePath = '/chat';
      break;
    case 'Leaderboard':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5';
      imgSrc = '/components/icon-leaderboard.png';
      routePath = '/leaderboard';
      break;
    case 'OSKM MBTI':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5';
      imgSrc = '/components/icon-mbti.png';
      routePath = '/oskm mbti';
      break;
    case 'Class Selection':
      cn =
        'border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-pink-200/75 bg-turquoise-100 rounded-xl ml-5 mr-3';
      imgSrc = '/components/icon-class.png';
      routePath = '/class-selection';
      break;
  }

  return (
    <>
      <div className="flex flex-col mt-24">
        <div className={cn} onClick={() => router.push(routePath)}>
          <Image
            src={imgSrc}
            className="w-20 h-auto"
            alt={label}
            width={74}
            height={74}
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
