import type { Dispatch, SetStateAction } from 'react';
import { Button } from '~/components/ui/button';
import { type State } from './QnAData';
interface LandingProps {
  onStart: Dispatch<SetStateAction<State>>;
}
export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-36 flex flex-col items-center overflow-visible text-blue-600">
        <h1 className="font-heading text-h1 text-shadow-pink-sm">OSKM</h1>
        <h2 className="relative -top-6 font-heading text-h2 text-shadow-pink-sm">
          Personalities
        </h2>
        <p className="relative -top-6 font-subheading text-h6 font-bold text-shadow-green-lg">
          You&lsquo;re diving to OSKM Personalities
        </p>
      </div>
      <p className="mx-[90px] mt-4 items-center text-center font-body text-h6 leading-[24px] text-blue-600">
        Hi seafolks~ Di sini kamu akan mengeksplor karakter apa yang sekiranya
        cocok dan menggambarkan kepribadian kamu sebagai mahasiswa ITB
      </p>

      <Button
        onClick={() => onStart('started')}
        className="mt-8 h-12 w-36 bg-pink-400 px-5 py-2 font-body text-[#FEFEFE] text-shadow-pink-sm"
      >
        <p className="text-b2">Let&#39;s Start!</p>
      </Button>
    </div>
  );
}
