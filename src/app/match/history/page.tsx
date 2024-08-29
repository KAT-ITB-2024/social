'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { HistoryCard } from '~/components/history/HistoryCard';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const dummy = [
  {
    id: '1',
    profile: null,
    name: 'John Doe',
    lastMessageTime: new Date(),
  },
  {
    id: '2',
    profile: null,
    name: 'John Doe 1',
    lastMessageTime: new Date(),
  },
  {
    id: '3',
    profile: null,
    name: 'John Doe 2',
    lastMessageTime: new Date(),
  },
  {
    id: '4',
    profile: null,
    name: 'John Doe 3',
    lastMessageTime: new Date(),
  },
  {
    id: '1',
    profile: null,
    name: 'John Doe',
    lastMessageTime: new Date(),
  },
  {
    id: '2',
    profile: null,
    name: 'John Doe 1',
    lastMessageTime: new Date(),
  },
  {
    id: '3',
    profile: null,
    name: 'John Doe 2',
    lastMessageTime: new Date(),
  },
  {
    id: '4',
    profile: null,
    name: 'John Doe 3',
    lastMessageTime: new Date(),
  },
  {
    id: '1',
    profile: null,
    name: 'John Doe',
    lastMessageTime: new Date(),
  },
  {
    id: '2',
    profile: null,
    name: 'John Doe 1',
    lastMessageTime: new Date(),
  },
  {
    id: '3',
    profile: null,
    name: 'John Doe 2',
    lastMessageTime: new Date(),
  },
  {
    id: '4',
    profile: null,
    name: 'John Doe 3',
    lastMessageTime: new Date(),
  },
];

const ChatHistory = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  return (
    <div className="w-full h-full overflow-auto py-24">
      <div className="w-full h-full flex flex-col gap-[18px] overflow-y-scroll no-scrollbar">
        {dummy.map((item) => (
          <HistoryCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
