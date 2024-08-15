import CardTopScore from './CardTopScore';

interface CardTopScoreProps {
  profilePicture?: string;
  name: string;
  sid?: string;
  point: number;
  isIndividual?: boolean;
}

interface TopScoreProps {
  cards: Array<CardTopScoreProps>;
  isIndividual?: boolean;
}

export default function TopThreeContainer({
  cards,
  isIndividual = true,
}: TopScoreProps) {
  return (
    <div className="relative grid my-2 grid-cols-3 gap-2 w-[346px]">
      <div>
        <div className="h-16"></div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={2}
          profilePicture={cards[1]!.profilePicture}
          name={cards[1]!.name}
          sid={cards[1]!.sid}
          point={cards[1]!.point}
        />
      </div>
      <div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={1}
          profilePicture={cards[0]!.profilePicture}
          name={cards[0]!.name}
          sid={cards[0]!.sid}
          point={cards[0]!.point}
        />
      </div>
      <div>
        <div className="h-16"></div>
        <CardTopScore
          isIndividual={isIndividual}
          rank={3}
          profilePicture={cards[2]!.profilePicture}
          name={cards[2]!.name}
          sid={cards[2]!.sid}
          point={cards[2]!.point}
        />
      </div>
    </div>
  );
}
