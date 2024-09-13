import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar';
import Image from 'next/image';
import Notifications from './ui/notifications';

interface NavbarProps {
  isDesktop?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDesktop = false }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {!isSidebarOpen && (
        <div
          className={`fixed z-50 w-full ${!isDesktop ? 'max-w-md' : ''} justify-center`}
        >
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
              {!isDesktop ? (
                <>
                  <Notifications />
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
                </>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      )}
      {/* Black Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[1000] h-screen w-screen bg-black bg-opacity-80"
          onClick={handleToggleSidebar}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={handleToggleSidebar}
            isDesktop
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
