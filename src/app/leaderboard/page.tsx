'use client';
import { useState } from 'react';
import CardDefault from '~/components/leaderboard/CardDefault';
import TopThreeContainer from '~/components/leaderboard/TopThreeContainer';
import { PaginationCustom } from '~/components/Pagination';
import { TabsAssignment } from '~/components/Tabs';
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
    <main className="min-h-screen items-center justify-center flex flex-col ">
      <div
        className="w-[100%] h-[100vh] max-w-[450px] bg-[transparent] p-0 flex flex-col"
        style={{
          backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="mt-[86px] font-heading mb-4 text-[32px] text-center text-[#000D76] [text-shadow:4px_4px_20px_var(--tw-shadow-color)] shadow-[#FFBF51BF]">
          Leaderboard
        </h2>
        <TabsAssignment
          leftTrigger="Individu"
          rightTrigger="Kelompok"
          leftContent={
            <div className="flex flex-col mt-2 gap-3 justify-center items-center">
              {
                <TopThreeContainer
                  isIndividual
                  cards={dataIndividual.slice(0, 3)}
                />
              }
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
              <PaginationCustom />
            </div>
          }
          rightContent={
            <div className="flex flex-col mt-2 gap-3 justify-center items-center">
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
              <PaginationCustom />
            </div>
          }
        />
      </div>
    </main>
  );
}
