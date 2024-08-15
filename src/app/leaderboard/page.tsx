import CardDefault from '~/components/leaderboard/CardDefault';
import CardTopScore from '~/components/leaderboard/CardTopScore';

interface CardDefaultProps {
  rank: number;
  profilePicture: string;
  name: string;
  sid: string;
  point: number;
  isBelong?: boolean;
}
const data: Array<CardDefaultProps> = [
  {
    rank: 2,
    profilePicture: '/images/leaderboard/image.png',
    name: 'Wakwaw',
    sid: '13521000',
    point: 1234,
    isBelong: true,
  },
  {
    rank: 3333,
    profilePicture: '/images/leaderboard/image.png',
    name: 'Wakwaw Sitohang Yang hebat',
    sid: '13521000',
    point: 1234,
  },
  {
    rank: 2,
    profilePicture: '/images/leaderboard/image.png',
    name: 'Wakwaw',
    sid: '13521000',
    point: 1234,
  },
  {
    rank: 2,
    profilePicture: '/images/leaderboard/image.png',
    name: 'Wakwaw',
    sid: '13521000',
    point: 1234,
  },
];

export default function LeaderBoard() {
  return (
    <main className="mt-[100px] items-center justify-center flex flex-col gap-3">
      {data.map((item, index) => (
        <CardDefault
          key={index}
          rank={item.rank}
          profilePicture={item.profilePicture}
          name={item.name}
          sid={item.sid}
          point={item.point}
          isBelong={item.isBelong}
        />
      ))}
      {data.map((item, index) => (
        <CardTopScore
          key={index}
          rank={item.rank}
          profilePicture={item.profilePicture}
          name={item.name}
          sid={item.sid}
          point={item.point}
        />
      ))}
    </main>
  );
}
