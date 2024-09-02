'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { type UserMatch, type Message } from '@katitb2024/database';
import { RevealStatusEvent } from '~/types/enums/message';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import Messages from '~/components/chat/Messages';
import { api } from '~/trpc/react';
import RulesModal from '~/components/chat/RulesModal';
import ConfirmationModal from '~/components/chat/ConfirmationModal';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import InformationModal from '~/components/chat/InformationModal';
import ChatNavbar from '~/components/chat/ChatNavbar';
import {
  successRevealTitle,
  successRevealDescription,
  failedRevealTitle,
  failedRevealDescription,
  sendChatEndTitle,
  receiveChatEndTitle,
} from './constants';
import { ChatMenu } from '~/components/chat/Menu';
import { ChatFooter } from '~/components/chat/ChatFooter';

const Chat = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [modals, setModals] = useState<Record<string, boolean>>({
    isRulesModalOpen: true,
    isEndConfirmationModalOpen: false,
    showRevealPopup: false,
    askRevealPopup: false,
    revealResponsePopup: false,
  });

  const openModal = (modalName: string) => {
    setModals((prevState) => {
      const newState = { ...prevState };
      for (const key in newState) {
        newState[key] = key === modalName;
      }
      return newState;
    });
  };

  const closeModal = () => {
    setModals((prevState) => {
      const newState = { ...prevState };
      for (const key in newState) {
        newState[key] = false;
      }
      return newState;
    });
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [revealStatus, setRevealStatus] = useState<RevealStatusEvent | null>(
    null,
  );

  const [opponentTyping, setOpponentTyping] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatEndModalOpen, setIsChatEndModalOpen] = useState(false);
  const [chatEndTitle, setChatEndTitle] = useState(receiveChatEndTitle);
  const [match, setMatch] = useState<UserMatch | null>(null);
  const { data: profileData, refetch } = api.profile.getOthersProfile.useQuery({
    userId:
      match === null
        ? ''
        : match.firstUserId === session?.user.id
          ? match.secondUserId
          : match.firstUserId,
  });

  useEffect(() => {
    if (profileData === undefined && match?.isRevealed) {
      void refetch();
    }
  }, [match, refetch, profileData]);

  const checkMatch = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match === undefined) {
        void router.push('/chat');
      } else {
        setMatch(data.match);
      }
    },
  });

  const messageQuery = api.message.getChat.useInfiniteQuery(
    { userMatchId: match?.id ?? '' },
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!match,
    },
  );

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = messageQuery;

  const endMatchEmit = useEmit('endMatch');
  const anonTypingEmit = useEmit('anonTyping');
  const askRevealEmit = useEmit('askReveal');
  const messageEmit = useEmit('message');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAskReveal = () => {
    askRevealEmit.mutate({ state: RevealStatusEvent.ASK });
    openModal('askRevealPopup');
  };

  const addMessages = useCallback((incoming?: Message[]) => {
    setMessages((current) => {
      const map: Record<Message['id'], Message> = {};
      for (const msg of current ?? []) map[msg.id] = msg;
      for (const msg of incoming ?? []) map[msg.id] = msg;
      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    });
  }, []);

  const endMatch = () => {
    setChatEndTitle(sendChatEndTitle);
    endMatchEmit.mutate({});
  };

  const handleRevealResponse = (response: RevealStatusEvent) => {
    askRevealEmit.mutate({ state: response });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    anonTypingEmit.mutate({});
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      messageEmit.mutate({ message: newMessage.trim() });
      setNewMessage('');
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto'; // Reset to initial height
      }
    }
  };

  useEffect(() => {
    checkMatch.mutate({});
  }, []);

  // saat nerima event message dari server
  useSubscription('add', (post) => {
    if (post.userMatchId !== null) {
      addMessages([post]);
    }
  });

  // saat nerima event askReveal dari server
  useSubscription('askReveal', (match, data) => {
    setRevealStatus(data);
    if (data === RevealStatusEvent.ASK) {
      openModal('showRevealPopup');
    } else {
      openModal('revealResponsePopup');
      if (data === RevealStatusEvent.ACCEPTED) {
        setMatch(match);
      }
    }
    [match, messageQuery];
  });

  // saat nerima event endMatch dari server
  useSubscription('endMatch', () => {
    setIsChatEndModalOpen(true);
  });

  // saat nerima event anonisTyping dari server
  useSubscription('anonIsTyping', () => {
    setOpponentTyping(true);
    setTimeout(() => setOpponentTyping(false), 1000);
  });

  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.messages).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div
          className="fixed-width-container flex flex-col"
          style={{
            backgroundImage: "url('/images/chat/bg-chat-room.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
          }}
        >
          <LoadingSpinnerCustom />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/chat/bg-chat-room.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <ChatNavbar
          isTyping={opponentTyping}
          opponentId={profileData?.[0] ? profileData[0].userId : ''}
          name={
            match?.isRevealed && profileData?.[0] ? profileData[0]?.name : null
          }
          profilePhoto={
            match?.isRevealed && profileData?.[0]
              ? profileData[0].profileImage
              : null
          }
        />
        {/* Chat Room */}
        <Messages
          messages={messages ?? []}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />

        {/* Pop up menu */}
        {isMenuOpen && (
          <ChatMenu
            match={match}
            isMenuOpen={isMenuOpen}
            handleAskReveal={handleAskReveal}
            openModal={openModal}
          />
        )}

        {/* Menu and text box container */}
        <ChatFooter
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          newMessage={newMessage}
          handleTyping={handleTyping}
          handleSendMessage={handleSendMessage}
        />

        {/* Modals */}
        <RulesModal
          isOpen={modals.isRulesModalOpen}
          setIsOpen={() => closeModal()}
        />
        {/* End Chat Modal */}
        <ConfirmationModal
          isOpen={modals.isEndConfirmationModalOpen}
          setIsOpen={() => closeModal()}
          title={'Kamu Yakin Mau End Chat-Nya?'}
          buttonLabelConfirm={'Yakin'}
          buttonLabelCancel={'Gajadi'}
          onConfirm={endMatch}
          description="Chat ini akan tersimpan di history chat kamu ya!"
        />

        {/* Show Reveal Modal */}
        <ConfirmationModal
          isOpen={modals.showRevealPopup}
          setIsOpen={() => closeModal()}
          title={'Kamu Diminta Reveal Profile Nih!'}
          buttonLabelConfirm={'Gas :D'}
          buttonLabelCancel={'Malu :('}
          onConfirm={() => handleRevealResponse(RevealStatusEvent.ACCEPTED)}
          onCancel={() => handleRevealResponse(RevealStatusEvent.REJECTED)}
        />

        {/* Success Request Ask Reveal */}
        <InformationModal
          title={'Berhasil Request Reveal Profile!'}
          description={'Semoga dia mau reveal profilenya ya :)'}
          buttonLabel={'Kembali'}
          isOpen={modals.askRevealPopup}
          setIsOpen={() => closeModal()}
        />

        {/* Reveal Response Popup */}
        <InformationModal
          isOpen={modals.revealResponsePopup}
          setIsOpen={() => closeModal()}
          title={
            revealStatus === RevealStatusEvent.ACCEPTED
              ? successRevealTitle
              : failedRevealTitle
          }
          description={
            revealStatus === RevealStatusEvent.ACCEPTED
              ? successRevealDescription
              : failedRevealDescription
          }
          buttonLabel={'Kembali'}
        />

        {/* End Chat Response */}
        <InformationModal
          isOpen={isChatEndModalOpen}
          setIsOpen={() => closeModal()}
          title={chatEndTitle}
          description={'Chat ini sudah tersimpan di history chat kamu ya!'}
          buttonLabel={'Balik ke Menu'}
          onClose={() => router.push('/chat')}
        />
      </div>
    </main>
  );
};

export default Chat;
