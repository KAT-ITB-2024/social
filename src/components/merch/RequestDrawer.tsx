import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Able from 'public/icons/merch/able_cart.svg';
import Disable from 'public/icons/merch/shop_logo.svg';

interface RequestDrawerProps {
  total_items: number;
  total_price: number;
  total_coins: number;
  isOpen?: boolean;
  onClick: () => void;
}

export const RequestDrawer: React.FC<RequestDrawerProps> = ({
  total_items,
  total_price,
  total_coins,
  isOpen,
  onClick,
}) => {
  const isSufficient = total_coins >= total_price;

  let borderColor;
  let textColor;
  let backgroundColor;
  let condition;
  let buttonColor;
  let buttonText;
  let buttonImage;
  let coinColor;

  if (!isSufficient) {
    borderColor = 'border-red-500';
    textColor = 'text-red-500';
    backgroundColor = 'bg-red-200';
    condition = 'Koin tidak mencukupi';
    buttonColor = 'bg-neutral-400';
    buttonText = 'text-neutral-300';
    buttonImage = Disable;
    coinColor = 'text-error-300';
  } else {
    borderColor = 'border-green-500';
    textColor = 'text-green-500';
    backgroundColor = 'bg-green-100';
    condition = 'Koin mencukupi';
    buttonColor = 'bg-turquoise-100';
    buttonText = 'text-blue-500';
    buttonImage = Able;
    coinColor = 'text-white';
  }

  return (
    <Drawer modal={false} handleOnly={true} open={isOpen}>
      <DrawerContent
        className={`flex p-6 shadow-blue-lg ${backgroundColor} max-w-md gap-2 border-blue-500 bg-blue-500`}
      >
        <p
          className={`inline-block border bg-white ${borderColor} ${textColor} ${backgroundColor} w-fit rounded-full px-4 py-1 text-sm`}
        >
          {condition}
        </p>
        <div className="text-white">
          <div>{total_items} Barang</div>
          <div className={`text-3xl font-bold ${coinColor}`}>
            {total_price} Coins
          </div>
          <div className="mt-1 text-sm text-gray-200">
            (Koinmu: {total_coins} Coins)
          </div>
        </div>
        <Button
          className={`px-2 py-2 ${buttonColor} ${buttonText}`}
          onClick={isSufficient ? onClick : undefined}
          disabled={!isSufficient}
        >
          <Image
            src={buttonImage}
            alt="cart"
            className="relative right-2 w-[15px]"
          />
          Request
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
