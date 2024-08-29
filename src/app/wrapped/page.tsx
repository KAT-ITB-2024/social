'use client';
// import Stories from '@ryse/react-insta-stories';
import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { useRouter } from 'next/navigation';
// import { api } from '~/trpc/react';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';

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
  // const getUserStats = api.profile.getUserProfile.useQuery();
  // console.log(getUserStats)
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen overflow-hidden bg-black">
        <Stories
          stories={WrappedStories(inputWrapped)}
          defaultInterval={10000}
          width={'100%'}
          height={'100svh'}
          // onAllStoriesEnd={() => router.push('/')}
          preloadCount={3}
          keyboardNavigation={true}
        />
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
