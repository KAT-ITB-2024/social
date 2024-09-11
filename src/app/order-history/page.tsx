import Image from 'next/image';
import Back from 'public/icons/back.svg';
import OrderHistoryList from '~/components/order-history/OrderHistoryCardList';
import { Input } from '~/components/ui/input';
import Search from 'public/icons/search.svg';

const OrderHistory = () => {
  return (
    <div className="mt-[120px] flex flex-col items-left justify-start w-full gap-5">
      <button>
        <div className="flex flex-row items-center justify-start gap-5">
          <Image src={Back} alt="back" width={7} height={7} />
          <p className="text-blue-500 text-bold text-sh5 font-bold">Kembali</p>
        </div>
      </button>
      <div>
        <h2 className="text-pink-400 align-left">Order History</h2>
        <p className="text-b4 text-blue-500">
          Silahkan ambil pesananmu di booth merchandise!
        </p>
      </div>
      <div className="relative">
        <Input
          placeholder="Cari order Anda"
          className="text-blue-400 border-blue-400 border-2 shadow-blue-md"
        />
        <div className="absolute top-2 right-0 pr-3">
          <Image src={Search} alt="search" width={25} height={25} />
        </div>
      </div>

      <OrderHistoryList />
    </div>
  );
};

export default OrderHistory;
