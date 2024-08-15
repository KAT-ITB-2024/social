'use client';
import { useState } from 'react';
import CardDefault from '~/components/leaderboard/CardDefault';
import TopThreeContainer from '~/components/leaderboard/TopThreeContainer';
import { Button } from '~/components/ui/button';

interface CardDefaultProps {
  profilePicture?: string;
  name: string;
  sid?: string;
  point: number;
  isUser?: boolean;
  isIndividual?: boolean;
}

interface CardTopScoreProps {
  profilePicture?: string;
  name: string;
  sid?: string;
  point: number;
  isIndividual?: boolean;
}

const dataIndividual: Array<CardDefaultProps> = [
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'First Winner Hutabarat',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Second Winner Chan',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Third Winner Munthe',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Nobody',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Nobody',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Nobody',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Nobody',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
  {
    profilePicture: '/images/leaderboard/image.png',
    name: 'Nobody',
    sid: '13521097',
    point: 9999,
    isUser: true,
    isIndividual: true,
  },
];

const dataKelompok: Array<CardDefaultProps> = [
  {
    name: '123',
    point: 1234,
    isIndividual: false,
  },
  {
    name: '322',
    point: 1234,
    isIndividual: false,
  },
  {
    name: '121',
    point: 1234,
    isIndividual: true,
  },
  {
    name: '141',
    point: 1234,
    isIndividual: true,
  },
  {
    name: '123',
    point: 1234,
    isIndividual: true,
  },
  {
    name: '141',
    point: 1234,
    isIndividual: true,
  },
  {
    name: '141',
    point: 1234,
    isIndividual: true,
  },
  {
    name: '141',
    point: 1234,
    isIndividual: true,
  },
];

export default function LeaderBoard() {
  const [isIndividual, setIsIndividual] = useState(true);

  let content: React.ReactNode;
  if (isIndividual) {
    content = (
      <>
        {<TopThreeContainer isIndividual cards={dataIndividual.slice(0, 3)} />}
        {dataIndividual.slice(3).map((item, index) => (
          <CardDefault
            key={`${index}-${item.name}`}
            rank={index + 4}
            name={item.name}
            point={item.point}
            isIndividual
            sid={item.sid}
            profilePicture={item.profilePicture}
          />
        ))}
      </>
    );
  } else {
    content = (
      <>
        {
          <TopThreeContainer
            isIndividual={false}
            cards={dataKelompok.slice(0, 3)}
          />
        }
        {dataKelompok.slice(3).map((item, index) => (
          <CardDefault
            key={`${index}-${item.name}`}
            rank={index + 4}
            name={item.name}
            point={item.point}
            isIndividual
            sid={item.sid}
            profilePicture={item.profilePicture}
          />
        ))}
      </>
    );
  }

  return (
    <main className="mt-[90px] items-center justify-center flex flex-col gap-3">
      <h2 className="font-heading text-[32px] text-[#000D76] [text-shadow:4px_4px_20px_var(--tw-shadow-color)] shadow-[#FFBF51BF]">
        Leaderboard
      </h2>
      <Button
        className="bg-[#0010A4] hover:bg-[#15f5c5]"
        onClick={() => {
          setIsIndividual((prev) => !prev);
        }}
      >
        {isIndividual ? 'Individual' : 'Kelompok'}
      </Button>
      {content}
    </main>
  );
}

/**
 * box-shadow: 4px 4px 20px 0px #FFBF51BF;
 * box-shadow: 4px 4px 20px 0px #FFBF51BF;

 */
