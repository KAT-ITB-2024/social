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
  const width = UseDebouncedWidth();

  // Render mobile or desktop view based on screen width
  if (width < 500) {
    return <GrantMobileView />;
  } else {
    return <GrantDesktopView />;
  }
};

export default GrantMainContent;
