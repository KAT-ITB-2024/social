import Image from 'next/image';
import { toast } from 'sonner';

export const SuccessToast = ({
  title = 'Success',
  desc,
}: {
  title?: string;
  desc: string;
}) => {
  return (
    <div className="relative bg-white text-success-500 w-[450px] h-[70px] flex items-center">
      <div className="flex flex-row border-l-4 border-success-600 ml-2 h-[60px] pl-4">
        <div className="flex flex-row items-center justify-center gap-x-4">
          <Image
            src={'/images/toast/check_circle.png'}
            width={28}
            height={28}
            alt="check box"
          />
          <div className="flex flex-col w-3/4">
            <p className="text-b2 text-neutral-700 font-bold">{title}</p>
            <p className="text-h6 text-neutral-400">{desc}</p>
          </div>
          <div onClick={() => toast.dismiss()} className="cursor-pointer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3 0.710001C12.91 0.320001 12.28 0.320001 11.89 0.710001L7 5.59L2.11 0.700001C1.72 0.310001 1.09 0.310001 0.700001 0.700001C0.310001 1.09 0.310001 1.72 0.700001 2.11L5.59 7L0.700001 11.89C0.310001 12.28 0.310001 12.91 0.700001 13.3C1.09 13.69 1.72 13.69 2.11 13.3L7 8.41L11.89 13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.41 7L13.3 2.11C13.68 1.73 13.68 1.09 13.3 0.710001Z"
                fill="#384053"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute right-[-2.5rem] bottom-[-2rem]">
        <Image
          src={'/images/toast/Pulau.png'}
          width={90}
          height={90}
          alt="Dekorasi toast"
        />
      </div>
    </div>
  );
};
