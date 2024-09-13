'use client';
import { useState } from 'react';
import OrderHistoryCard from './OrderHistoryCard';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { PlusIcon } from 'lucide-react';

const OrderHistoryList = () => {
  // State to manage the selected filter
  const [filter, setFilter] = useState<'Taken' | 'Not Taken' | null>(null);

  // Fetch all order history data once
  const { data, isLoading } = api.merchandises.getOrderHistory.useQuery();

  if (isLoading) {
    return <LoadingSpinnerCustom />;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  // Apply client-side filtering based on the selected filter
  const filteredExchanges = filter
    ? data.exchanges.filter((exchange) => exchange.status === filter)
    : data.exchanges;

  return (
    <div className="flex h-full w-full flex-grow flex-col gap-4">
      {/* Dropdown menu for selecting filters */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="inline-flex h-[29px] w-[139px] items-center justify-between rounded-lg bg-white px-2 py-1 shadow-blue-md">
            Add filter <PlusIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuCheckboxItem
            key={'Taken'}
            checked={filter === 'Taken'}
            onCheckedChange={(checked) => {
              setFilter(checked ? 'Taken' : null);
            }}
          >
            Sudah Diambil
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key={'Not Taken'}
            checked={filter === 'Not Taken'}
            onCheckedChange={(checked) => {
              setFilter(checked ? 'Not Taken' : null);
            }}
          >
            Belum Diambil
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render filtered cards */}
      <div className="no-scrollbar flex flex-grow flex-col gap-y-4 overflow-y-auto">
        {filteredExchanges.length > 0 ? (
          filteredExchanges.map((card, index) => (
            <OrderHistoryCard key={card.id} {...card} index={index} />
          ))
        ) : (
          <p>Kamu belum menukar apapun</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryList;
