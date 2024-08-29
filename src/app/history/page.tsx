'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Coral from 'public/images/history/Coral.png';
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/history/bg-chat-history.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        {/* Background */}
        <Image
          src={Coral}
          alt="BG-Coral"
          width={289}
          className="absolute right-0 bottom-5"
        />

        {/* Content */}
        <div className="w-full h-full px-6 pt-28 z-10 overflow-auto">
          <div className="w-full h-full flex flex-col gap-[18px] overflow-y-scroll no-scrollbar">
            {dummy.map((item) => (
              <HistoryCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatHistory;
