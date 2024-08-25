'use client';
import React, { useState, useRef, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Textarea } from '~/components/ui/textarea';
import BubbleChat from '~/components/chat/BubbleChat';
import RulesModal from '~/components/chat/RulesModal';
import ConfirmationModal from '~/components/chat/ConfirmationModal';
import InformationModal from '~/components/chat/InformationModal';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const Chat = () => {
  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [messages, setMessages] = useState<
    { text: string; date: string; variant: 'sent' | 'received' }[]
  >([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOpenRulesModal = () => {
    setIsRulesModalOpen(true);
  };

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  // TODO: REMOVE WITH API CALL
  const fetchMoreMessages = () => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        ...Array.from({ length: 5 }, (_, i) => ({
          text: `New message ${i + prevMessages.length + 1}`,
          date: '04.22',
          variant: i % 2 === 0 ? 'received' : ('sent' as 'sent' | 'received'),
        })),
      ]);
    }, 1000);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore: fetchMoreMessages,
    rootMargin: '0px 0px 400px 0px',
  });

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { text: input.trim(), date: '04.23', variant: 'sent' },
      ]);
      setInput('');
    }
  };

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
        {/* CHAT ROOM */}
        <div
          className="flex-grow overflow-y-auto p-4 mt-20 no-scrollbar z-10"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <BubbleChat
              key={index}
              date={msg.date}
              text={msg.text}
              variant={msg.variant}
            />
          ))}
          <div ref={sentryRef}></div>
        </div>

        {/* Popup Menu */}
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
                onClick={handleOpenConfirmationModal}
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
                onClick={handleOpenRulesModal}
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
                onClick={handleOpenRulesModal}
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

        {/* INPUT CONTAINER */}
        <div
          className={`flex flex-row items-center justify-between p-4 bg-blue-600 gap-2 shadow-orange-2xl
            ${isMenuOpen ? '' : 'rounded-t-2xl'}
          `}
        >
          {/* Menu Button */}
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
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
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
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          setIsOpen={setIsConfirmationModalOpen}
          title={'Kamu Yakin Mau End Chat-Nya?'}
          buttonLabelConfirm={'Yakin'}
          buttonLabelCancel={'Gajadi'}
          description="Chat ini akan tersimpan di history chat kamu ya!"
        />
      </div>
    </main>
  );
};

export default Chat;
