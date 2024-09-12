import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Coin from 'public/images/merch/OHUCoin.png';

interface OrderCardProps {
  orderId: string;
  quantity: number;
  price: number;
  image: string;
  status: 'Sudah Diambil' | 'Belum Diambil';
  onClick: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  quantity,
  price,
  status,
  image,
}) => {
  let statusStyles = '';

  if (status === 'Sudah Diambil') {
    statusStyles = 'border-green-400 bg-green-200 text-green-800';
  } else if (status === 'Belum Diambil') {
    statusStyles = 'border-warning-400 bg-warning-200 text-warning-600';
  }

  return (
    <Card className="relative mb-4 flex h-[128px] w-[345px] flex-row items-center rounded-2xl border-none bg-blue-400 p-4 shadow-green-md">
      <div className="-ml-4 mr-4 flex h-[128px] w-[40%] items-center justify-center rounded-l-lg bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt="no image available"
            width={100}
            height={100}
            className="object-contain"
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
      <div className="flex h-full w-[70%] flex-col justify-between">
        <p
          className={`inline-block border-2 ${statusStyles} w-fit rounded-full px-4 text-sm`}
        >
          {status}
        </p>
        <div className="-mb-5 -mt-3 text-sh4 font-semibold text-white">
          {orderId}
        </div>
        <div className="-mb-1 items-center text-white">
          <p>{quantity} pcs</p>
          <div className="flex items-center">
            <Image src={Coin} alt="coin" width={15} height={15} />
            <p className="ml-1 font-heading">{price}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
