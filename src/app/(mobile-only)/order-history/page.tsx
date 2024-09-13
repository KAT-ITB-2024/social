import OrderHistoryList from '~/components/order-history/OrderHistoryCardList';
import BackButton from '~/components/order-history/BackButton';

const OrderHistory = () => {
  return (
    <div className="items-left flex h-full w-full flex-col justify-start gap-5 pb-10 pt-[120px]">
      <BackButton />
      <div>
        <h2 className="align-left text-pink-400">Order History</h2>
        <p className="text-b4 text-blue-500">
          Silahkan ambil pesananmu di booth merchandise!
        </p>
      </div>
      <div className="w-full flex-1 overflow-hidden">
        <OrderHistoryList />
      </div>
    </div>
  );
};

export default OrderHistory;
