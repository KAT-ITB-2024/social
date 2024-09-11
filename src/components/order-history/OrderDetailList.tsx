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

const OrderDetailList = () => {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderDetailCard
          key={order.id}
          id={order.id}
          name={order.name}
          quantity={order.quantity}
          price={order.price}
        />
      ))}
    </div>
  );
};

export default OrderDetailList;
