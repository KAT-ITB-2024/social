'use client';
import { Button } from '~/components/ui/button';
import useEmit from '~/hooks/useEmit';
import { socket } from '~/utils/socket';

export default function MatchPage() {
  // const queueEmit = useEmit('findMatch');
  // socket.connect();

  return (
    <div>
      Match page
      <Button variant={'default'}>Start Chat!</Button>
    </div>
  );
}
