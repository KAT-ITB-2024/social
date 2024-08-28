'use client';
// import Stories from '@ryse/react-insta-stories';
import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';

const inputWrapped = {
  jumlah_match: 250,
  quest_num: 30,
  fav_topic: 'Skibidi Toilet & Twice Jihyo',
  percent: 200,
  mbti: 'MLYT',
  mbti_desc: 'kamu sepertinya sering meleyot ya :D',
  jam: 24000,
};

function Wrapped() {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen overflow-hidden bg-black">
        <Stories
          stories={WrappedStories(inputWrapped)}
          defaultInterval={15000}
          width={'100%'}
          height={'100vh'}
          // onAllStoriesEnd={() => router.push('/')}
          preloadCount={3}
        />
        <Button
          variant="link"
          size="icon"
          className="absolute top-7 right-5 z-[1000]"
          onClick={() => router.push('/')}
        >
          <X className="size-10" color="#fff" />
        </Button>
      </div>
    </>
  );
}

export default Wrapped;
