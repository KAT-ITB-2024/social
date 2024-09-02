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
      className={`relative flex flex-col items-center ${className} h-[465px] w-[343px] overflow-hidden rounded-[43px] bg-blue-turquoise shadow-green-lg`}
    >
      <div className="relative z-10 w-full">{children}</div>
      <Image
        src={Frame}
        alt="frame"
        width={343}
        height={465}
        className="absolute inset-0 z-0 rounded-[43px]" // Positioned behind children
      />
    </div>
  );
};

export default BoxComponent;
