import React, { type ReactNode } from 'react';

// Import Images
import Image from 'next/image';
import OrderHIstoryBg from 'public/images/order-history/order-history-bg.png';
import Creatures from 'public/images/order-history/creatures.png';
import Ombak from 'public/images/order-history/ombak.png';

const OrderHistoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
      <div className="relative h-full w-full bg-white overflow-hidden">
        <div className="flex flex-col items-center h-full justify-start px-8 relative z-20">
          {children}
        </div>
        {/* Background */}
        <Image
          src={OrderHIstoryBg}
          alt="OSKM Chat Match Background"
          className="absolute top-0 left-0 object-cover h-full w-full z-10"
        />

        <Image
          src={Ombak}
          alt="Coral"
          className="absolute bottom-0 left-0 z-10"
          width={500}
          height={500}
        />

        <Image
          src={Creatures}
          alt="Coral"
          className="absolute top-0 right-0 z-10"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default OrderHistoryLayout;
