import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Coin from 'public/images/merch/OHUCoin.png';
import Image from 'next/image';

interface MerchCardProps {
  name: string;
  price: number;
  stock: number;
  image: string;
  itemQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const MerchCard: React.FC<MerchCardProps> = ({
  name,
  price,
  stock,
  image,
  itemQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity);

  const incrementQuantity = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  return (
    <Card className="relative flex h-auto w-[45%] flex-col items-center rounded-2xl border-none bg-blue-400 shadow-blue-md">
      <div className="mb-2 flex h-[128px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-white">
        <Image
          src={image}
          alt={name}
          width={115}
          height={115}
          className="object-contain"
        />
      </div>
      <div className="flex w-full flex-col justify-between p-3 pt-1">
        <div className="mb-1 break-words text-left text-b3 text-white">
          {name}
        </div>
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
            disabled={quantity <= 0}
          >
            -
          </button>
          <span className="text-md">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="text-md px-2 text-blue-600"
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>
      </div>
    </Card>
  );
};
