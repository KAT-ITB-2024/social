import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import Cart from 'public/icons/merch/able_cart.svg';
import Coin from 'public/images/merch/OHUCoin.png';
import Jellyfish from 'public/images/merch/burbub.png';

type Merch = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  stock: number;
  image: string | null;
};

interface CheckoutDrawerProps {
  cartItems: { item: Merch; quantity: number }[];
  totalQuantity: number;
  totalPrice: number;
  totalCoins: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClick: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  cartItems,
  totalQuantity,
  totalPrice,
  totalCoins,
  isOpen,
  setIsOpen,
  onClick,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-auto w-[393px] rounded-t-lg border-blue-500 bg-blue-500 text-white shadow-lg">
        <div className="-mt-4 flex justify-center">
          <Image src={Jellyfish} alt="Jellyfish" width={210} height={210} />
        </div>

        <div className="-mt-10 text-center">
          <h1 className="text-2xl font-bold">Cek Kembali Pesananmu</h1>
          <p className="ml-12 mr-12 text-xs">
            Barang yang direquest akan mengurangi jumlah koinmu dan tidak dapat
            dibatalkan.
          </p>
        </div>

        <div className="mt-2 max-h-[250px] space-y-1 overflow-y-auto">
          {cartItems.map((cartItem, index) => (
            <div
              key={`${cartItem.item.id}-${index}`}
              className="ml-3 mr-3 flex items-center justify-between rounded-lg bg-transparent p-1"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                  <Image
                    src={
                      cartItem.item.image
                        ? cartItem.item.image
                        : '/images/merch/sticker.png'
                    }
                    alt={cartItem.item.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-white">{cartItem.item.name}</p>
                  <div className="mt-3 flex items-center text-sm text-white">
                    <Image
                      src={Coin}
                      alt="coin"
                      width={15}
                      height={15}
                      className="mr-1"
                    />
                    {cartItem.item.price}
                  </div>
                </div>
              </div>
              <div className="flex items-center">{cartItem.quantity} pcs</div>
            </div>
          ))}
        </div>

        <div className="ml-4 mt-2 text-sm font-semibold text-white">
          {totalQuantity} Barang
        </div>

        <div className="ml-4 flex items-center text-left">
          <div className="text-xl font-bold text-white">{totalPrice} Coins</div>
          <p className="ml-2 text-xs text-gray-300">
            (Koinmu setelah penukaran: {totalCoins - totalPrice} Coins)
          </p>
        </div>

        <div className="mx-4 mt-2 flex flex-col items-center gap-2 text-center text-blue-500">
          <Button
            className="w-[100%] bg-turquoise-100 text-blue-500 hover:bg-turquoise-200"
            onClick={onClick}
          >
            <Image
              src={Cart}
              alt="cart"
              width={15}
              height={15}
              className="mr-2 inline"
            />
            Request
          </Button>
          <Button
            className="w-[100%] border-2 border-error-600 bg-white text-error-600 hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            Kembali Dahulu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
