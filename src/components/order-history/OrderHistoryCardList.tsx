'use client';
import { useSearchParams } from 'next/navigation';
import OrderHistoryCard from './OrderHistoryCard';
import { CustomPagination } from './Pagination';

const orderHistoryCards = [
  { id: 'order1', quantity: 10, price: 200, status: 'diambil' },
  { id: 'order2', quantity: 5, price: 150, status: 'belum diambil' },
  { id: 'order3', quantity: 3, price: 100, status: 'diambil' },
  { id: 'order4', quantity: 7, price: 250, status: 'belum diambil' },
  { id: 'order5', quantity: 8, price: 300, status: 'diambil' },
  // Add more orders as needed
];

const OrderHistoryList = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const cardsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(orderHistoryCards.length / cardsPerPage);

  // Get current cards based on pagination
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = orderHistoryCards.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <div className="flex flex-col item-center justify-between">
      {/* Render current set of cards */}
      <div className="flex flex-col gap-4">
        {currentCards.map((card) => (
          <OrderHistoryCard key={card.id} {...card} />
        ))}
      </div>

      {/* Render Pagination */}
      <div className="flex justify-center mt-4">
        <CustomPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default OrderHistoryList;
