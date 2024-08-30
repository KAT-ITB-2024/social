'use client';

import { userMatches } from '@katitb2024/database';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter instead of redirect
import { HistoryCard } from '~/components/history/HistoryCard';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
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
          <p className="text-pink-300 text-sm">No chat history available.</p> // Display a message if no data is available
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
