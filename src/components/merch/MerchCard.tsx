import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Coin from 'public/images/merch/OHUCoin.png';
import Image from 'next/image';

interface MerchCardProps {
  name: string;
  price: number;
  stock: number;
  image: string;
  onClick: () => void;
}

export const MerchCard: React.FC<MerchCardProps> = ({
  name,
  price,
  stock,
  image,
  // onClick,
}) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Card className="relative flex h-[252px] w-[163px] flex-col items-center rounded-2xl border-none bg-blue-400 p-3 shadow-blue-md">
      <div className="-mt-4 mb-2 flex h-[128px] w-[163px] items-center justify-center rounded-t-2xl bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="object-contain"
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="mb-1 text-left text-b3 text-white">{name}</div>
        <div className="mb-1 flex w-full items-center justify-between font-semibold text-white">
          <div className="flex items-center">
            <Image src={Coin} alt="coin" width={15} height={15} />
            <p className="ml-1 text-b4">{price}</p>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between">
          <p className="text-b5 text-neutral-300">Stok: {stock}</p>
        </div>

        <div className="mt-3 flex w-full items-center justify-between rounded-xl bg-white p-1">
          <button
            onClick={decrementQuantity}
            className="text-md px-2 text-blue-600"
          >
            -
          </button>
          <span className="text-md">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-md px-2 text-blue-600"
          >
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
