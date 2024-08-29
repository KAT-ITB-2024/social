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
import Cart from 'public/images/ITB-x/shop_logo.png';
import Coin from 'public/images/ITB-x/OHUCoin.png';

interface MerchDrawerProps {
  id: string;
  price: number;
  name: string;
  stock: number;
  image: string;
  onClick: () => void;
}

export const MerchDrawer: React.FC<MerchDrawerProps> = ({
  id,
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
      <DrawerContent className="p-5 shadow-blue-lg bg-gray-200">
        <div className="bg-white w-full h-72 flex items-center justify-center rounded-xl">
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
        <div className="relative container justify-between items-center top-4">
          {' '}
          {/* Add relative positioning here */}
          <Image src={Coin} alt="coin" className="absolute -left-1 w-[30px]" />
          <h4>{price}</h4>
        </div>
        <div className="mt-5">
          <div className="text-sh4">{name}</div>
          <div className="text-b5 mt-2"> Stok: {stock} </div>
        </div>
        <div className="mt-2 flex items-center">
          <span className="mr-4">Kuantitas:</span>
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="px-3 h-8 rounded-md bg-white "
            >
              −
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-16 h-8 text-center bg-white -ml-2 z-0"
            />
            <button
              onClick={incrementQuantity}
              className="px-3 h-8 rounded-md bg-white -ml-2"
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-4 -mb-4">
          <Button className="w-full bg-blue-400" onClick={onClick}>
            <Image
              src={Cart}
              alt="cart"
              className="relative right-2 w-[15px]"
            />
            Masukan Keranjang
          </Button>
        </div>
        <DrawerFooter className="">
          <DrawerClose></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
