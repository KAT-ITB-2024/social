'use client';
import UseDebouncedWidth from '~/hooks/useWidth';
import MobileView from './mobile-view';
import DesktopView from './desktop-view';
import { Lembaga } from './page';

const MainContent = ({ lembaga }: { lembaga: Lembaga }) => {
  const width = UseDebouncedWidth();

  if (width < 500) {
    return <MobileView lembaga={lembaga} />;
  } else {
    return <DesktopView lembaga={lembaga} />;
  }
};

export default MainContent;
