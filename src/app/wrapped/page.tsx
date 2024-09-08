'use client';

import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { type WrappedProfiles } from '@katitb2024/database';
import { type OSKMWrapped } from '~/types/payloads/wrapped';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { useSession } from 'next-auth/react';

const inputWrapped = {
  name: 'Lomba Sihir',
  totalMatch: 0,
  submittedQuest: 30,
  favTopics: [],
  // countMostFav: [],
  percent: 200,
  test: true,
  character: 'sylas',
  personality: 'YWMO',
  personalityDesc: 'Yowaimo Yowaimo Yowaimo',
  rank: 69,
};

function Wrapped() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oskmWrapped, setOSKMWrapped] = useState<OSKMWrapped | null>(null);
  /* const [oskmWrapped, setOSKMWrapped] = useState<OSKMWrapped>(inputWrapped); */

  const [file, setFile] = useState<File[]>([]);

  const handleBack = () => {
    router.push('/personality');
  };

  const [stories, setStories] = useState<
    { content: () => JSX.Element }[] | null
  >(null);

  const { data: session, status } = useSession();

  const { data: wrappedData, isLoading: loadingFetchingData } =
    api.wrapped.getWrapped.useQuery();

  // Update state langsung jika data ada
  useEffect(() => {
    const mappedWrapped = wrappedData
      ? {
          name: wrappedData.name,
          totalMatch: wrappedData.totalMatch,
          submittedQuest: wrappedData.submittedQuest,
          favTopics: wrappedData.favTopics ?? [], // default to empty array if null
          test: wrappedData.character !== null, // test is true if character is not null
          character: wrappedData.character ?? '', // default to empty string if null
          personality: wrappedData.personality ?? '', // default to empty string if null
          personalityDesc: wrappedData.personalityDesc ?? '', // default to empty string if null
          rank: wrappedData.rank,
          rankPercentage: wrappedData.rankPercentage,
          favTopicCount: wrappedData.favTopicCount,
        }
      : null;
    if (mappedWrapped && !oskmWrapped) {
      setOSKMWrapped(mappedWrapped);
      const result = WrappedStories({
        oskmWrapped: mappedWrapped,
        file,
        setFile,
        handleBack,
      });

      if (mappedWrapped.favTopics.length > 0 && mappedWrapped.totalMatch > 0) {
        setStories(result);
      } else {
        setStories(
          result.slice(0, 1).concat(result.slice(2, 3).concat(result.slice(4))),
        );
      }
    }
  }, [wrappedData]);
  if (loadingFetchingData || status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
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
          {oskmWrapped && stories && (
            <Stories
              stories={stories}
              defaultInterval={10000}
              width={'100%'}
              height={'100vh'}
              onStoryStart={loading}
              onAllStoriesEnd={() => router.push('/')}
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
