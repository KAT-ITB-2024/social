'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import UseDebouncedWidth from '~/hooks/useWidth';
import GrantMobileView from './mobile-view';
import GrantDesktopView from './desktop-view';
import { api } from '~/trpc/react';
import { FacultyEnum } from '~/types/enums/faculty';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const GrantMainContent = () => {
  const searchParams = useSearchParams();
  const width = UseDebouncedWidth();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const nameOrNim = searchParams.get('query') ?? '';
  let faculty = searchParams.get('faculty')?.split(',') ?? [];

  faculty = faculty.filter((fact) =>
    Object.values(FacultyEnum).includes(fact as FacultyEnum),
  );

  const { data, isLoading, isError } = api.lembaga.getAllVisitors.useQuery({
    nameOrNim,
    faculty: faculty as FacultyEnum[],
    page,
    limit: 8,
  });

  if (isLoading) return <LoadingSpinnerCustom />;

  if (!data) return notFound();
  const { totalItems, totalPages } = data;
  const { paginatedData, boothData } = data?.data || {};

  // Render mobile or desktop view based on screen width
  if (width < 500) {
    return (
      <GrantMobileView
        paginatedData={paginatedData}
        totalPages={totalPages}
        boothData={boothData}
        currentPage={page}
        onPageChange={setPage}
        totalItems={totalItems}
      />
    );
  } else {
    return (
      <GrantDesktopView
        paginatedData={paginatedData}
        totalPages={totalPages}
        boothData={boothData}
        currentPage={page}
        onPageChange={setPage}
        totalItems={totalItems}
      />
    );
  }
};

export default GrantMainContent;
