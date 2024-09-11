import React from 'react';
import OrderDetailCard from './OrderDetails';
const orders = [
  {
    id: '1',
    name: 'Order 1',
    quantity: 2,
    price: 1500,
  },
  {
    id: '2',
    name: 'Order 2',
    quantity: 1,
    price: 2000,
  },
  {
    id: '3',
    name: 'Order 3',
    quantity: 5,
    price: 500,
  },
  // Add more items if needed
];

interface order {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string | null;
}
const OrderDetailList = ({ orders }: { orders: order[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderDetailCard
          key={order.name}
          name={order.name}
          quantity={order.quantity}
          price={order.price}
          imageUrl={order.imageUrl}
        />
      ))}
    </div>
  );
};

export default OrderDetailList;
