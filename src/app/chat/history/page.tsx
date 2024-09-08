'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter instead of redirect

import { HistoryCard } from '~/components/history/HistoryCard';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
// Import Images
import Image from 'next/image';
import MatchBg from 'public/images/chat/bg-matchfriend.png';
import CoralBg from 'public/images/chat/coral-history.png';

// Import Component
import BottomBar from '~/components/chat/bottombar/Bottombar';

import { api } from '~/trpc/react';

const ChatHistory = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize useRouter for navigation

  const { isLoading, data } = api.message.chatHeadersAll.useQuery();

  if (status === 'loading' || isLoading) {
    return <LoadingSpinnerCustom />;
  }

  // Redirect if there's no session or the user role is not 'Peserta'
  if (!session || session.user.role !== 'Peserta') {
    router.push('/login'); // Use router.push instead of redirect
    return null; // Return null to prevent rendering the component while redirecting
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="relative z-20 flex h-full flex-col items-center justify-start px-8">
          <div className="h-full w-full overflow-auto py-24">
            <div className="no-scrollbar flex h-full w-full flex-col gap-[18px] overflow-y-scroll">
              {data && data.length > 0 ? (
                data.map((history) => (
                  <HistoryCard
                    id={history.userMatchId}
                    key={history.userMatchId}
                    lastMessageTime={history.endedAt}
                    name={history.user.name}
                    profile={history.user.profileImage}
                  />
                ))
              ) : (
                <p className="text-sm text-pink-300">
                  No chat history available.
                </p> // Display a message if no data is available
              )}
            </div>
          </div>
          {/* Bottom Bar */}
          <BottomBar />
        </div>

        {/* Background */}
        <Image
          src={MatchBg}
          alt="OSKM Chat Match Background"
          className="absolute left-0 top-0 z-10 h-full w-full object-cover"
        />

        <Image
          src={CoralBg}
          alt="Coral"
          className="absolute bottom-0 right-0 z-10"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
};

export default ChatHistory;
