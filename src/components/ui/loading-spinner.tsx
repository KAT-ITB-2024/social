import Image from 'next/image';

export const LoadingSpinnerCustom = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[160px] h-[160px]">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            backgroundImage: `
              conic-gradient(
                #FFD897 0%, 
                #FFB4D3 25%, 
                #C5FFF3 50%, 
                #99E0FF 75%, 
                #FFD897 100%
              )
            `,
          }}
        ></div>

        <div className="absolute inset-2 bg-blue-500 rounded-full flex items-center justify-center flex-col">
          <div className="relative w-[100px] h-[100px] flex flex-col">
            <Image
              src="/images/loading/loading.gif"
              alt="Loading spinner"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-center text-white text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
};
