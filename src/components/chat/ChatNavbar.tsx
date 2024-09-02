'use client';

import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Seaweed from 'public/images/chat/Seaweed.png';
import { useRouter } from 'next/navigation';
import ProfileFriendModal from '~/components/profile/ModalProfileFriend';

const ChatNavbar = ({
  isTyping = false,
  opponentId,
  name,
  profilePhoto,
}: {
  opponentId?: string | null;
  isTyping?: boolean;
  name: string | null;
  profilePhoto: string | null;
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="fixed top-4 z-20 flex w-full max-w-md flex-row items-center justify-between gap-x-2 px-8">
        <div className="flex w-full items-center gap-x-2 rounded-full bg-blue-600 py-2 pl-4 pr-12 text-white">
          <div className="rounded-full bg-white p-1 text-blue-600">
            <MoveLeft className="h-4 w-4" onClick={() => router.back()} />
          </div>
          <Image
            src={
              profilePhoto != null && profilePhoto !== ''
                ? profilePhoto
                : '/images/history/profile-default.png'
            }
            alt="Photo Profile"
            width={32}
            height={32}
            onClick={() => opponentId && setIsModalOpen(true)}
          />
          <div className="flex flex-col overflow-hidden">
            <h1 className="max-w-[140px] truncate text-[20px] font-medium">
              {name ?? 'Anonymous'}
            </h1>
            {isTyping && (
              <p className="text-xs text-neutral-200">is typing...</p>
            )}
          </div>
        </div>
        <div className="relative flex w-[100px] items-center justify-center overflow-hidden rounded-full bg-blue-600 py-[7px]">
          <button
            className="z-10 rounded-lg border-2 border-blue-600 bg-turquoise-100 px-[7px] py-[10px] shadow-green-sm"
            onClick={handleToggleSidebar}
          >
            <Image
              src="/icons/hamburg-icon.svg"
              alt="Menu"
              width={18}
              height={18}
            />
          </button>
          <Image src={Seaweed} alt="Seaweed" className="absolute" />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 h-screen w-screen bg-black bg-opacity-80"
          onClick={handleToggleSidebar}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
        </div>
      )}

      {opponentId && (
        <ProfileFriendModal
          userId={opponentId}
          isDialogOpen={isModalOpen}
          setIsDialogOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ChatNavbar;
