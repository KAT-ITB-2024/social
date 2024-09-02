import CardTopScore from './CardTopScore';

interface CardTopScoreProps {
  profileImage?: string | null;
  name: string;
  nim?: string;
  point: number | null;
  rank: number;
  isIndividual?: boolean;
}

//name: string; nim: string; profileImage: string | null; point: number | null; rank: number;

interface TopScoreProps {
  cards: Array<CardTopScoreProps>;
  currentUserNim: string;
  currentUserGroup: string;
  isIndividual?: boolean;
}

export default function TopThreeContainer({
  cards,
  currentUserGroup,
  currentUserNim,
  isIndividual = true,
}: TopScoreProps) {
  console.log('GROUP: ', currentUserGroup, cards, isIndividual);
  console.log(cards[0]?.name === currentUserGroup);
  return (
    <div className="relative my-2 grid w-[346px] grid-cols-3 gap-2">
      <div>
        <div className="h-16"></div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={cards[1]!.rank}
          profileImage={cards[1]!.profileImage}
          name={cards[1]!.name}
          nim={cards[1]!.nim}
          point={cards[1]!.point}
          isUser={
            isIndividual
              ? currentUserNim === cards[1]?.nim
              : currentUserGroup === cards[1]?.name
          }
        />
      </div>
      <div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={cards[0]!.rank}
          profileImage={cards[0]!.profileImage}
          name={cards[0]!.name}
          nim={cards[0]!.nim}
          point={cards[0]!.point}
          isUser={
            isIndividual
              ? currentUserNim === cards[0]?.nim
              : currentUserGroup === cards[0]?.name
          }
        />
      </div>
      <div>
        <div className="h-16"></div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={cards[2]!.rank}
          profileImage={cards[2]!.profileImage}
          name={cards[2]!.name}
          nim={cards[2]!.nim}
          point={cards[2]!.point}
          isUser={
            isIndividual
              ? currentUserNim === cards[2]?.nim
              : currentUserGroup === cards[2]?.name
          }
        />
      </div>
    </div>
  );
}
