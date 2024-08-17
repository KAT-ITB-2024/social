'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabsProps {
  leftTrigger: string;
  rightTrigger: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export const TabsAssignment = ({
  leftTrigger,
  rightTrigger,
  leftContent,
  rightContent,
}: TabsProps) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="rounded-full p-0 bg-lightYellow w-[300px] shadow-orange-sm">
        <TabsTrigger
          value="account"
          className="w-1/2 bg-lightYellow h-full text-blue-500 rounded-full 
        data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow font-bold transition-colors duration-500 ease-in-out"
        >
          {leftTrigger}
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="w-1/2 bg-lightYellow h-full text-blue-500 rounded-full 
        data-[state=active]:bg-blue-500 data-[state=active]:text-lightYellow font-bold transition-colors duration-500 ease-in-out"
        >
          {rightTrigger}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">{leftContent}</TabsContent>
      <TabsContent value="password">{rightContent}</TabsContent>
    </Tabs>
  );
};
