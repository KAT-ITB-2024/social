'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type Tab = {
  id: 'chat' | 'history';
  label: string;
  icon: string;
  activeIcon: string;
  href: string;
};

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/chat/history') {
      setActiveTab('history');
    } else if (pathname === '/chat' || pathname === '/chat/room') {
      setActiveTab('chat');
    }
  }, [pathname]);
  const tabs: Tab[] = [
    {
      id: 'chat',
      label: 'Chat',
      icon: '/icons/bottombar/chat-icon.svg',
      activeIcon: '/icons/bottombar/chat-active.svg',
      href: '/chat',
    },
    {
      id: 'history',
      label: 'History',
      icon: '/icons/bottombar/history-icon.svg',
      activeIcon: '/icons/bottombar/history-active.svg',
      href: '/chat/history',
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 max-w-md bg-blue-600 rounded-t-[46px] flex justify-center items-center w-full h-20 gap-20 shadow-green-xl ">
      {tabs.map((tab, index) => (
        <a
          key={index}
          href={tab.href}
          className="flex flex-row items-center justify-center"
        >
          <div
            className={`flex flex-col items-center justify-evenly text-neutral-50 gap-0 w-20 h-16 ${activeTab === tab.id ? 'text-turquoise-200' : ''}`}
          >
            <Image
              src={activeTab === tab.id ? tab.activeIcon : tab.icon}
              alt={tab.label}
              width={20}
              height={20}
            />
            <p className="text-b4">{tab.label}</p>

            {activeTab === tab.id && (
              <div className="w-full h-1 bg-turquoise-200 mt-1"></div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default BottomBar;
