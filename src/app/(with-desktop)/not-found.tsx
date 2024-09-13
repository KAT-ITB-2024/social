import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sky-800">
      <div
        className="fixed-width-container flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/conditional/bg-404.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <Image
          className="-mb-8"
          src="/images/conditional/404.png"
          alt="404 | Page not found"
          width={300}
          height={300}
        />
        <p className="px-10 text-center font-heading text-5xl text-blue-600">
          {' '}
          UPS!{' '}
        </p>
        <p className="px-10 text-center text-xl font-bold text-blue-600">
          {' '}
          Kamu menyelam terlalu dalam!{' '}
        </p>
        <p className="px-10 text-center text-base text-blue-600">
          {' '}
          Jangan khawatir, Aqualings! Kalian bisa{' '}
        </p>
        <p className="px-10 text-center text-base text-blue-600">
          langsung kembali ke <span> </span>
          <Link href="/" legacyBehavior>
            <a className="text-base text-pink-400 hover:underline">home</a>
          </Link>
        </p>
      </div>
    </main>
  );
}
