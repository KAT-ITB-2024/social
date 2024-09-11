import { Chip } from '../Chip';
import Image from 'next/image';
import Link from 'next/link';
import Coin from 'public/images/order-history/coin.png';

type orderHistoryCardProps = {
  id: string;
  totalItem: number;
  totalCoins: number;
  status: string;
  index: number;
};

const OrderHistoryCard = ({
  id,
  totalItem,
  totalCoins,
  status,
  index,
}: orderHistoryCardProps) => {
  const label = status === 'Taken' ? 'Sudah diambil' : 'Belum diambil';
  const variant = status === 'Taken' ? 'GREEN' : 'YELLOW';
  return (
    <Link href={`/order-history/${id}`} className="cursor-pointer">
      <div className="flex flex-row items-center justify-between rounded-2xl bg-blue-400 p-4 text-white shadow-green-md">
        <div className="items-left flex flex-col justify-start">
          <h3 className="text-sh4">{'ORDER - ' + (index + 1)}</h3>
          <p>{totalItem} pcs</p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Image src={Coin} alt="coin" width={15} height={15} />
            {totalCoins}
          </div>
        </div>
        <Chip label={label} variant={variant}></Chip>
      </div>
    </Link>
  );
};

export default OrderHistoryCard;
