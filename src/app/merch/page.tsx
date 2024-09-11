'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { RequestDrawer } from '~/components/merch/RequestDrawer';
import { RequestSuccess } from '~/components/merch/RequestSuccess';
import { MerchCard } from '~/components/merch/MerchCard';
import { CheckoutDrawer } from '~/components/merch/CheckoutDrawer';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { ErrorToast } from '~/components/ui/error-toast';
import { toast } from 'sonner';

type Merch = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  price: number;
  stock: number;
  image: string | null;
};

export default function MerchPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<
    { item: Merch; quantity: number }[]
  >([]);

  const updateCart = (item: Merch, newQuantity: number) => {
    setCartItems((prevCart) => {
      // If the new quantity is 0, remove the item
      if (newQuantity === 0) {
        return prevCart.filter((cartItem) => cartItem.item.id !== item.id);
      }

      const existingItem = prevCart.find(
        (cartItem) => cartItem.item.id === item.id,
      );

      if (existingItem) {
        // If item already exists, update its quantity
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        );
      } else {
        // If item does not exist, add it to the cart
        return [...prevCart, { item, quantity: newQuantity }];
      }
    });
  };

  const checkoutCartMutation = api.merchandises.checkoutCart.useMutation();

  const handleCheckout = async () => {
    const checkoutData = cartItems.map((cartItem) => ({
      merchandiseId: cartItem.item.id,
      quantity: cartItem.quantity,
    }));

    try {
      const response = await checkoutCartMutation.mutateAsync(checkoutData);

      if (response.success) {
        console.log('Checkout successful:', response.message);
        setIsCheckoutModalOpen(false);
        setIsSuccessModalOpen(true);
        setCartItems([]);
        void refetch();
      } else {
        console.error('Checkout failed:', response.message);
        toast(<ErrorToast title="Oops!" desc="Gagal melakukan checkout" />);
      }
    } catch (error) {
      console.error('An error occurred during checkout:', error);
    }
  };

  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0,
  );

  const isRequestDrawerOpen = useMemo(() => {
    return totalQuantity > 0;
  }, [totalQuantity]);

  const {
    data: merchData,
    refetch,
    isLoading,
  } = api.merchandises.getAllMerchandise.useQuery({}, { enabled: true });

  if (isLoading || !merchData) {
    return <LoadingSpinnerCustom />;
  }

  const { userCoin, merchandiseList } = merchData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col"
        style={{
          backgroundImage: "url('/images/merch/bg-merch.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          backgroundPosition: 'center',
        }}
      >
        <div
          className={`no-scrollbar mt-24 flex flex-col gap-[20px] overflow-y-auto px-6 ${isRequestDrawerOpen ? 'mb-60' : 'mb-6'} `}
        >
          {/* Title */}
          <div className="flex items-start justify-between">
            {/* Left section - Text */}
            <div>
              <h1 className="text-3xl font-bold text-pink-400">
                Merchandise ITB
              </h1>
              <p className="text-sm text-blue-500">
                Tukarkan koinmu dengan merchandise menarik!
              </p>
            </div>

            {/* Right section - History button */}
            <div className="flex items-center justify-center">
              <button className="flex flex-col items-center justify-between gap-[5px] rounded-lg bg-blue-400 px-4 py-2 text-xs text-lightYellow shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <Image
                  src="/icons/merch/history.svg"
                  alt="History"
                  width={24}
                  height={24}
                />
                <span>History</span>
              </button>
            </div>
          </div>
          {/* Merch Cards */}
          <div className="flex flex-row flex-wrap justify-between gap-y-4">
            {merchandiseList.map((item) => {
              const cartItem = cartItems.find(
                (cartItem) => cartItem.item.id === item.id,
              );
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <MerchCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  stock={item.stock}
                  image={item.image ? item.image : '/images/merch/sticker.png'}
                  itemQuantity={quantity}
                  onQuantityChange={(newQuantity) =>
                    updateCart(item, newQuantity)
                  }
                />
              );
            })}
          </div>
          <RequestDrawer
            total_items={totalQuantity}
            total_price={totalPrice}
            total_coins={userCoin ?? 0}
            isOpen={isRequestDrawerOpen}
            onClick={() => setIsCheckoutModalOpen(true)}
          />

          <RequestSuccess
            total_coins={userCoin ? userCoin - totalPrice : 0}
            isOpen={isSuccessModalOpen}
            setIsOpen={setIsSuccessModalOpen}
          />
          <CheckoutDrawer
            cartItems={cartItems}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            totalCoins={userCoin ?? 0}
            isOpen={isCheckoutModalOpen}
            setIsOpen={setIsCheckoutModalOpen}
            onClick={handleCheckout}
          />
        </div>
      </div>
    </main>
  );
}

{
  /* Search Bar */
}
{
  /* <div
            className="flex items-center border-b px-3 bg-white rounded-md"
          >
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className=
                'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div> */
}
