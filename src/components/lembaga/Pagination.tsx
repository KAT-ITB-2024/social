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

interface CustomPaginationProps {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: CustomPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  const pages = getPaginationItems(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const query = searchParams.get('query')?.toString();
    const faculty = searchParams.get('faculty')?.toString();

    router.push(
      `?page=${page}` +
        (query ? `&query=${query}` : '') +
        (faculty ? `&faculty=${faculty}` : ''),
      { scroll: false },
    );
  };

  return (
    <Pagination className="mx-0 w-[70%] font-body text-base font-normal text-[#FFFEFE]">
      <PaginationContent className="gap-[10px]">
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            className="h-6 w-6 rounded-[4px] bg-orange-400 p-[2px] text-[#FFFEFE]"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pages.map((item) => (
          <PaginationItem key={item} className="mb-[2px]">
            <PaginationLink
              onClick={() => handlePageChange(item)}
              className={`h-6 w-6 rounded-[4px] bg-orange-400 p-[2px] ${
                item === currentPage ? 'border border-[#99E0FF]' : ''
              }`}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            className="h-6 w-6 rounded-[4px] bg-orange-400 p-[2px] text-[#FFFEFE]"
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

  // Add up to 4 pages around the current one (2 on each side)
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
