import React from 'react';
import CloseIcon from 'public/icons/class-selection/CloseIcon.svg';
import Image from 'next/image';
import Coin from 'public/images/merch/OHUCoin.png';

const dummyMerchData = [
  { id: 1, name: 'Merch A', price: 300, quantity: 1 },
  { id: 2, name: 'Merch B', price: 300, quantity: 2 },
  { id: 3, name: 'Merch C', price: 300, quantity: 1 },
  { id: 4, name: 'Merch D', price: 300, quantity: 1 },
];

export const CheckoutDrawer: React.FC = () => {
  const [merchData, setMerchData] = React.useState(dummyMerchData);

  const handleQuantityChange = (id: number, value: number) => {
    setMerchData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, quantity: value } : item,
      ),
    );
  };

  const totalItems = merchData.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = merchData.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  return (
    <div className="fixed right-0 top-0 flex h-full w-[375px] flex-col bg-blue-500 p-6 text-white">
      <div className="flex justify-end">
        <button className="text-xl text-white">
          <CloseIcon />
        </button>
      </div>

      <div className="mt-4 text-center">
        <Image
          src="/images/jellyfish.png"
          alt="Jellyfish"
          width={80}
          height={80}
        />
        <h2 className="mt-2 text-lg font-bold">Cek kembali pesananmu</h2>
        <p className="text-sm">
          Barang yang dipesan akan mengurangi jumlah coins dan tidak dapat
          dibatalkan.
        </p>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto">
        {merchData.map((merch) => (
          <div
            key={merch.id}
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="mr-3 h-5 w-5 rounded bg-white" />
              <div>
                <p className="font-semibold">{merch.name}</p>
                <div className="flex items-center">
                  <Image src={Coin} alt="coin" width={15} height={15} />
                  <p className="ml-1">{merch.price}</p>
                </div>
              </div>
            </div>

            <div>
              <select
                className="rounded bg-blue-400 px-2 py-1 text-white"
                value={merch.quantity}
                onChange={(e) =>
                  handleQuantityChange(merch.id, Number(e.target.value))
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-lg font-bold">
          <p>{totalItems} Barang</p>
          <p>{totalPrice} Coins</p>
        </div>
        <p className="text-xs">(Sudah termasuk penukaran koin)</p>
        <button className="mt-3 w-full rounded-md bg-white py-2 text-blue-500">
          Kembali Dahulu
        </button>
        <button className="mt-2 w-full rounded-md bg-green-400 py-2 text-white">
          Request
        </button>
      </div>
    </div>
  );
};
