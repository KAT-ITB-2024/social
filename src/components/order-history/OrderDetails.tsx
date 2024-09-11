import React from 'react';
import Image from 'next/image';
import Coral from 'public/images/order-history/coral.png';
import Coin from 'public/images/order-history/coin.png';

type OrderDetailCardProps = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
};

const OrderDetailCard = ({
  id,
  name,
  quantity,
  price,
  imageUrl,
}: OrderDetailCardProps) => {
  return (
    <div className="flex flex-row rounded-3xl overflow-hidden justify-start">
      <div className="flex-shrink-0 w-1/4 h-full bg-white flex items-center justify-center">
        <Image
          src={Coral}
          alt="default kerang"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center w-full h-full gap-1 shadow-green-sm bg-blue-400 text-neutral-100 p-4">
        <h3 className="text-sh4">{name}</h3>
        <p className="text-b4">{quantity} pcs</p>
        <div className="flex flex-row items-center justify-start gap-2 font-bold text-b4">
          <Image src={Coin} alt="coin" width={15} height={15} />
          {price}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
