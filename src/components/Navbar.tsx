import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from './ui/loading-spinner';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // DUMMY
  const { data: notification, isLoading } =
    api.notification.getAllNotifications.useQuery();

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  let notifications = notification;
  if (!notifications) {
    notifications = [];
  }

  return (
    <div className="relative">
      {!isSidebarOpen && (
        <div className="fixed z-20 w-full max-w-md justify-center">
          <div
            className="relative top-4 mx-6 flex items-center justify-between rounded-full bg-blue-600 py-3 pl-3 pr-5 shadow-green-sm"
            style={{
              backgroundImage: "url('/images/navbar/seaweed.png')",
              backgroundPosition: '95% 30%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '75%',
            }}
          >
            <div className="flex items-center">
              <Image
                src="/images/oskm-logo.png"
                alt="OSKM ITB 2024"
                width={110}
                height={40}
              />
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg border-2 border-blue-600 bg-turquoise-100 p-1 shadow-green-sm">
                    <Image
                      src="/icons/notification-icon.svg"
                      alt="Notification"
                      width={24}
                      height={24}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[70vw] max-w-[300px] bg-transparent shadow-blue-sm md:w-[300px]"
                  side="bottom"
                  sideOffset={1}
                  align="end"
                >
                  {/* Mini triangle tip */}
                  <div className="flex justify-end bg-transparent pr-[4px]">
                    <div className="h-0 w-0 border-b-[14px] border-l-[15px] border-r-[15px] border-b-turquoise-100 border-l-transparent border-r-transparent" />
                  </div>
                  <DropdownMenuGroup>
                    {notifications.map((notification, index) => (
                      <div key={index}>
                        <DropdownMenuItem
                          className={`bg-turquoise-100 ${index === 0 ? 'rounded-t-sm' : ''}`}
                        >
                          <div className="flex flex-row gap-3">
                            {/* Indicator */}
                            {/* <div>
                              <div
                                className={`my-[8px] w-[8px] h-[8px] rounded-full ${notification.isRead ? 'bg-neutral-400' : 'bg-success-500'}`}
                              />
                            </div> */}
                            {/* Content */}
                            <div className="flex flex-col gap-3">
                              <span className="text-b4">
                                {notification.description}
                              </span>
                              <span className="text-b5 text-neutral-400">
                                {notification.date}
                              </span>
                            </div>
                          </div>
                        </DropdownMenuItem>
                        {index < notifications.length - 1 && (
                          <div className="bg-turquoise-100 py-1">
                            <DropdownMenuSeparator className="bg-turquoise-200" />
                          </div>
                        )}
                      </div>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                className="rounded-lg border-2 border-blue-600 bg-turquoise-100 px-[7px] py-[10px] shadow-green-sm"
                onClick={handleToggleSidebar}
              >
                <Image
                  src="/icons/hamburg-icon.svg"
                  alt="Menu"
                  width={18}
                  height={18}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Black Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 h-screen w-screen bg-black bg-opacity-80"
          onClick={handleToggleSidebar}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
