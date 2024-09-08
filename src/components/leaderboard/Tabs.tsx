'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '~/lib/utils';

interface TabsProps {
  leftTrigger: string;
  rightTrigger: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  classname?: string;
}

export const TabsAssignment = ({
  leftTrigger,
  rightTrigger,
  leftContent,
  rightContent,
  classname,
}: TabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentContent = searchParams.get('content') ?? leftTrigger;
  const currentPage = searchParams.get('page') ?? '1';

  useEffect(() => {
    const selectedTab = searchParams.get('content') ?? leftTrigger;
    router.push(`?content=${selectedTab}&page=${currentPage}`, {
      scroll: false,
    });
  }, [router, searchParams, leftTrigger, currentPage]);

  const handleValueChange = (value: string) => {
    router.push(`?content=${value}&page=1`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={currentContent}
      onValueChange={handleValueChange}
      className={cn(
        'flex w-full flex-col items-center justify-center',
        classname,
      )}
    >
      <TabsList className="flex w-full max-w-[400px] items-center justify-center rounded-full bg-lightYellow p-0 shadow-orange-sm">
        <TabsTrigger
          value={leftTrigger}
          className="h-full w-1/2 rounded-full bg-lightYellow font-bold text-blue-500 transition-colors duration-500 ease-in-out data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow"
        >
          {leftTrigger}
        </TabsTrigger>
        <TabsTrigger
          value={rightTrigger}
          className="h-full w-1/2 rounded-full bg-lightYellow font-bold text-blue-500 transition-colors duration-500 ease-in-out data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow"
        >
          {rightTrigger}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={leftTrigger}>{leftContent}</TabsContent>
      <TabsContent value={rightTrigger}>{rightContent}</TabsContent>
    </Tabs>
  );
};
