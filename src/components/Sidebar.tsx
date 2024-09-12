import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { SuccessToast } from '~/components/ui/success-toast';
import { ErrorToast } from '~/components/ui/error-toast';
import { toast } from 'sonner';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const sidebarItems = [
    {
      href: '/',
      src: '/icons/sidebar/home.svg',
      text: 'Home',
    },
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
    {
      href: '/chat',
      src: '/icons/sidebar/chat.svg',
      text: 'Chat',
    },
    {
      href: '/leaderboard',
      src: '/icons/sidebar/leaderboard.svg',
      text: 'Leaderboard',
    },
    {
      href: '/class-selection',
      src: '/icons/sidebar/class-selection.svg',
      text: 'Class Selection',
    },
    {
      href: '/personality',
      src: '/icons/sidebar/oskm-personality.svg',
      text: 'OSKM Personality',
    },
    // {
    //   href: '#',
    //   src: '/icons/sidebar/get-coins.svg',
    //   text: 'Get Coins',
    // },
    {
      href: '/merch',
      src: '/icons/sidebar/request-merch.svg',
      text: 'Request Merch',
    },
    {
      href: '/profile',
      src: '/icons/sidebar/profile.svg',
      text: 'Profile',
    },
  ];

  async function onLogout() {
    try {
      await signOut({
        callbackUrl: '/login',
      });
      toast(
        <SuccessToast title="Logout success!" desc="Logged out successfully" />,
      );
    } catch (error) {
      toast(
        <ErrorToast desc="There was an error logging out. Please try again." />,
      );
    }
  }
  return (
    <div className="fixed left-[50%] w-full translate-x-[-50%] lg:w-[450px]">
      <div
        className={`lg:-auto absolute right-0 top-0 z-30 h-[100vh] duration-200 ease-in-out ${isOpen ? 'w-[60%] opacity-100 lg:max-w-[270px]' : 'w-0 opacity-0'} mx-auto`}
      >
        <div className="relative h-full w-full">
          <div
            className={`absolute right-0 top-0 h-full duration-200 ease-in-out ${isOpen ? 'w-full' : 'w-0'} bg-[url('/images/navbar/sidebar-background.png')] bg-cover bg-center bg-no-repeat`}
          >
            <div className="flex h-full w-full flex-col gap-2 px-4 py-6">
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
              <nav className="no-scrollbar flex flex-col gap-2 overflow-y-auto">
                {/* TODO: update page routes and auth logic */}
                {sidebarItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center rounded-[9px] text-white hover:bg-blue-400"
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
                <button
                  className="flex w-full items-center justify-center rounded bg-blue-200 py-2 text-white hover:bg-blue-100"
                  onClick={() => onLogout()}
                >
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
