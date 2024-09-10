'use client';

import Stories from 'react-insta-stories';
import { WrappedStories } from './Content';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
// import { type WrappedProfiles } from '@katitb2024/database';
import { type OSKMWrapped } from '~/types/payloads/wrapped';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { useSession } from 'next-auth/react';
import { resultOf } from '@trpc/client/dist/links/internals/urlWithConnectionParams';
import { toast } from 'sonner';
import { ErrorToast } from '~/components/ui/error-toast';

const inputWrapped: OSKMWrapped = {
  name: 'Lomba Sihir',
  totalMatch: 10,
  submittedQuest: 30,
  favTopics: ['Jendral Daemon'],
  rankPercentage: '200',
  test: true,
  character: 'Sylas',
  personality: 'YWMO',
  personalityDesc: 'Yowaimo Yowaimo Yowaimo',
  rank: 69,
  favTopicCount: 69,
};

function Wrapped() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oskmWrapped, setOSKMWrapped] = useState<OSKMWrapped | null>(null);

  const [clicked, setClicked] = useState<boolean>(false);
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

  const handleImage = (image: File) => {
    setFile([image]);
    setClicked(true);
  };

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
        handleImage,
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

  useEffect(() => {
    const handleShare = async () => {
      if (file.length < 0) {
        setTimeout(() => {
          console.log('Waiting...');
          console.log(file);
        }, 2000);
      }
      try {
        console.log(file);
        await navigator
          .share({ files: file })
          .then(() => console.log('Success!'));
      } catch (err) {
        console.log(err);
        console.log(`Check File (${file.length}): ` + String(file));
        clicked &&
          toast(
            <ErrorToast
              title="Share Unavailable!"
              desc="Silakan coba lagi atau unduh OSKM Wrapped-mu!"
            />,
          );
      }
    };

    handleShare().catch(console.error);
  }, [file]);

  if (loadingFetchingData || status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div
          className={
            isLoading ? 'blur-md' : 'blur-none transition duration-1000'
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
