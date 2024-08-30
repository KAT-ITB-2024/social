'use client';

import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar';
import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import PhotoProfile from 'public/images/chat/PhotoProfile.png';
import Seaweed from 'public/images/chat/Seaweed.png';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="fixed top-4 z-20 flex flex-row items-center justify-between gap-x-2 w-full max-w-md px-8">
        <div className="bg-blue-600 rounded-full py-2 pl-4 pr-12 flex items-center gap-x-2 text-white w-full">
          <div className="rounded-full text-blue-600 bg-white p-1">
            <MoveLeft className="w-4 h-4" onClick={() => router.back()} />
          </div>
          <Image
            src={
              profilePhoto != null && profilePhoto !== ''
                ? profilePhoto
                : PhotoProfile
            }
            alt="Photo Profile"
            width={32}
            height={32}
          />
          <div className="flex flex-col overflow-hidden">
            <h1 className="font-medium text-[20px] truncate max-w-[140px]">
              {name ?? 'Anonymous'}
            </h1>
            {isTyping && (
              <p className="text-xs text-neutral-200">is typing...</p>
            )}
          </div>
        </div>
        <div className="relative bg-blue-600 w-[100px] py-[7px] flex items-center justify-center rounded-full overflow-hidden">
          <button
            className="bg-turquoise-100 px-[7px] py-[10px] rounded-lg border-2 border-blue-600 shadow-green-sm z-10"
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
          className="fixed inset-0 bg-black bg-opacity-80 z-30 w-screen h-screen"
          onClick={handleToggleSidebar}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default ChatNavbar;
