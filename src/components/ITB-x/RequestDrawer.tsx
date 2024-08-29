import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Cart from 'public/images/ITB-x/shop_logo.png';
import Able from 'public/images/ITB-x/able_cart.png';
import Disable from 'public/images/ITB-x/disable_cart.png';

type DrawerVariant = 'sufficient' | 'insufficient';

interface RequestDrawerProps {
  total_items: number;
  total_price: number;
  total_coins: number;
  variant: DrawerVariant;
  onClick: () => void;
}

export const RequestDrawer: React.FC<RequestDrawerProps> = ({
  total_items,
  total_price,
  total_coins,
  variant,
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
    <Drawer>
      <DrawerTrigger>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent
        className={`p-4 shadow-blue-lg ${backgroundColor}  bg-blue-500 border-blue-500`}
      >
        <p
          className={`bg-white inline-block border ${borderColor} ${textColor} ${backgroundColor} rounded-full px-4 py-1 text-sm w-fit mt-2`}
        >
          {condition}
        </p>
        <div className="mt-4 text-white">
          <div>{total_items} Barang</div>
          <div className={`text-3xl font-bold ${coinColor}`}>
            {total_price} Coins
          </div>
          <div className="text-sm text-gray-200 mt-1">
            (Koinmu: {total_coins} Coins)
          </div>
        </div>
        <Button
          className={`px-2 py-1 ${buttonColor} ${buttonText} mt-5`}
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
        <DrawerFooter className="mt-4">
          <DrawerClose></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
