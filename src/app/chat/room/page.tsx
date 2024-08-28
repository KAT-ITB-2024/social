'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { type Message } from '@katitb2024/database';
import { RevealStatusEvent } from '~/types/enums/message';
import useEmit from '~/hooks/useEmit';
import useSubscription from '~/hooks/useSubscription';
import { socket } from '~/utils/socket';

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

  socket.connect();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showRevealPopup, setShowRevealPopup] = useState(false);
  const [askRevealPopup, setAskRevealPopup] = useState(false);
  const [revealResponsePopup, setRevealResponsePopup] = useState(false);
  const [revealStatus, setRevealStatus] = useState<RevealStatusEvent | null>(
    null,
  );
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [opponentTyping, setOpponentTyping] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isEndConfirmationModalOpen, setIsEndConfirmationModalOpen] =
    useState(false);
  const [isChatEndModalOpen, setIsChatEndModalOpen] = useState(false);
  const [chatEndTitle, setChatEndTitle] = useState(receiveChatEndTitle);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const checkMatch = useEmit('checkMatch', {
    onSuccess: (data) => {
      if (data.match === undefined) {
        // TODO: redirect to match page
        void router.push('/match');
      }
    },
  });

  const endMatchEmit = useEmit('endMatch');
  const anonTypingEmit = useEmit('anonTyping');
  const askRevealEmit = useEmit('askReveal');
  const messageEmit = useEmit('message');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAskReveal = () => {
    askRevealEmit.mutate({ state: RevealStatusEvent.ASK });
    setAskRevealPopup(true);
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
    setShowRevealPopup(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    anonTypingEmit.mutate({});
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      messageEmit.mutate({ message: newMessage.trim() });
      setNewMessage('');
    }
  };

  useEffect(() => {
    checkMatch.mutate({});
  }, [checkMatch.mutate, endMatchEmit.mutate]);

  // saat nerima event message dari server
  useSubscription('add', (post) => {
    if (post.userMatchId !== null) {
      addMessages([post]);
    }
  });

  // saat nerima event askReveal dari server
  useSubscription('askReveal', (match, data) => {
    setRevealStatus(data);
    setOpponentId(match.secondUserId);
    if (data === RevealStatusEvent.ASK) {
      setShowRevealPopup(true);
    } else {
      setRevealResponsePopup(true);
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
  //   hasNextPage: true,
  //   onLoadMore: fetchMoreMessages,
  //   rootMargin: '0px 0px 400px 0px',
  // });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
        <ChatNavbar isTyping={opponentTyping} opponentId={opponentId} />
        {/* Chat Room */}
        <div
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
          {/* <div ref={sentryRef}></div> */}
        </div>

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
                onClick={() => setIsEndConfirmationModalOpen(true)}
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
              <li
                className="flex flex-row justify-start gap-2 cursor-pointer hover:bg-blue-500 rounded-md p-2"
                onClick={() => setIsRulesModalOpen(true)}
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
              className="w-full rounded-none px-2 my-1 h-full max-h-32 overflow-y-auto resize-y border-0 text-blue-400 placeholder:text-blue-200 bg-neutral-50 text-area-scrollbar"
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
                  src="/icons/chevron-right.svg"
                  alt="Send"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modals */}
        <RulesModal isOpen={isRulesModalOpen} setIsOpen={setIsRulesModalOpen} />
        {/* End Chat Modal */}
        <ConfirmationModal
          isOpen={isEndConfirmationModalOpen}
          setIsOpen={setIsEndConfirmationModalOpen}
          title={'Kamu Yakin Mau End Chat-Nya?'}
          buttonLabelConfirm={'Yakin'}
          buttonLabelCancel={'Gajadi'}
          onConfirm={endMatch}
          description="Chat ini akan tersimpan di history chat kamu ya!"
        />
        {/* Show Reveal Modal */}
        <ConfirmationModal
          isOpen={showRevealPopup}
          setIsOpen={setShowRevealPopup}
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
          isOpen={askRevealPopup}
          setIsOpen={setAskRevealPopup}
        />
        {/* Reveal Response */}
        <InformationModal
          isOpen={revealResponsePopup}
          setIsOpen={setRevealResponsePopup}
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
          setIsOpen={setIsChatEndModalOpen}
          title={chatEndTitle}
          description={'Chat ini sudah tersimpan di history chat kamu ya!'}
          buttonLabel={'Balik ke Menu'}
          onClose={() => router.push('/match')}
        />
      </div>
    </main>
  );
};

export default Chat;
