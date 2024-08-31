/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { type Message } from '@katitb2024/database';
import { RevealStatusEvent } from '~/types/enums/message';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';
import Messages from '~/components/chat/Messages';

import { api } from '~/trpc/react';

import { Textarea } from '~/components/ui/textarea';
import BubbleChat from '~/components/chat/BubbleChat';
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

const Chat = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [modals, setModals] = useState<Record<string, boolean>>({
    isRulesModalOpen: false,
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
  const [isRevealed, setIsRevealed] = useState(false);

  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [opponentTyping, setOpponentTyping] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatEndModalOpen, setIsChatEndModalOpen] = useState(false);
  const [chatEndTitle, setChatEndTitle] = useState(receiveChatEndTitle);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);

  const checkMatch = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match === undefined) {
        // TODO: redirect to match page
        void router.push('/chat');
      } else {
        if ((data.match.isRevealed && !isRevealed) || !data.match.isAnonymous) {
          setIsRevealed(true);
          setProfileName(data.profile?.name ?? null);
          setProfilePhoto(data.profile?.profileImage ?? null);
        }
      }
    },
  });

  const userMatchId = checkMatch.data?.match?.id;

  const messageQuery = api.message.getChat.useInfiniteQuery(
    { userMatchId: userMatchId! },
    {
      getNextPageParam: (d) => d.nextCursor,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!userMatchId,
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
    // setAskRevealPopup(true);
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

    // Set profile photo if available
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
    setOpponentId(
      match.firstUserId === session?.user.id
        ? match.secondUserId
        : match.firstUserId,
    );
    if (data === RevealStatusEvent.ASK) {
      // setShowRevealPopup(true);
      openModal('showRevealPopup');
    } else {
      if (data === RevealStatusEvent.ACCEPTED) {
        setIsRevealed(true);
      }
      openModal('revealResponsePopup');
    }
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

  // const [sentryRef] = useInfiniteScroll({
  //   loading: false,
  //   hasNextPage: true,f\
  //   onLoadMore: fetchMoreMessages,
  //   rootMargin: '0px 0px 400px 0px',
  // });

  useEffect(() => {
    const msgs = messageQuery.data?.pages.map((page) => page.messages).flat();
    addMessages(msgs);
  }, [messageQuery.data?.pages, addMessages]);

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

  if (!session) {
    redirect('/login');
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
          opponentId={opponentId}
          name={profileName}
          profilePhoto={profilePhoto}
        />
        {/* Chat Room */}
        {/* <div
          className="flex-grow flex flex-col-reverse overflow-y-auto p-4 mt-20 no-scrollbar z-10"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <BubbleChat
              key={index}
              date={msg.createdAt.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              text={msg.content}
              variant={msg.senderId === session?.user?.id ? 'sent' : 'received'}
            />
          ))}
        </div> */}
        <Messages
          messages={messages ?? []}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />

        {/* Pop up menu */}
        {isMenuOpen && (
          <div
            className={`w-full bg-blue-400 rounded-t-xl h-auto z-20 px-4 py-3 text-white absolute bottom-[72px]  transition-all duration-300 ease-out ${
              isMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            }`}
          >
            <ul className="flex flex-col gap-1">
              <li
                className="flex flex-row justify-start gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
                onClick={() => openModal('isEndConfirmationModalOpen')}
              >
                <Image
                  src="/icons/chat/stop-icon.svg"
                  alt="Stop Pembicaraan"
                  width={24}
                  height={24}
                />
                <span>Stop Pembicaraan</span>
              </li>
              <div className="w-full bg-white flex h-[0.5px]" />
              {!isRevealed && (
                <>
                  <li
                    className="flex flex-col gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
                    onClick={handleAskReveal}
                  >
                    <div className="flex flex-row justify-start gap-2">
                      <Image
                        src="/icons/chat/reveal-icon.svg"
                        alt="Minta Reveal Profile"
                        width={24}
                        height={24}
                      />
                      <span>Minta Reveal Profile</span>
                    </div>
                  </li>
                  <div className="w-full bg-white flex h-[1px]" />
                </>
              )}
              <li
                className="flex flex-row justify-start gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
                onClick={() => openModal('isRulesModalOpen')}
              >
                <Image
                  src="/icons/chat/rules-icon.svg"
                  alt="Peraturan"
                  width={24}
                  height={24}
                />
                <span>Peraturan</span>
              </li>
            </ul>
          </div>
        )}

        {/* Menu and text box container */}
        <div
          className={`flex flex-row items-center justify-between p-4 bg-blue-600 gap-2 shadow-orange-2xl
          ${isMenuOpen ? '' : 'rounded-t-2xl'}
        `}
        >
          <div
            className="flex flex-row p-2 rounded-full bg-turquoise-300 text-neutral-50 gap-0.5 cursor-pointer"
            onClick={toggleMenu}
          >
            <Image
              src={
                isMenuOpen ? '/icons/close-icon.svg' : '/icons/menu-white.svg'
              }
              alt="Menu"
              width={24}
              height={24}
            />
            Menu
          </div>

          <div className="flex-grow flex flex-row bg-neutral-50 rounded-2xl items-center pr-4 pl-2">
            <Textarea
              className="w-full rounded-none px-2 my-1 h-full max-h-32 overflow-y-auto border-0 text-area-scrollbar placeholder:text-blue-200 bg-neutral-50 "
              rows={2}
              value={newMessage}
              onChange={handleTyping}
              placeholder="Ketik pesan kamu di sini..."
            />
            <div className="my-2 ml-4">
              <button
                className="bg-blue-300 text-white rounded-full w-[24px] h-[24px] items-center flex justify-center"
                onClick={handleSendMessage}
              >
                <Image
                  src="/icons/chat/chevron-right.svg"
                  alt="Send"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>

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
