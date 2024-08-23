import { Button } from '~/components/ui/button';
interface LandingProps {
  onStart: () => void;
}
export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center text-blue-600 overflow-visible mt-36">
        <h1 className="text-h1 text-shadow-pink-sm font-heading">OSKM</h1>
        <h2 className="relative text-shadow-pink-sm -top-6 text-h2 font-heading">
          Personalities
        </h2>
        <p className="relative text-shadow-green-lg -top-6 font-subheading font-bold text-h6">
          You&lsquo;re diving to OSKM Personalities
        </p>
      </div>
      <p className="mx-[90px] mt-4 text-blue-600 text-h6 leading-[24px] text-center font-body items-center">
        Hi seafolks~ Di sini kamu akan mengeksplor karakter apa yang sekiranya
        cocok dan menggambarkan kepribadian kamu sebagai mahasiswa ITB dan
        memperlihatkan kamu kelas mana yang cocok untuk kamu ikuti
      </p>

      <Button
        onClick={() => onStart()}
        className="mt-8 w-36 h-12 bg-pink-400 py-2 px-5 font-body text-shadow-pink-sm text-[#FEFEFE] "
      >
        <p className="text-b2">Let&#39;s Start!</p>
      </Button>
    </div>
  );
}
