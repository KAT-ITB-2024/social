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
    <div className="bg-black h-screen w-full flex items-center justify-center">
      <div className="relative h-full w-full bg-white overflow-hidden">
        <div className="flex flex-col items-center h-full justify-start px-8 relative z-20">
          <div className="w-full h-full overflow-auto py-24">
            <div className="w-full h-full flex flex-col gap-[18px] overflow-y-scroll no-scrollbar">
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
                <p className="text-pink-300 text-sm">
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
          className="absolute top-0 left-0 object-cover h-full w-full z-10"
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
