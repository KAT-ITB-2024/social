'use client';
import { type Message } from '@katitb2024/database';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { RevealStatusEvent } from '~/types/enums/message';
import { socket } from '~/utils/socket';

export default function MatchPage() {
  const { data: session } = useSession({ required: true });

  if (!session) {
    redirect('/login');
  }
  // const queueEmit = useEmit('findMatch');
  // socket.connect();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showRevealPopup, setShowRevealPopup] = useState(false);
  const [revealStatus, setRevealStatus] = useState<RevealStatusEvent | null>(
    null,
  );
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [opponentTyping, setOpponentTyping] = useState(false);
  const router = useRouter();

  const checkMatch = useEmit('checkMatch', {
    onSuccess: (data) => {
      console.log('ini match');
      console.log(data.match);
      if (data.match === undefined) {
        void router.push('/match');
      }
    },
  });

  // emit event buat endMatch
  const endMatchEmit = useEmit('endMatch');

  // emit event buat anonTyping
  const anonTypingEmit = useEmit('anonTyping');

  // emit event buat askReveal
  const askRevealEmit = useEmit('askReveal');

  useEffect(() => {
    checkMatch.mutate({});
  }, [checkMatch.mutate, endMatchEmit.mutate]);

  // emit untuk message
  const messageEmit = useEmit('message');

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

  // saat nerima event message dari server
  // saat nerima event message dari server
  useSubscription('add', (post) => {
    if (post.userMatchId !== null) {
      addMessages([post]);
    }
  });
  // saat nerima event askReveal dari server
  useSubscription('askReveal', (match, data) => {
    setRevealStatus(data);
    setOpponentId(match.secondUserId);
    setShowRevealPopup(true);
  });

  // saat nerima event endMatch dari server
  useSubscription('endMatch', () => {
    router.push('/match');
  });

  // saat nerima event anonisTyping dari server
  useSubscription('anonIsTyping', () => {
    setOpponentTyping(true);
    setTimeout(() => setOpponentTyping(false), 1000);
  });

  const endMatch = () => {
    endMatchEmit.mutate({});
  };

  const handleRevealResponse = (response: RevealStatusEvent) => {
    askRevealEmit.mutate({ state: response });
    setShowRevealPopup(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    anonTypingEmit.mutate({});
  };
  return (
    <div className="py-24">
      Match page
      <div className="flex flex-col">
        {messages.map((message) => {
          return <p key={message.id}>{message.content}</p>;
        })}
      </div>
      {opponentTyping && <p>Opponent is typing...</p>}
      <input
        value={newMessage}
        className="rounded-xl border-2"
        onChange={handleTyping}
      />
      <button
        className="border-2 bg-blue px-4 py-2 rounded-xl ml-2"
        onClick={() => messageEmit.mutate({ message: newMessage })}
      >
        Send
      </button>
      <button
        className="border-2 bg-blue px-4 py-2 rounded-xl ml-2"
        onClick={() => askRevealEmit.mutate({ state: RevealStatusEvent.ASK })}
      >
        Ask to Reveal
      </button>
      <button
        className="border-2 px-4 py-2 rounded-xl ml-2"
        onClick={() => endMatch()}
      >
        End Match
      </button>
      {showRevealPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl">
            {revealStatus === RevealStatusEvent.ASK && (
              <>
                <p>User is asking to reveal identity. Do you accept?</p>
                <div className="mt-4">
                  <button
                    className="bg-green-500 px-4 py-2 rounded-xl mr-2"
                    onClick={() =>
                      handleRevealResponse(RevealStatusEvent.ACCEPTED)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 px-4 py-2 rounded-xl"
                    onClick={() =>
                      handleRevealResponse(RevealStatusEvent.REJECTED)
                    }
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
            {revealStatus === RevealStatusEvent.REJECTED && (
              <p>Reveal request was rejected.</p>
            )}
            {revealStatus === RevealStatusEvent.ACCEPTED && opponentId && (
              <p>Reveal accepted. Opponent ID: {opponentId}</p>
            )}

            <button
              className="bg-green-500 px-4 py-2 rounded-xl mr-2"
              onClick={() => setShowRevealPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
