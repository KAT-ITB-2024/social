'use client';
import Back from 'public/icons/back.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <button type="button" onClick={goBack}>
      <div className="flex flex-row items-center justify-start gap-5">
        <Image src={Back} alt="back" width={7} height={7} />
        <p className="text-bold text-sh5 font-bold text-blue-500">Kembali</p>
      </div>
    </button>
  );
};

export default BackButton;
