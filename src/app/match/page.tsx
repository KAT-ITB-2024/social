'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '~/components/loading';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';
import NewChatForm from '~/components/chat/newchat/NewChat';
import Image from 'next/image';
import Coral from 'public/images/chat/newchat/coral.png';
import AddIcon from 'public/icons/newchat/add-icon.svg';

export default function MatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const queueEmit = useEmit('findMatch');
  const queued = useRef(false);
  socket.connect();

  const findMatch = () => {
    console.log('Ini queued current', queued.current);
    if (!queued.current) {
      queueEmit.mutate({
        isAnonymous: false,
      });
      queued.current = true;
      setIsLoading(true);
    }
  };

  const cancelFindMatch = () => {
    if (queued.current) {
      cancelEmit.mutate({});
      setIsLoading(false);
      queued.current = false;
    }
  };

  const cancelEmit = useEmit('cancelMatch');

  const checkEmit = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match !== undefined) {
        setIsLoading(false);
        void router.push(`/match/room`);
      } else if (data.queue !== null) {
        queued.current = true;
      } else {
      }
    },
  });

  const showChatForm = () => {
    setShowForm(true);
  }

  useEffect(() => {
    checkEmit.mutate({});
    return () => {
      if (queued.current) {
        cancelEmit.mutate({});
      }
    };
  }, [checkEmit.mutate, cancelEmit.mutate]);

  useSubscription('match', (_) => {
    queued.current = false;
    void router.push(`/match/room`);
  });

  if (isLoading) {
    return (
      <div className="py-24">
        {/* To-Do : Ganti sama loading page dari FE */}
        <LoadingSpinner />
        <Button variant={'default'} onClick={cancelFindMatch}>
          Cancel
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-40">
      {showForm ? (
        <NewChatForm findMatch={findMatch} />
      ) : (
        <div className="flex flex-col items-center justify-evenly">
          <Image src={Coral} alt="coral" width={300} height={300} />
          <div className="flex flex-col items-center justify-center gap-8">
            <h3 className="text-blue-500 text-center">
              MULAI CHAT BARU <br /> DULU YUK!
            </h3>
            <Button
              className="bg-pink-300 rounded-full px-6 shadow-pink-md hover:bg-pink-400"
              onClick={showChatForm}
            >
              <Image src={AddIcon} alt="addicon" width={40} height={40} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
