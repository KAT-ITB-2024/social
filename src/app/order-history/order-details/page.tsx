import Image from 'next/image';
import Back from 'public/icons/back.svg';
import { Chip } from '~/components/Chip';
import OrderDetailList from '~/components/order-history/OrderDetailList';

const OrderDetails = () => {
  return (
    <div className="mt-[120px] flex flex-col items-left justify-start w-full gap-5">
      <button>
        <div className="flex flex-row items-center justify-start gap-5">
          <Image src={Back} alt="back" width={7} height={7} />
          <p className="text-blue-500 text-bold text-sh5 font-bold">Kembali</p>
        </div>
      </button>
      <div>
        <h2 className="text-pink-400 align-left">Order Details</h2>
        <p className="text-b4 text-blue-500">
          Cek detail pesananmu secara lengkap!
        </p>
      </div>
      <div className="flex flex-col items-left justify-start gap-2">
        <Chip label="Sudah Diambil" variant="GREEN" />
        <div className="flex flex-row justify-start bg-blue-400 rounded-2xl p-4 text-white gap-7">
          <div className="flex flex-col items-left justify-center">
            <p>Status Order</p>
            <p className="text-lightYellow font-bold">Sudah Diambil</p>
          </div>
          <div className="flex flex-col items-left justify-center">
            <p>Waktu Order</p>
            <p className="text-lightYellow font-bold">06/09/2024 13:15</p>
          </div>
        </div>
      </div>
      <OrderDetailList />
    </div>
  );
};

export default OrderDetails;
