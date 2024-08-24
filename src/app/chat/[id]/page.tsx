'use client';
import React, { useState, useRef, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Image from 'next/image';

import { Textarea } from '~/components/ui/textarea';
import BubbleChat from '~/components/chat/BubbleChat';
import RulesModal from '~/components/chat/RulesModal';
import InformationModal from '~/components/chat/InformationModal';

const Chat = () => {
  const [messages, setMessages] = useState<
    { text: string; date: string; variant: 'sent' | 'received' }[]
  >([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Example to add new messages (you would replace this with your API call)
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
        {/* @Atqiya mt-20 bisa dihapus dan diganti header profile + navbar */}
        {/* CHAT ROOM */}
        <div
          className="flex-grow overflow-y-auto p-4 mt-20 no-scrollbar"
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
        {/* INPUT CONTAINER */}
        <div className="flex flex-row items-center justify-between p-4 bg-blue-600 rounded-t-2xl gap-2">
          {/* Menu */}
          <div className="flex flex-row p-2 rounded-full bg-turquoise-300 text-neutral-50 gap-0.5">
            <Image
              src="/icons/menu-white.svg"
              alt="Menu"
              width={24}
              height={24}
            />
            Menu
          </div>
          <div className="flex-grow flex flex-row bg-neutral-50  rounded-2xl items-center pr-4 pl-2">
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
      </div>

      <InformationModal 
        title='Skibidi Toilet'
        description='Skibidi Sigma Rizz'
        buttonLabel='Kembali'
      />
    </main>
  );
};

export default Chat;
