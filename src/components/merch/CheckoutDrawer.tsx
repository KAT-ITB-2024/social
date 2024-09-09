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
import Cart from 'public/images/merch/able_cart.png';
import Coin from 'public/images/merch/OHUCoin.png';
import Jellyfish from 'public/images/merch/burbub.png';
import CloseIcon from 'public/images/merch/close.png';

const dummyMerchData = [
  {
    id: '1',
    name: 'Merch A',
    price: 300,
    stock: 10,
    image: '/images/merchA.png',
  },
  {
    id: '2',
    name: 'Merch B',
    price: 200,
    stock: 8,
    image: '/images/merchB.png',
  },
  {
    id: '3',
    name: 'Merch C',
    price: 150,
    stock: 5,
    image: '/images/merchC.png',
  },
  {
    id: '4',
    name: 'Merch D',
    price: 400,
    stock: 2,
    image: '/images/merchD.png',
  },
];

interface CheckoutDrawerProps {
  orderId?: string;
  onClick: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  // orderId,
  onClick,
}) => {
  const [quantities, setQuantities] = useState(dummyMerchData.map(() => 1));

  const incrementQuantity = (index: number, stock: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity < stock ? quantity + 1 : quantity,
      ),
    );
  };

  const decrementQuantity = (index: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity > 1 ? quantity - 1 : quantity,
      ),
    );
  };

  const totalItems = quantities.reduce((acc, quantity) => acc + quantity, 0);
  const totalPrice = quantities.reduce((acc, quantity, index) => {
    const merch = dummyMerchData[index];
    if (merch) {
      return acc + quantity * merch.price;
    }
    return acc;
  }, 0);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent className="fixed h-[650px] w-[393px] rounded-t-lg border-blue-500 bg-blue-500 text-white shadow-lg">
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

        <div className="mt-2 h-[250px] space-y-1 overflow-y-auto">
          {dummyMerchData.map((merch, index) => (
            <div
              key={merch.id}
              className="ml-3 mr-3 flex items-center justify-between rounded-lg bg-transparent p-1"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                  <Image
                    src={merch.image}
                    alt={merch.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-white">{merch.name}</p>
                  <div className="mt-3 flex items-center text-sm text-white">
                    <Image
                      src={Coin}
                      alt="coin"
                      width={15}
                      height={15}
                      className="mr-1"
                    />
                    {merch.price}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => decrementQuantity(index)}
                  className="rounded-l-lg bg-white px-2 text-black"
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantities[index]}
                  readOnly
                  className="-ml-1 -mr-1 w-10 bg-white text-center text-black"
                />
                <button
                  onClick={() => incrementQuantity(index, merch.stock)}
                  className="rounded-r-lg bg-white px-2 text-black"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ml-4 mt-2 text-sm font-semibold text-white">
          {totalItems} Barang
        </div>

        <div className="ml-4 flex items-center text-left">
          <div className="text-xl font-bold text-white">{totalPrice} Coins</div>
          <p className="ml-2 text-xs text-gray-300">
            (Koinmu setelah penukaran: 4000)
          </p>
        </div>

        <div className="ml-4 mr-4 mt-2 items-center text-center text-blue-500">
          <Button className="mb-2 w-[100%] bg-white text-blue-700 hover:bg-gray-500">
            Kembali Dahulu
          </Button>
          <Button
            className="-mb-32 w-[100%] bg-turquoise-100 text-blue-500 hover:bg-gray-500"
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
        </div>
        <DrawerFooter>
          <DrawerClose className="absolute right-4 top-4">
            <button className="text-white">
              <Image src={CloseIcon} alt="Jellyfish" width={25} height={25} />
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
