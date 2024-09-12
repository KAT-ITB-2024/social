import { format } from 'date-fns';
import { notFound, redirect } from 'next/navigation';
import { Chip } from '~/components/Chip';
import BackButton from '~/components/order-history/BackButton';
import OrderDetailList from '~/components/order-history/OrderDetailList';
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/trpc/server';

interface Params {
  orderId: string;
}
const OrderDetails = async ({ params }: { params: Params }) => {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  const { orderId } = params;
  const order = await api.merchandises.getOrderDetail({
    exchangeId: orderId,
  });

  if (!order) {
    return notFound();
  }
  let variant: 'YELLOW' | 'GREEN' = 'YELLOW';
  let label = '';
  if (order.exchange.status === 'Taken') {
    variant = 'GREEN';
    label = 'Sudah Diambil';
  } else {
    variant = 'YELLOW';
    label = 'Belum Diambil';
  }
  return (
    <div className="items-left mt-[120px] flex w-full flex-col justify-start gap-5">
      <BackButton />
      <div>
        <h2 className="align-left text-pink-400">Order Details</h2>
        <p className="text-b4 text-blue-500">
          Cek detail pesananmu secara lengkap!
        </p>
      </div>
      <Chip label={label} variant={variant} />
      <div className="items-left flex flex-col justify-start gap-2">
        <div className="flex flex-row justify-start gap-7 rounded-2xl bg-blue-400 p-4 text-white">
          <div className="items-left flex flex-col justify-center">
            <p>Status Order</p>
            <p className="font-bold text-lightYellow">{label}</p>
          </div>
          <div className="items-left flex flex-col justify-center">
            <p>Waktu Order</p>
            <p className="font-bold text-lightYellow">
              {format(order.exchange.createdAt, "dd/MM/yyyy HH:mm 'WIB'")}
            </p>
          </div>
        </div>
      </div>
      <OrderDetailList orders={order.details} />
    </div>
  );
};

export default OrderDetails;
