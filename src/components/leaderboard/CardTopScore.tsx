import Image from 'next/image';

interface CardDefaultProps {
  rank: number;
  profilePicture: string;
  name: string;
  sid: string;
  point: number;
  isBelong?: boolean;
}

export default function CardTopScore({
  rank,
  profilePicture,
  name,
  sid,
  point,
}: CardDefaultProps) {
  return (
    <div className="flex flex-col w-[110px] items-center justify-center p-2 rounded-[12px] border-2 border-[#05A798] gap-3 text-[#006E6F] bg-gradient-to-br from-[#C5FFF3B2] to-[#99E0FFB2]">
      {/* Rank and Profile*/}
      <div className="relative mt-1">
        <span className="absolute flex items-center justify-center rounded-full z-[2] -top-1 -left-4 font-heading w-8 h-8 bg-[#006E6F] text-[#FEFDA3] font-normal">
          #{rank}
        </span>
        <Image
          className="w-[54px] h-[54px] rounded-full"
          src={profilePicture}
          alt="profile-image"
          width={40}
          height={40}
        />
      </div>

      {/* Identity */}
      <p className="font-subheading font-bold text-center">{name}</p>
      <p className="font-body text-sm font-normal text-center">{sid}</p>

      {/* Points */}
      <span className="rounded-full px-3 text-wrap font-heading font-normal bg-[#FEFDA3]">
        {point}&nbsp;{point > 0 ? 'pts' : 'pt'}
      </span>
    </div>
  );
}
