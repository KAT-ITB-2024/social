import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const PaginationCustom = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="bg-lightYellow text-black rounded-full shadow-orange-sm"
            href="#"
          />
        </PaginationItem>
        <PaginationItem className="mx-5 flex justify-center items-center w-[80px] h-[80px] rounded-full bg-orange-lightYellow shadow-orange-sm">
          <PaginationLink
            href="#"
            className="w-[60px] h-[60px] bg-lightYellow rounded-full text-turquoise-500 font-semibold text-2xl"
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="bg-lightYellow text-black rounded-full shadow-orange-sm"
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
