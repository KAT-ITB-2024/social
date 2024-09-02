'use client';
import { useRouter } from 'next/navigation';

export const ButtonOSKMWrap = () => {
  const router = useRouter();
  const routePath = '';

  // TODO REPLACE USER NAME
  const userName = 'Jason';

  return (
    <div className="flex items-center justify-center">
      <div
        className="container my-5 flex w-[86%] flex-col items-center justify-center gap-3 rounded-xl px-5 py-[24px]"
        onClick={() => router.push(routePath)}
        style={{
          backgroundImage: "url('/images/home/bg-oskm-wrapped-button.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
      >
        <div className="px-5 text-center text-xl font-[700] leading-[24px] text-[#000D76]">
          {userName}, your OSKM Wrapped is here!
        </div>
        <div className="text-center text-[#000D76]">
          Tap to reveal your diving secrets!
        </div>
      </div>
    </div>
  );
};

export default ButtonOSKMWrap;
