import React from 'react';
import Image from 'next/image';
import Coral from 'public/images/order-history/coral.png';
import Coin from 'public/images/order-history/coin.png';

type OrderDetailCardProps = {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string | null;
};

const OrderDetailCard = ({
  name,
  quantity,
  price,
  imageUrl,
}: OrderDetailCardProps) => {
  return (
    <div className="flex flex-row justify-start overflow-hidden rounded-3xl shadow-green-md">
      <div className="flex h-full w-1/4 flex-shrink-0 items-center justify-center bg-white">
        <Image
          src={imageUrl ?? Coral}
          alt={`${name} image`}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-1 bg-blue-400 px-4 py-3 text-neutral-100">
        <div className="flex flex-col">
          <h3 className="text-sh4">{name}</h3>
          <p className="text-b4">{quantity} pcs</p>
        </div>
        <div className="flex flex-row items-center justify-start gap-2 text-b4 font-bold">
          <Image src={Coin} alt="coin" width={15} height={15} />
          {price}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
