'use client';
import Image from 'next/image';
import LM from 'public/images/assignment/left-middle.png';
import RB from 'public/images/assignment/right-bottom.png';
import TR from 'public/images/assignment/top-right.png';
import { MainTask } from '~/components/assignment/MainTask';
import { SideTask } from '~/components/assignment/SideTask';
import { TabsAssignment, type TabsProps } from '~/components/Tabs';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

const AssignmentPage = () => {
  const TabsProps: TabsProps = {
    leftTrigger: 'Main',
    rightTrigger: 'Side',
    leftContent: <MainTask />,
    rightContent: <SideTask />,
  };
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  } else if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }
  return (
    <main className="z-0 h-screen w-full items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* Background Component */}
      <div
        className="fixed h-full w-full max-w-md"
        style={{
          backgroundImage: "url('/images/detail/bg-detail.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <Image
          src={LM}
          alt="LM"
          className="top-30 absolute left-0 z-10 w-[90%] select-none"
        />
        <Image
          src={RB}
          alt="RB"
          className="absolute bottom-0 right-0 z-10 select-none"
        />
        <Image
          src={TR}
          alt="TR"
          className="absolute right-0 top-0 z-10 w-[35%] select-none"
        />
      </div>

      {/* Content */}
      <div className="h-full w-full overflow-auto p-6 pb-0 pt-[100px]">
        <div className="no-scrollbar h-full w-full overflow-y-scroll">
          <TabsAssignment {...TabsProps} classname="relative z-10" />
        </div>
      </div>
    </main>
  );
};

export default AssignmentPage;
