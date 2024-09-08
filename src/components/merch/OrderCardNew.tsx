import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Coin from 'public/images/merch/OHUCoin.png';

interface OrderCardNewProps {
  orderId: string;
  quantity: number;
  price: number;
  status: 'Sudah Diambil' | 'Belum Diambil';
}

export const OrderCardNew: React.FC<OrderCardNewProps> = ({
  orderId,
  quantity,
  price,
  status,
}) => {
  let statusStyles = '';

  if (status === 'Sudah Diambil') {
    statusStyles = 'border-green-400 bg-green-200 text-green-800';
  } else if (status === 'Belum Diambil') {
    statusStyles = 'border-warning-400 bg-warning-200 text-warning-600';
  }

  return (
    <Card className="relative mb-4 flex h-[105px] w-[345px] flex-row items-center rounded-xl border-none bg-blue-400 p-4 shadow-lg">
      <div className="flex h-full w-[55%] flex-col justify-between">
        <div className="text-lg font-bold text-white">{orderId}</div>
        <div className="text-sm text-white">{quantity} pcs</div>
        <div className="flex items-center text-white">
          <Image src={Coin} alt="coin" width={15} height={15} />
          <p className="ml-2 font-heading">{price}</p>
        </div>
      </div>
      <div className="flex">
        <p
          className={`inline-block border-2 ${statusStyles} w-fit rounded-full px-4 py-0 text-sm`}
        >
          {status}
        </p>
      </div>
    </Card>
  );
};
