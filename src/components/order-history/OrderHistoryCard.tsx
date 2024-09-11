import { Chip } from '../Chip';
import Image from 'next/image';
import Coin from 'public/images/order-history/coin.png';

type orderHistoryCardProps = {
  id: string;
  quantity: number;
  price: number;
  status: string;
};

const OrderHistoryCard = ({
  id,
  quantity,
  price,
  status,
}: orderHistoryCardProps) => {
  const label = status === 'diambil' ? 'Sudah diambil' : 'Belum diambil';
  const variant = status === 'diambil' ? 'GREEN' : 'YELLOW';

  const uppercaseid = id.toUpperCase();
  return (
    <div className="flex flex-row items-center justify-between bg-blue-400 p-4 rounded-2xl shadow-green-md text-white">
      <div className="flex flex-col items-left justify-start">
        <h3 className="text-sh4">{uppercaseid}</h3>
        <p>{quantity} pcs</p>
        <div className="flex flex-row items-center justify-start gap-2">
          <Image src={Coin} alt="coin" width={15} height={15} />
          {price}
        </div>
      </div>
      <Chip label={label} variant={variant}></Chip>
    </div>
  );
};

export default OrderHistoryCard;
