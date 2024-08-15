import Image from 'next/image';

interface CardDefaultProps {
  rank: number;
  profilePicture: string;
  name: string;
  sid: string;
  point: number;
  isBelong?: boolean;
}

export default function CardDefault({
  rank,
  profilePicture,
  name,
  sid,
  point,
  isBelong = false,
}: CardDefaultProps) {
  return (
    <div
      className={`flex flex-row w-[345px] items-center p-2 rounded-[12px] border-[2px] border-[#05A798] gap-2 text-[#006E6F] bg-gradient-to-br ${
        isBelong
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
        <Image
          className="w-[40px] h-[40px] rounded-full"
          src={profilePicture}
          alt="profile-image"
          width={40}
          height={40}
        />
        <div className="flex flex-col justify-between">
          <p className="font-subheading font-bold">{name}</p>
          <p className="font-body text-sm font-normal">{sid}</p>
        </div>
      </div>

      {/* Points */}
      <span className="rounded-full px-2 text-wrap font-heading font-normal bg-[#FEFDA3]">
        {point}&nbsp;pts
      </span>
    </div>
  );
}
