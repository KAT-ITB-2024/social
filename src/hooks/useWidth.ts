'use client';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const UseDebouncedWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access window only on the client side
      const handleResize = debounce(() => {
        setWidth(window.innerWidth);
      }, 100);

      setWidth(window.innerWidth);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      window.addEventListener('resize', handleResize);

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        handleResize.cancel();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return width;
};

export default UseDebouncedWidth;
