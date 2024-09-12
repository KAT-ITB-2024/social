import OrderHistoryList from '~/components/order-history/OrderHistoryCardList';
import BackButton from '~/components/order-history/BackButton';

const OrderHistory = () => {
  return (
    <div className="items-left mb-20 mt-[120px] flex w-full flex-col justify-start gap-5">
      <BackButton />
      <div>
        <h2 className="align-left text-pink-400">Order History</h2>
        <p className="text-b4 text-blue-500">
          Silahkan ambil pesananmu di booth merchandise!
        </p>
      </div>

      <OrderHistoryList />
    </div>
  );
};

export default OrderHistory;
