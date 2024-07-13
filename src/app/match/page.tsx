'use client';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';

export default function MatchPage() {
  const queueEmit = useEmit('findMatch');

  const findMatch = () => {
    queueEmit.mutate({
      isAnonymous: false,
    });
  };
  return (
    <div>
      Match page
      <Button variant={'default'} onClick={findMatch}>
        Find Match!
      </Button>
    </div>
  );
}
