import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Cart from 'public/icons/merch/shop_logo.svg';
import Coin from 'public/images/merch/OHUCoin.png';

interface MerchDrawerProps {
  id: string;
  price: number;
  name: string;
  stock: number;
  image: string;
  onClick: () => void;
}

export const MerchDrawer: React.FC<MerchDrawerProps> = ({
  // id,
  price,
  name,
  stock,
  image,
  onClick,
}) => {
  const [quantity, setQuantity] = useState(1);

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
    <Drawer>
      <DrawerTrigger>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-200 p-5 shadow-blue-lg">
        <div className="flex h-72 w-full items-center justify-center rounded-xl bg-white">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={200}
              height={200}
              className="object-contain"
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <div className="container relative top-4 items-center justify-between">
          {' '}
          <Image src={Coin} alt="coin" className="absolute -left-1 w-[30px]" />
          <h4>{price}</h4>
        </div>
        <div className="mt-5">
          <div className="text-sh4">{name}</div>
          <div className="mt-2 text-b5"> Stok: {stock} </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className="mr-4">Kuantitas:</span>
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="h-8 rounded-md bg-white px-3"
            >
              −
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="z-0 -ml-2 h-8 w-16 bg-white text-center"
            />
            <button
              onClick={incrementQuantity}
              className="-ml-2 h-8 rounded-md bg-white px-3"
            >
              +
            </button>
          </div>
        </div>
        <div className="-mb-4 mt-4">
          <Button className="w-full bg-blue-400" onClick={onClick}>
            <Image
              src={Cart}
              alt="cart"
              className="relative right-2 w-[15px]"
            />
            Masukan Keranjang
          </Button>
        </div>
        <DrawerFooter className="-mb-5">
          <DrawerClose></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
