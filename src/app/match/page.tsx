'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '~/components/Loading';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

export default function MatchPage() {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const queueEmit = useEmit('findMatch');
  const queued = useRef(false);

  const findMatch = () => {
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
      console.log('ini match');
      console.log(data.match);
      if (data.match !== undefined) {
        setIsLoading(false);
        void router.push(`/chat/room`);
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
    void router.push(`/chat/room`);
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

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session) {
    redirect('/login');
  }
  return (
    <div className="py-24">
      {/* to do : design page ini sendiri, tpi tiru aja cari panggil logic BE nya */}
      Match page
      <Button variant={'default'} onClick={findMatch}>
        Find Match!
      </Button>
    </div>
  );
}
