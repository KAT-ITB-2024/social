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
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="relative h-full w-full overflow-hidden bg-white">
          <div className="relative z-20 flex h-full flex-col items-center justify-start px-8">
            <div className="flex flex-col items-center justify-center py-40">
              <Image src={Match} alt="match" width={300} height={300} />
              <div className="flex flex-col items-center justify-center gap-5">
                <LoadingText text="MATCHING UP..." />
                <BoxButton
                  color="orange"
                  size="custom"
                  onClick={cancelFindMatch}
                >
                  Cancel
                </BoxButton>
              </div>
            </div>
          </div>

          {/* Background */}
          <Image
            src={MatchBg}
            alt="OSKM Chat Match Background"
            className="absolute left-0 top-0 z-10 h-full w-full object-cover"
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

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-8">
          <div className="flex flex-col items-center justify-center">
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
                  <h3 className="text-center text-blue-500">
                    MULAI CHAT BARU <br /> DULU YUK!
                  </h3>
                  <Button
                    className="rounded-full bg-pink-300 px-6 shadow-pink-md hover:bg-pink-400"
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
          className="absolute left-0 top-0 z-10 h-full w-full object-cover"
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
