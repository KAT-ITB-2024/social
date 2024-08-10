import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sky-800">
      <div
        className="fixed-width-container flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/components/bg-404.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Image
          className="-mb-8"
          src="/components/404.svg"
          alt="404 | Page not found"
          width={300}
          height={300}
        />
        <p className="text-blue-600 text-center text-5xl px-10 font-heading ">
          UPS!
        </p>
        <p className="text-blue-600 text-center text-xl px-10 font-bold">
          Kamu menyelam terlalu dalam!
        </p>
        <p className="text-blue-600 text-center text-base px-10">
          Jangan khawatir, Aqualings! Kalian bisa
        </p>
        <p className="text-blue-600 text-center text-base px-10">
          langsung kembali ke <span> </span>
          {/*Link not change yet*/}
          <Link
            href="https://www.figma.com/design/GxFkyC2v4j4Ha9SxT79gjm/OSKM-ITB-2024---SOCIAL?node-id=935-802&t=Kf6oGFf5C2mXrvnv-0"
            legacyBehavior
          >
            <a className="text-pink-400 text-base hover:underline">home</a>
          </Link>
        </p>
      </div>
    </main>
  );
}
