import React from 'react';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 h-full z-20 right-0 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-[60%] lg:w-[20%] bg-[url('/images/navbar/sidebar-background.png')] bg-no-repeat bg-cover bg-center`}
    >
      <div className="flex flex-col h-full py-6 px-4 gap-2">
        <div className="flex items-center justify-end">
          <button className="text-white" onClick={toggleSidebar}>
            <Image
              src="/icons/close-icon.svg"
              alt="close icon"
              width={24}
              height={24}
            />
          </button>
        </div>
        <Image
          src="/images/oskm-logo.png"
          alt="OSKM ITB 2024"
          width={110}
          height={40}
        />
        <nav className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
          {[
            { href: '#', src: '/icons/sidebar/home.svg', text: 'Home' },
            {
              href: '#',
              src: '/icons/sidebar/assignment.svg',
              text: 'Assignment',
            },
            {
              href: '#',
              src: '/icons/sidebar/attendance.svg',
              text: 'Attendance',
            },
            { href: '#', src: '/icons/sidebar/chat.svg', text: 'Chat' },
            {
              href: '#',
              src: '/icons/sidebar/leaderboard.svg',
              text: 'Leaderboard',
            },
            {
              href: '#',
              src: '/icons/sidebar/class-selection.svg',
              text: 'Class Selection',
            },
            {
              href: '#',
              src: '/icons/sidebar/oskm-mbti.svg',
              text: 'OSKM MBTI',
            },
            {
              href: '#',
              src: '/icons/sidebar/get-coins.svg',
              text: 'Get Coins',
            },
            {
              href: '#',
              src: '/icons/sidebar/request-merch.svg',
              text: 'Request Merch',
            },
            { href: '#', src: '/icons/sidebar/profile.svg', text: 'Profile' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center text-white rounded-[9px] hover:bg-blue-400"
            >
              <Image
                src={item.src}
                alt={item.text}
                className="mr-2"
                width={40}
                height={40}
              />
              {item.text}
            </a>
          ))}
        </nav>
        <div className="mt-7 py-4">
          <button className="flex items-center justify-center w-full py-2 bg-blue-200 text-white hover:bg-blue-100 rounded">
            <Image
              src={'/icons/logout-icon.svg'}
              alt="logout"
              className="mr-2"
              width={24}
              height={24}
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
