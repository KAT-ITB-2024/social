import Image from 'next/image';

const WrappedStories = [
  {
    content: () => {
      return (
        <>
          <Image
            src="/images/wrapped/Wrapped 1.png"
            alt="Wrapped 1"
            fill={true}
            className="absolute"
          />
          <Image
            src="/images/wrapped/logo.svg"
            alt="Logo"
            width={96}
            height={50}
            className="absolute left-3 top-6"
          />
          <Image
            src="/images/wrapped/seahorse.svg"
            alt="Logo"
            width={200}
            height={350}
            className="absolute right-0 top-[-60px]"
          />
          <Image
            src="/images/wrapped/island.svg"
            alt="Logo"
            width={500}
            height={500}
            className="absolute bottom-0"
          />
          <p className="absolute left-[84px] w-2/3 pt-3 text-center font-heading text-7xl text-orange-100 blur-md">
            OSKM Wrapped
          </p>
          <p className="absolute left-20 w-2/3 text-center font-heading text-7xl text-blue-500">
            OSKM Wrapped
          </p>
        </>
      );
    },
  },
  {
    content: () => {
      return (
        <>
          <Image
            src="/images/wrapped/Wrapped 2.png"
            alt="Wrapped 1"
            fill={true}
            className="absolute"
          />
          <Image
            src="/images/wrapped/logo.svg"
            alt="Logo"
            width={96}
            height={50}
            className="absolute left-3 top-6"
          />
          <Image
            src="/images/wrapped/seahorse.svg"
            alt="Logo"
            width={200}
            height={350}
            className="absolute right-0 top-[-60px]"
          />
          <Image
            src="/images/wrapped/island.svg"
            alt="Logo"
            width={500}
            height={500}
            className="absolute bottom-0"
          />
          <p className="absolute left-[84px] w-2/3 pt-3 text-center font-heading text-7xl text-orange-100 blur-md">
            OSKM Wrapped
          </p>
          <p className="absolute left-20 w-2/3 text-center font-heading text-7xl text-blue-500">
            OSKM Wrapped
          </p>
        </>
      );
    },
  },
];

export { WrappedStories };
