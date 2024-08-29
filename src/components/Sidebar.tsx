import React from 'react';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div className="fixed left-[50%] translate-x-[-50%] w-full lg:w-[450px]">
      <div
        className={`absolute top-0 h-[100vh] right-0 lg:-auto ease-in-out duration-200 z-30 ${isOpen ? 'opacity-100 w-[60%] lg:max-w-[270px]' : 'opacity-0 w-0'} mx-auto`}
      >
        <div className="relative w-full h-full ">
          <div
            className={`absolute top-0 right-0 h-full ease-in-out duration-200 ${isOpen ? 'w-full' : 'w-0'} bg-[url('/images/navbar/sidebar-background.png')] bg-no-repeat bg-cover bg-center`}
          >
            <div className="flex flex-col h-full w-full py-6 px-4 gap-2">
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
                {/* TODO: update page routes and auth logic */}
                {[
                  { href: '#', src: '/icons/sidebar/home.svg', text: 'Home' },
                  {
                    href: '/assignment',
                    src: '/icons/sidebar/assignment.svg',
                    text: 'Assignment',
                  },
                  {
                    href: '/attendance',
                    src: '/icons/sidebar/attendance.svg',
                    text: 'Attendance',
                  },
                  { href: '#', src: '/icons/sidebar/chat.svg', text: 'Chat' },
                  {
                    href: '/leaderboard',
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
                  {
                    href: '#',
                    src: '/icons/sidebar/profile.svg',
                    text: 'Profile',
                  },
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
