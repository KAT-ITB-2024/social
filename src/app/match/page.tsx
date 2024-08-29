'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChatTopic } from '~/types/enum/chat';
import { socket } from '~/utils/socket';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';

import Image from 'next/image';
import NewChatForm from '~/components/chat/newchat/NewChat';
import Coral from 'public/images/chat/newchat/coral.png';
import AddIcon from 'public/icons/newchat/add-icon.svg';
import Match from 'public/images/chat/newchat/match.gif';
import LoadingText from '~/components/chat/newchat/LoadingText';
import BoxButton from '~/components/chat/newchat/BoxButton';
import { Button } from '~/components/ui/button';

export default function MatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [topic, setTopic] = useState<ChatTopic>(ChatTopic.GENERAL);
  const [jodoh, setJodoh] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);
  const router = useRouter();
  const queueEmit = useEmit('findMatch');
  const queued = useRef(false);
  socket.connect();

  const findMatch = () => {
    console.log('Ini queued current', queued.current);
    console.log('Anonymous:', anonymous);
    console.log('Topic:', topic);
    console.log('Jodoh:', jodoh);
    if (!queued.current) {
      queueEmit.mutate({
        isAnonymous: anonymous,
        topic: topic,
        isFindingFriend: anonymous,
      });
      queued.current = true;
      setIsLoading(true);
      setNoMatch(false);
      setCountdown(10);
    }
  };

  const cancelFindMatch = () => {
    if (queued.current) {
      cancelEmit.mutate({});
      setIsLoading(false);
      setNoMatch(false);
      queued.current = false;
    }
  };

  const cancelEmit = useEmit('cancelMatch');

  const checkEmit = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match !== undefined) {
        setIsLoading(false);
        void router.push(`/match/room`);
      } else if (data.queue !== null) {
        queued.current = true;
      } else {
      }
    },
  });

  const showChatForm = () => {
    setShowForm(true);
  };

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
    void router.push(`/match/room`);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          cancelFindMatch();
          setNoMatch(true);
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    },1000);

    return () => clearInterval(timer);
  },[isLoading,countdown]);

  if (noMatch) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <h2 className="text-red-500">NO MATCH FOUND</h2>
        <Button
          className="bg-pink-300 rounded-full px-6 shadow-pink-md hover:bg-pink-400"
          onClick={() => setNoMatch(false)} // Reset noMatch state
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Image src={Match} alt="match" width={300} height={300} />
        <div className="flex flex-col items-center justify-center gap-5">
          <LoadingText text="MATCHING UP..." />
          <BoxButton color="orange" size="custom" onClick={cancelFindMatch}>
            Cancel
          </BoxButton>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-40">
      {showForm ? (
        <NewChatForm
          findMatch={findMatch}
          setAnonymous={setAnonymous}
          setTopic={setTopic}
          setJodoh={setJodoh}
        />
      ) : (
        <div className="flex flex-col items-center justify-evenly">
          <Image src={Coral} alt="coral" width={300} height={300} />
          <div className="flex flex-col items-center justify-center gap-8">
            <h3 className="text-blue-500 text-center">
              MULAI CHAT BARU <br /> DULU YUK!
            </h3>
            <Button
              className="bg-pink-300 rounded-full px-6 shadow-pink-md hover:bg-pink-400"
              onClick={showChatForm}
            >
              <Image src={AddIcon} alt="addicon" width={40} height={40} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
