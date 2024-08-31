'use client';
import { redirect, useRouter } from 'next/navigation';
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
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import NoMatchModal from '~/components/chat/newchat/NoMatchModal';
// Import Images
import MatchBg from 'public/images/chat/bg-matchfriend.png';
import CoralBg from 'public/images/chat/coral-left.png';

// Import Component
import BottomBar from '~/components/chat/bottombar/Bottombar';

import { useSession } from 'next-auth/react';

export default function MatchPage() {
  const { data: session, status } = useSession();

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
      setCountdown(20);
    }
  };

  const cancelFindMatch = () => {
    if (queued.current) {
      cancelEmit.mutate({});
      setIsLoading(false);
      setNoMatch(false);
      setCountdown(0);
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

  const showChatForm = () => {
    setShowForm(true);
  };

  const changeToGeneral = () => {
    setTopic(ChatTopic.GENERAL);
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
    void router.push(`/chat/room`);
  });

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          console.log('Current Countdown:', prev);
          if (prev === 1) {
            cancelFindMatch();
            setNoMatch(true);
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading]);

  if (noMatch) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <NoMatchModal
          title="MATCH NOT FOUND!"
          description="Tenang Aqualings kami akan carikan teman yang cocok, silakan pilih aksi berikutnya!"
          buttonLabelConfirm="Kembali ke Menu"
          buttonLabelCancel="Ganti topik General"
          onConfirm={() => {
            setNoMatch(false);
            setShowForm(false);
          }}
          onCancel={() => {
            changeToGeneral();
            findMatch();
          }}
        />
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

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
      <div className="relative h-full w-full bg-white overflow-hidden">
        <div className="flex flex-col items-center h-full justify-start px-8 relative z-20">
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
          {/* Bottom Bar */}
          <BottomBar />
        </div>

        {/* Background */}
        <Image
          src={MatchBg}
          alt="OSKM Chat Match Background"
          className="absolute top-0 left-0 object-cover h-full w-full z-10"
        />

        <Image
          src={CoralBg}
          alt="Coral"
          className="absolute bottom-0 left-0 z-10"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
}
