import Image from 'next/image';

interface CardTopScoreProps {
  rank: number;
  profileImage?: string | null;
  name: string;
  nim?: string;
  point: number | null;
  isIndividual?: boolean;
  isUser?: boolean;
  onClick?: () => void;
}

export default function CardTopScore({
  rank,
  profileImage,
  name,
  nim,
  point,
  isIndividual = true,
  isUser = false,
  onClick,
}: CardTopScoreProps) {
  let profilePicture = profileImage;
  if (isIndividual)
    profilePicture =
      profileImage && profileImage !== ''
        ? profileImage
        : '/images/leaderboard/no-profile.png';

  return (
    <div
      className={`flex w-[110px] flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-[#05A798] bg-gradient-to-br ${
        isUser
          ? 'from-[#0CEBCC99] to-[#05A798]'
          : 'from-[#C5FFF3B2] to-[#99E0FFB2]'
      } p-2 text-[#006E6F] shadow-[4px_4px_10px_0_#FFBF5180]`}
      onClick={onClick}
    >
      {/* Rank and Profile*/}
      <div className="relative mt-1">
        <span className="absolute -left-4 -top-1 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-[#006E6F] font-heading font-normal text-[#FEFDA3]">
          #{rank}
        </span>
        {profilePicture && isIndividual ? (
          <Image
            className="h-[54px] w-[54px] rounded-full"
            src={profilePicture}
            alt="profile-image"
            width={54}
            height={54}
          />
        ) : (
          <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#FEFDA3] font-heading text-xl font-normal">
            {name.split('-')[1]}
          </span>
        )}
      </div>

      {/* Identity */}
      {isIndividual && nim ? (
        <>
          <p className="line-clamp-2 break-all text-center font-subheading font-bold">
            {name}
          </p>
          <p className="text-center font-body text-sm font-normal">{nim}</p>
        </>
      ) : (
        <>
          <p className="line-clamp-2 break-all text-center font-subheading font-bold">
            {name}
          </p>
        </>
      )}

      {/* Points */}
      <span className="text-wrap rounded-full bg-[#FEFDA3] px-3 font-heading font-normal">
        {point ? point : 0}&nbsp;
        {point && point > -2 && point < 2 ? 'pt' : 'pts'}
      </span>
    </div>
  );
}
