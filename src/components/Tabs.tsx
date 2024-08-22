'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsProps {
  leftTrigger: string;
  rightTrigger: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftValue?: string;
  rightValue?: string;
}

export const TabsAssignment = ({
  leftTrigger,
  rightTrigger,
  leftContent,
  rightContent,
  leftValue = 'leftValue',
  rightValue = 'rightValue',
}: TabsProps) => {
  return (
    <Tabs
      defaultValue={leftValue}
      className="w-full flex flex-col items-center"
    >
      <TabsList className="rounded-full p-0 bg-lightYellow w-3/4 shadow-orange-sm">
        <TabsTrigger
          value={leftValue}
          className="w-1/2 bg-lightYellow h-full text-blue-500 rounded-full 
        data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow font-bold transition-colors duration-500 ease-in-out"
        >
          {leftTrigger}
        </TabsTrigger>
        <TabsTrigger
          value={rightValue}
          className="w-1/2 bg-lightYellow h-full text-blue-500 rounded-full 
        data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow font-bold transition-colors duration-500 ease-in-out"
        >
          {rightTrigger}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={leftValue}>{leftContent}</TabsContent>
      <TabsContent value={rightValue}>{rightContent}</TabsContent>
    </Tabs>
  );
};
