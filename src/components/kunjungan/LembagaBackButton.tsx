'use client';
import Back from 'public/icons/kunjungan/back-icon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LembagaBackButton = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <button type="button" onClick={goBack}>
      <Image src={Back} alt="back" width={40} height={40} />
    </button>
  );
};

export default LembagaBackButton;
