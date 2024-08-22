import Image from 'next/image';
import LM from 'public/images/assignment/left-middle.png';
import RB from 'public/images/assignment/right-bottom.png';
import TR from 'public/images/assignment/top-right.png';

const AssignmentPage = () => {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white z-0">
      <div className="h-screen w-full bg-[url('/images/assignment/main-background.png')] bg-center bg-no-repeat bg-cover p-6 pt-32">
        {/* Background Component */}
        <Image src={LM} alt="LM" className="fixed top-30 left-0 w-[90%] z-10" />
        <Image src={RB} alt="RB" className="fixed right-0 bottom-0 z-10" />
        <Image src={TR} alt="TR" className="fixed w-[35%] top-0 right-0 z-10" />

        {/* Content */}
        <input type="file" />
      </div>
    </main>
  );
};

export default AssignmentPage;
