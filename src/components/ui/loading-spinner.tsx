import Image from 'next/image';

export const LoadingSpinnerCustom = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[160px] h-[160px]">
        <div
          className="absolute inset-0 rounded-full animate-spin p-[2px]"
          style={{
            backgroundImage: `
              conic-gradient(
                rgba(255, 216, 151, 0.8) 0%,
                rgba(255, 180, 211, 0.8) 25%, 
                rgba(197, 255, 243, 0.8) 50%, 
                rgba(153, 224, 255, 0.8) 75%, 
                rgba(255, 216, 151, 0.8) 100%
              )
            `,
            mask: 'radial-gradient(closest-side, transparent 80%, black)',
            WebkitMask: 'radial-gradient(closest-side, transparent 80%, black)',
          }}
        ></div>

        <div className="absolute inset-2 rounded-full flex items-center justify-center flex-col">
          <div className="relative w-[100px] h-[100px] flex flex-col">
            <Image
              src="/images/loading/loading.gif"
              alt="Loading spinner"
              fill
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </div>
          <p className="text-center text-white text-sm -mt-4">
            Loading<span className="animate-pulse">.</span>
            <span className="animate-pulse delay-300">.</span>
            <span className="animate-pulse delay-700">.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
