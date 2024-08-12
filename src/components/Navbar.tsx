import React, { useState } from 'react';
import Sidebar from '~/components/Sidebar';
import Image from 'next/image';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <div className="max-w-md w-full justify-center">
        <div
          className="relative bg-blue-600 py-3 pl-3 pr-5 mx-6 flex justify-between items-center rounded-full shadow-custom absolute top-4 z-20"
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
            <button className="bg-turquoise-100 p-1 rounded-lg border-2 border-blue-600 shadow-custom">
              <Image
                src="/icons/notification-icon.svg"
                alt="Notification"
                width={24}
                height={24}
              />
            </button>
            <button
              className="bg-turquoise-100 px-[7px] py-[10px] rounded-lg border-2 border-blue-600 shadow-custom"
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
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
    </div>
  );
};

export default Navbar;
