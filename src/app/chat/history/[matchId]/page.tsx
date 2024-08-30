'use client';
import { Message } from '@katitb2024/database';
import { notFound } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import HistoryBar from '~/components/chat/bottombar/HistoryBar';
import ChatNavbar from '~/components/chat/ChatNavbar';
import Messages from '~/components/chat/Messages';
import { api } from '~/trpc/react';

interface Params {
  matchId: string;
}

const HistoryChat = ({ params }: { params: Params }) => {
  const { matchId } = params;

  const [messages, setMessages] = useState<Message[]>([]);

  const getChatDetail = api.message.getSpecificChatHeader.useQuery({
    userMatchId: matchId,
  });
  const messageQuery = api.message.getChat.useInfiniteQuery(
    { userMatchId: matchId },
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!matchId,
    },
  );

  const addMessages = useCallback((incoming?: Message[]) => {
    setMessages((current) => {
      const map: Record<Message['id'], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;
      for (const msg of incoming ?? []) map[msg.id] = msg;
      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    });
  }, []);

  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.messages).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

  const { data } = getChatDetail;

  if (!data) {
    return notFound;
  }

  const { name, profilePic, endedAt } = data;

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = messageQuery;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/chat/bg-chat-room.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <ChatNavbar
          name={name ?? 'Anonymous'}
          profilePhoto={profilePic ?? null}
        />

        <Messages
          messages={messages ?? []}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <HistoryBar date={data.endedAt} />
      </div>
    </main>
  );
};

export default HistoryChat;
