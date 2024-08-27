import { profile } from 'console';
import Image from 'next/image';
import Coral from 'public/images/history/Coral.png';
import { HistoryCard } from '~/components/history/HistoryCard';

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
