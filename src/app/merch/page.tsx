'use client';

import { useState } from 'react';
import { RequestDrawer } from '~/components/merch/RequestDrawer';
import { RequestSuccess } from '~/components/merch/RequestSuccess';
import { MerchDrawer } from '~/components/merch/MerchDrawer';
import { MerchCard } from '~/components/merch/MerchCard';
import { OrderCard } from '~/components/merch/OrderCard';
import { OrderCardNew } from '~/components/merch/OrderCardNew';
import { CheckoutDrawer } from '~/components/merch/CheckoutDrawer';

export default function ITB() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  return (
    <main className="flex max-h-screen flex-col items-center justify-center bg-turquoise-100">
      <div className="fixed-width-container z-0 flex min-h-screen flex-col items-center bg-classes bg-cover bg-center bg-no-repeat p-6 pt-32">
        <div className="mt-24">
          <button
            onClick={() => setIsSuccessModalOpen(true)}
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            Open Success Modal
          </button>

          <RequestSuccess
            total_coins={200}
            isOpen={isSuccessModalOpen}
            setIsOpen={setIsSuccessModalOpen}
          />
          <CheckoutDrawer
            id={'1'}
            price={0}
            name={'Merch B'}
            stock={20}
            image=""
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></CheckoutDrawer>

          <OrderCard
            orderId={'ORDER001'}
            quantity={3}
            price={200}
            status="Sudah Diambil"
            image=""
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></OrderCard>
          <OrderCardNew
            orderId={'ORDER001'}
            quantity={3}
            price={200}
            status="Belum Diambil"
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></OrderCardNew>
          <RequestDrawer
            total_items={0}
            total_price={50}
            total_coins={40}
            variant={'sufficient'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></RequestDrawer>
          <MerchDrawer
            id={'1'}
            price={0}
            name={'Merch A'}
            stock={20}
            image=""
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></MerchDrawer>
          <div className="mt-3"></div>
          <MerchCard
            name={'Merch A'}
            price={300}
            stock={20}
            image=""
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          ></MerchCard>
        </div>
      </div>
    </main>
  );
}
