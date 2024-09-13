'use client';

import UseDebouncedWidth from '~/hooks/useWidth';
import GrantMobileView from './mobile-view';
import GrantDesktopView from './desktop-view';

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
