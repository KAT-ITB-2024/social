import React, { ReactNode } from 'react';
import Image from 'next/image';
import Frame from 'public/images/chat/newchat/framebox.png';

type BoxComponentProps = {
  children: ReactNode;
  className?: string;
};

const BoxComponent = ({ children, className }: BoxComponentProps) => {
  return (
    <div
      className={`relative flex flex-col items-center ${className} w-[343px] h-[465px] rounded-[43px] bg-blue-turquoise shadow-green-lg overflow-hidden`}
    >
      <div className="relative w-full z-10">{children}</div>
      <Image
        src={Frame}
        alt="frame"
        width={343}
        height={465}
        className="absolute inset-0 rounded-[43px] z-0" // Positioned behind children
      />
    </div>
  );
};

export default BoxComponent;
