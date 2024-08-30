'use client';

import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

const inputWrapped = {
  name: 'Lomba Sihir',
  jumlah_match: 250,
  quest_num: 30,
  fav_topics: ['Skibidi Toilet', 'Twice Jihyo', 'iShowSpeed'],
  percent: 200,
  test: false,
  character: 'Gojo Satoru',
  mbti: 'YWMO',
  mbti_desc: 'Yowaimo Yowaimo Yowaimo',
  leaderboard_rank: 69,
};

function Wrapped() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div
          className={
            isLoading ? 'blur-md' : 'blur-none transition duration-500'
          }
        >
          <Stories
            stories={WrappedStories(inputWrapped)}
            defaultInterval={10000}
            width={'100%'}
            height={'100vh'}
            onStoryStart={loading}
            // onAllStoriesEnd={() => router.push('/')}
            keyboardNavigation={true}
          />
        </div>
        <Button
          variant="link"
          size="icon"
          className="absolute right-5 top-7 z-[1000]"
          onClick={() => router.push('/')}
        >
          <X className="size-10" color="#fff" />
        </Button>
      </div>
    </>
  );
}

export default Wrapped;
