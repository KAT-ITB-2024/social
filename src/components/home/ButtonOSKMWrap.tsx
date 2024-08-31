'use client';
import { useRouter } from 'next/navigation';

export const ButtonOSKMWrap = () => {
  const router = useRouter();
  const routePath = '';

  const userName = 'Jason';

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="flex flex-col w-[86%] justify-center items-center py-[24px] px-5 container rounded-xl my-5 gap-3"
          onClick={() => router.push(routePath)}
          style={{
            backgroundImage: "url('/images/home/bg-oskm-wrapped-button.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.9,
          }}
        >
          <div className="font-[700] text-xl text-center leading-[24px] text-[#000D76] px-5">
            {userName}, your OSKM Wrapped is here!
          </div>
          <div className="text-[#000D76] text-center">
            Tap to reveal your diving secrets!
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonOSKMWrap;
