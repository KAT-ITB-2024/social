'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import BubbleChat from './BubbleChat';
import { type Message } from '@katitb2024/database';

interface MessagesProps {
  messages: Message[];
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isFinished?: boolean;
}

const Messages = ({
  messages,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isFinished,
}: MessagesProps) => {
  const { data: session } = useSession();
  const [lastMessageRef, setLastMessageRef] = useState<HTMLDivElement | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingUp = useRef(false);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const container = containerRef.current;
    function listener() {
      if (container) {
        // check if containerRef scrolled max to the top in flex column reverse
        if (
          Math.abs(
            container.scrollTop -
              container.clientHeight +
              container.scrollHeight,
          ) < 3
        ) {
          fetchNextPage();
        }
      }
    }

    container?.addEventListener('scroll', listener);
    return () => container?.removeEventListener('scroll', listener);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    function listener() {
      if (container) {
        isScrollingUp.current = container.scrollTop < 0;
      }
    }
    container?.addEventListener('scroll', listener);
    return () => container?.removeEventListener('scroll', listener);
  }, []);

  useEffect(() => {
    if (
      lastMessageRef &&
      (!isScrollingUp.current || messages[0]?.senderId === session?.user.id)
    ) {
      lastMessageRef.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lastMessageRef, messages[0]?.senderId, session?.user.id]);

  return (
    <div
      className="flex-grow flex flex-col-reverse overflow-y-auto p-4 mt-20 no-scrollbar z-10"
      ref={containerRef}
    >
      {messages.map((msg, index) => (
        <BubbleChat
          key={index}
          date={msg.createdAt.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          text={msg.content}
          variant={msg.senderId === session?.user?.id ? 'sent' : 'received'}
          chatRef={index === 0 ? setLastMessageRef : null}
        />
      ))}
    </div>
  );
};

export default Messages;
