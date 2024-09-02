import Image from 'next/image';

interface CardDefaultProps {
  rank: number;
  profileImage?: string;
  name: string;
  nim?: string;
  point: number;
  isUser?: boolean;
  isIndividual?: boolean;
  onClick?: () => void;
}

export default function CardDefault({
  rank,
  profileImage,
  name,
  nim,
  point,
  isUser = false,
  isIndividual = true,
  onClick,
}: CardDefaultProps) {
  return (
    <button
      className={`flex w-[345px] flex-row items-center gap-2 rounded-[12px] border-[2px] border-[#05A798] bg-gradient-to-br p-2 text-[#006E6F] shadow-[4px_4px_10px_0_#FFBF5180] ${
        isUser
          ? 'from-[#0CEBCC99] to-[#05A798]'
          : 'from-[#C5FFF3B2] to-[#99E0FFB2]'
      }`}
      onClick={onClick}
    >
      {/* Rank */}
      <span className="w-[46px] text-wrap text-center font-heading font-normal">
        #{rank}
      </span>

      {/* Profile section*/}
      <div className="flex flex-grow flex-row items-center gap-2">
        {isIndividual && profileImage ? (
          <>
            <Image
              className="h-[40px] w-[40px] rounded-full"
              src={profileImage}
              alt="profile-image"
              width={40}
              height={40}
            />
            <div className="flex flex-col justify-between text-left">
              <p className="line-clamp-1 break-all font-subheading font-bold">
                {name}
              </p>
              <p className="font-body text-sm font-normal">{nim}</p>
            </div>
          </>
        ) : (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEFDA3] font-heading text-xl font-normal">
              {name.split('-')[1]}
            </span>
            <p className="line-clamp-1 break-all font-subheading font-bold">{`${name}`}</p>
          </>
        )}
      </div>

      {/* Points */}
      <span className="text-wrap rounded-full bg-[#FEFDA3] px-2 font-heading font-normal">
        {point}&nbsp;pts
      </span>
    </button>
  );
}
