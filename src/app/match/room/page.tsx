'use client';
import { type Message } from '@katitb2024/database';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';

export default function MatchPage() {
  // const queueEmit = useEmit('findMatch');
  // socket.connect();
  const { data: session } = useSession({ required: true });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const checkMatch = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match === null) {
        void router.push('/match');
      }
    },
  });

  useEffect(() => {
    checkMatch.mutate({});
  }, []);

  const addMessages = useCallback((incoming?: Message[]) => {
    console.log('Incoming', incoming);
    setMessages((current) => {
      console.log('Current messages : ', current);
      const map: Record<Message['id'], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;

      for (const msg of incoming ?? []) map[msg.id] = msg;

      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    });
  }, []);

  useSubscription('add', (post) => {
    if (post.userMatchId !== null) {
      addMessages([post]);
    }
  });

  const messageEmit = useEmit('message');
  return (
    <div>
      Match page
      <div className="flex flex-col">
        {messages.map((message) => {
          return <p key={message.id}>{message.content}</p>;
        })}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={() => messageEmit.mutate({ message: newMessage })}>
        Send
      </button>
    </div>
  );
}
