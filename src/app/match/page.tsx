'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '~/components/loading';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';

export default function MatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
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
      <div>
        {/* To-Do : Ganti sama loading page dari FE */}
        <LoadingSpinner />
        <Button variant={'default'} onClick={cancelFindMatch}>
          Cancel
        </Button>
      </div>
    );
  }
  return (
    <div>
      {/* to do : design page ini sendiri, tpi tiru aja cari panggil logic BE nya */}
      Match page
      <Button variant={'default'} onClick={findMatch}>
        Find Match!
      </Button>
    </div>
  );
}
