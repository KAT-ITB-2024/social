'use client';

import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { type WrappedProfiles } from '@katitb2024/database';
import { type OSKMWrapped } from '~/types/payloads/wrapped';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

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
  const [oskmWrapped, setOSKMWrapped] = useState<OSKMWrapped | null>(null);

  const { data: wrappedData, isLoading: loadingFetchingData } =
    api.wrapped.getWrapped.useQuery();
  const mappedWrapped = wrappedData
    ? {
        name: wrappedData.name,
        totalMatch: wrappedData.totalMatch,
        submittedQuest: wrappedData.submittedQuest,
        favTopics: wrappedData.favTopics ?? [], // default to empty array if null
        percent: wrappedData.rankPercentage,
        test: wrappedData.character !== null, // test is true if character is not null
        character: wrappedData.character ?? '', // default to empty string if null
        personality: wrappedData.personality ?? '', // default to empty string if null
        personalityDesc: wrappedData.personalityDesc ?? '', // default to empty string if null
        rank: wrappedData.rank,
      }
    : null;

  // Update state langsung jika data ada
  if (mappedWrapped && !oskmWrapped) {
    setOSKMWrapped(mappedWrapped);
  }
  if (loadingFetchingData) {
    return <LoadingSpinnerCustom />;
  }
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
          {oskmWrapped && (
            <Stories
              stories={WrappedStories({ oskmWrapped })}
              defaultInterval={10000}
              width={'100%'}
              height={'100vh'}
              onStoryStart={loading}
              // onAllStoriesEnd={() => router.push('/')}
              keyboardNavigation={true}
            />
          )}
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
