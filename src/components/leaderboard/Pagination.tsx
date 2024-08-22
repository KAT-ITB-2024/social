'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, useRouter } from 'next/navigation';

export const CustomPagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const currentContent = searchParams.get('content') ?? 'Individu';

  const pages = getPaginationItems(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(`?content=${currentContent}&page=${page}`, { scroll: false });
  };

  return (
    <Pagination className="font-body text-base font-normal text-[#FFFEFE] w-[70%]">
      <PaginationContent className="gap-[10px]">
        <PaginationItem>
          <PaginationPrevious
            className="bg-[#000D76] text-[#FFFEFE] w-6 h-6 p-[2px] rounded-[4px] "
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item} className="mb-[2px]">
            <PaginationLink
              onClick={() => handlePageChange(item)}
              className={`w-6 h-6 p-[2px] rounded-[4px] bg-[#000D76] ${item === currentPage ? 'border border-[#99E0FF]' : ''}`}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className="bg-[#000D76] text-[#FFFEFE] w-6 h-6 p-[2px] rounded-[4px] "
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

function getPaginationItems(current: number, totalPages: number) {
  const pages: number[] = [current];
  let left = current - 1;
  let right = current + 1;

  while (pages.length < 5 && (left >= 1 || right <= totalPages)) {
    if (left >= 1) {
      pages.unshift(left);
      left--;
    }
    if (right <= totalPages && pages.length < 5) {
      pages.push(right);
      right++;
    }
  }

  return pages;
}
