import Image from 'next/image';
import { Button } from '../ui/button';

export default function LembagaModal({
  type,
  onClick,
}: {
  type: 'Confirm' | 'Success' | 'Error';
  onClick: (param: string) => void;
}) {
  const isConfirm = type === 'Confirm';
  const isSuccess = type === 'Success';

  const buttonText = isConfirm
    ? 'Kasih Sekarang'
    : isSuccess
      ? 'Kembali'
      : 'Tutup';

  const message = isConfirm
    ? 'Siap kasih 100 koin untuk Aqualings sekarang?'
    : isSuccess
      ? 'Yeay! 100 koin berhasil diberikan kepada Aqualings!'
      : 'Oops! Terjadi kesalahan saat memberikan koin.';

  const imageSrc = isConfirm
    ? '/images/kunjungan/Penyu.png'
    : isSuccess
      ? '/images/wrapped/svg/cancer.svg'
      : '/images/characters/Sylas.png';

  return (
    <div className="flex h-96 w-72 flex-col items-center justify-center gap-4 rounded-lg border-2 border-orange-400 bg-white drop-shadow-pink-shadow-lg">
      <Image src={imageSrc} alt="OSKM Character" width={140} height={140} />
      <div className="flex w-4/5 flex-col items-center justify-center gap-2">
        <p className="font-heading text-4xl text-orange-500">
          {isConfirm
            ? 'Grant Coins'
            : isSuccess
              ? 'Coins Granted'
              : 'Grant Failed'}
        </p>
        <p className="text-center text-sm text-pink-400">{message}</p>
      </div>
      <Button
        className="w-2/3 bg-orange-400 text-white"
        onClick={() => onClick(buttonText)}
      >
        {buttonText}
      </Button>
    </div>
  );
}
