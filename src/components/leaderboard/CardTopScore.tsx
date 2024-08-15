import Image from 'next/image';

interface CardTopScoreProps {
  rank: number;
  profilePicture?: string;
  name: string;
  sid?: string;
  point: number;
  isIndividual?: boolean;
}

export default function CardTopScore({
  rank,
  profilePicture,
  name,
  sid,
  point,
  isIndividual = true,
}: CardTopScoreProps) {
  return (
    <div className="flex flex-col w-[110px] items-center justify-center p-2 rounded-[12px] border-2 border-[#05A798] gap-3 text-[#006E6F] shadow-[4px_4px_10px_0_#FFBF5180] bg-gradient-to-br from-[#C5FFF3B2] to-[#99E0FFB2]">
      {/* Rank and Profile*/}
      <div className="relative mt-1">
        <span className="absolute flex items-center justify-center rounded-full z-[2] -top-1 -left-4 font-heading w-8 h-8 bg-[#006E6F] text-[#FEFDA3] font-normal">
          #{rank}
        </span>
        {profilePicture && isIndividual ? (
          <Image
            className="w-[54px] h-[54px] rounded-full"
            src={profilePicture}
            alt="profile-image"
            width={54}
            height={54}
          />
        ) : (
          <span className="w-[54px] flex items-center justify-center h-[54px] rounded-full bg-[#FEFDA3] font-heading font-normal text-xl">
            {name}
          </span>
        )}
      </div>

      {/* Identity */}
      {isIndividual && sid ? (
        <>
          <p className="font-subheading font-bold text-center">{name}</p>
          <p className="font-body text-sm font-normal text-center">{sid}</p>
        </>
      ) : (
        <>
          <p className="font-subheading font-bold text-center">{`Kelompok ${name}`}</p>
        </>
      )}

      {/* Points */}
      <span className="rounded-full px-3 text-wrap font-heading font-normal bg-[#FEFDA3]">
        {point}&nbsp;{point > -2 && point < 2 ? 'pt' : 'pts'}
      </span>
    </div>
  );
}
