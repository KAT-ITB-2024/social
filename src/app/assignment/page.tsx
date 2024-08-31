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
    <main className="h-screen w-full items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white z-0">
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
          className="absolute  top-30 left-0 w-[90%] z-10 select-none"
        />
        <Image
          src={RB}
          alt="RB"
          className="absolute  right-0 bottom-0 z-10 select-none"
        />
        <Image
          src={TR}
          alt="TR"
          className="absolute  w-[35%] top-0 right-0 z-10 select-none"
        />
      </div>

      {/* Content */}
      <div className="h-full w-full p-6 pb-0 pt-[100px] overflow-auto">
        <div className="h-full w-full overflow-y-scroll no-scrollbar">
          <TabsAssignment {...TabsProps} classname="relative z-10" />
        </div>
      </div>
    </main>
  );
};

export default AssignmentPage;
