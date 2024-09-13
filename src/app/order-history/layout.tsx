import React, { type ReactNode } from 'react';

// Import Images
import Image from 'next/image';
import OrderHIstoryBg from 'public/images/order-history/order-history-bg.png';
import Creatures from 'public/images/order-history/creatures.png';
import Ombak from 'public/images/order-history/ombak.png';

const OrderHistoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="relative z-20 flex h-full flex-col items-center justify-start overflow-y-auto px-8">
          {children}
        </div>
        {/* Background */}
        <Image
          src={OrderHIstoryBg}
          alt="OSKM Chat Match Background"
          className="absolute left-0 top-0 z-10 h-full w-full object-cover"
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
          className="absolute right-0 top-0 z-10"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default OrderHistoryLayout;
