// import Link from "next/link";
// import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
// import { Button } from '@/components/ui/button';
import { MenuButton } from '../components/home/MenuButton';
import Image from 'next/image';

export default async function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center"
      style={{
        backgroundImage: "url('/components/bg-home.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-row mb-5">
        <MenuButton label="Chat" variant="Chat" />
        <MenuButton label="Leaderboard" variant="Leaderboard" />
        <MenuButton label="OSKM MBTI" variant="OSKM MBTI" />
        <MenuButton label="Class Selection" variant="Class Selection" />
      </div>

      <div className="flex container border-solid border-2 border-turquoise-100 shadow-[4px_4px_6px_rgba(255,105,180,0.75)] shadow-turquoise-200/50 bg-turquoise-100 rounded-xl w-96 p-1">
        <div className="flex flex-row w-full">
          <Image
            src="/components/coin.png"
            className="w-16 h-auto"
            width={62}
            height={62}
            alt="coin"
          />
          <h5 className=" ml-2 mt-1 text-blue-600">
            {' '}
            Your coins <br /> <p className="sh3 text-turquoise-400">9999999</p>
          </h5>
        </div>
      </div>
    </main>
  );
}
