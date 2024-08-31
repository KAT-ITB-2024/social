import { useEffect } from 'react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import type { Dispatch, SetStateAction } from 'react';
import { type State } from './QnAData';

interface LoadingProps {
  onFinish: Dispatch<SetStateAction<State>>;
}
export default function LoadingPersonality({ onFinish }: LoadingProps) {
  useEffect(() => {
    const waitFiveSecond = () => {
      onFinish('finished');
    };

    const timer = setTimeout(waitFiveSecond, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col justify-center text-center items-center px-20 h-full">
      <LoadingSpinnerCustom key={'ayam'} />
      <h4 className="text-h4 text-[#FEFDA3] text-shadow-neutral-lg mt-56 z-50">
        Hold on, we&lsquo;re diving deeper to the deep sea
      </h4>
    </div>
  );
}
