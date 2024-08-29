import Image from 'next/image';

interface CardDefaultProps {
  rank: number;
  profileImage?: string;
  name: string;
  nim?: string;
  point: number;
  isUser?: boolean;
  isIndividual?: boolean;
}

export default function CardDefault({
  rank,
  profileImage,
  name,
  nim,
  point,
  isUser = false,
  isIndividual = true,
}: CardDefaultProps) {
  return (
    <div
      className={`flex flex-row w-[345px] items-center p-2 rounded-[12px] border-[2px] border-[#05A798] gap-2 text-[#006E6F] shadow-[4px_4px_10px_0_#FFBF5180] bg-gradient-to-br ${
        isUser
          ? 'from-[#0CEBCC99] to-[#05A798]'
          : 'from-[#C5FFF3B2] to-[#99E0FFB2]'
      }`}
    >
      {/* Rank */}
      <span className="font-heading w-[46px] text-center text-wrap font-normal">
        #{rank}
      </span>

      {/* Profile section*/}
      <div className="flex gap-2 flex-row items-center flex-grow">
        {isIndividual && profileImage ? (
          <>
            <Image
              className="w-[40px] h-[40px] rounded-full"
              src={profileImage}
              alt="profile-image"
              width={40}
              height={40}
            />
            <div className="flex flex-col justify-between">
              <p className="font-subheading font-bold break-all line-clamp-1">
                {name}
              </p>
              <p className="font-body text-sm font-normal">{nim}</p>
            </div>
          </>
        ) : (
          <>
            <span className="w-10 flex items-center justify-center h-10 rounded-full bg-[#FEFDA3] font-heading font-normal text-xl">
              {name.split('-')[1]}
            </span>
            <p className="font-subheading font-bold break-all line-clamp-1">{`${name}`}</p>
          </>
        )}
      </div>

      {/* Points */}
      <span className="rounded-full px-2 text-wrap font-heading font-normal bg-[#FEFDA3]">
        {point}&nbsp;pts
      </span>
    </div>
  );
}
