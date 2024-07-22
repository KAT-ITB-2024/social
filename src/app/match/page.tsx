'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';

export default function MatchPage() {
  const router = useRouter();
  const queueEmit = useEmit('findMatch');
  const queued = useRef(false);
  socket.connect();

  const findMatch = () => {
    queueEmit.mutate({
      isAnonymous: false,
    });
  };

  const checkEmit = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match !== undefined) {
        void router.push(`/match/room`);
      } else if (data.queue !== null) {
        queued.current = true;
      } else {
      }
    },
  });

  useEffect(() => {
    console.log('Check emit mutate');
    checkEmit.mutate({});
  }, [checkEmit.mutate]);

  useSubscription('match', (_) => {
    queued.current = false;
    void router.push(`/match/room`);
  });
  return (
    <div>
      Match page
      <Button variant={'default'} onClick={findMatch}>
        Find Match!
      </Button>
    </div>
  );
}
