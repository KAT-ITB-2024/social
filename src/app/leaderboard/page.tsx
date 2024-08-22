'use client';

import { Suspense } from 'react';
import { CustomPagination } from '~/components/leaderboard/Pagination';
import CardDefault from '~/components/leaderboard/CardDefault';
import TopThreeContainer from '~/components/leaderboard/TopThreeContainer';
import { TabsAssignment } from '~/components/leaderboard/Tabs';
import { api } from '~/trpc/react';
import { useSearchParams } from 'next/navigation';

function LeaderBoardContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const currentContent = searchParams.get('content') ?? 'Individu';

  const leaderboardData = api.leaderboard.getLeaderboard.useQuery(
    { page: currentPage },
    { enabled: currentContent === 'Individu' },
  );

  const userData = api.leaderboard.getMyLeaderboard.useQuery(undefined, {
    enabled: currentContent === 'Individu',
  });

  const groupLeaderboardData = api.leaderboard.getGroupLeaderboard.useQuery(
    { page: currentPage },
    { enabled: currentContent === 'Kelompok' },
  );

  if (
    leaderboardData.isLoading ||
    groupLeaderboardData.isLoading ||
    userData.isLoading
  ) {
    return (
      <main className="min-h-screen items-center justify-center flex flex-col">
        <div
          className="w-[100%] min-h-[100vh] max-w-[450px] bg-[transparent] p-0 flex flex-col"
          style={{
            backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <h4 className="mt-[86px] text-center">Loading ...</h4>
        </div>
      </main>
    );
  }

  if (leaderboardData.error ?? groupLeaderboardData.error ?? userData.error) {
    const errorMessage =
      leaderboardData.error?.message ??
      groupLeaderboardData.error?.message ??
      userData.error?.message;
    return (
      <main className="min-h-screen items-center justify-center flex flex-col">
        <div
          className="w-[100%] min-h-[100vh] max-w-[450px] bg-[transparent] p-0 flex flex-col"
          style={{
            backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <p className="mt-[86px] text-center">Error: {errorMessage}</p>
        </div>
      </main>
    );
  }

  const totalPages =
    currentContent === 'Individu'
      ? Math.ceil(leaderboardData.data!.totalProfiles / 20)
      : Math.ceil(groupLeaderboardData.data!.totalGroups / 20);

  return (
    <main className="min-h-screen items-center justify-center flex flex-col">
      <div
        className="w-[100%] min-h-[100vh] max-w-[450px] bg-[transparent] p-0 flex flex-col"
        style={{
          backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <h2 className="mt-[86px] font-heading mb-4 text-[32px] text-center text-[#000D76] [text-shadow:4px_4px_20px_var(--tw-shadow-color)] shadow-[#FFBF51BF]">
          Leaderboard
        </h2>
        <TabsAssignment
          leftTrigger="Individu"
          rightTrigger="Kelompok"
          leftContent={
            currentContent === 'Individu' && (
              <div className="flex flex-col mt-2 gap-3 justify-center">
                {currentPage === 1 && (
                  <TopThreeContainer
                    isIndividual
                    cards={leaderboardData.data!.leaderboard.slice(
                      0,
                      Math.min(3, leaderboardData.data!.totalProfiles),
                    )}
                  />
                )}
                {userData.data?.currentUserProfile && (
                  <CardDefault
                    rank={userData.data.currentUserProfile.rank as number}
                    name={userData.data?.currentUserProfile.name as string}
                    point={Number(userData.data?.currentUserProfile) || 0}
                    isIndividual
                    isUser
                    nim={userData.data?.currentUserProfile.nim as string}
                    profileImage={
                      userData.data?.currentUserProfile.profileImage &&
                      userData.data?.currentUserProfile.profileImage !== ''
                        ? (userData.data?.currentUserProfile
                            .profileImage as string)
                        : '/images/leaderboard/no-profile.png'
                    }
                  />
                )}
                {leaderboardData
                  .data!.leaderboard.slice(
                    currentPage === 1
                      ? Math.min(3, leaderboardData.data!.totalProfiles)
                      : 0,
                  )
                  .map((item, index) => (
                    <CardDefault
                      key={`${index}-${item.name}`}
                      rank={item.rank}
                      name={item.name}
                      point={item.point ?? 0}
                      isIndividual
                      nim={item.nim}
                      profileImage={
                        item.profileImage && item.profileImage !== ''
                          ? item.profileImage
                          : '/images/leaderboard/no-profile.png'
                      }
                    />
                  ))}
                <div className="flex gap-[10px] w-full justify-center items-center">
                  <p className="font-body text-[14px] text-[#FFFEFE] font-normal">
                    Total {totalPages} Items
                  </p>
                  <CustomPagination totalPages={totalPages} />
                </div>
              </div>
            )
          }
          rightContent={
            currentContent === 'Kelompok' && (
              <div className="flex flex-col mt-2 gap-3 justify-center items-center">
                {currentPage === 1 && (
                  <TopThreeContainer
                    isIndividual={false}
                    cards={groupLeaderboardData.data!.groupLeaderboard.slice(
                      0,
                      3,
                    )}
                  />
                )}
                {groupLeaderboardData
                  .data!.groupLeaderboard.slice(
                    currentPage === 1
                      ? Math.min(3, groupLeaderboardData.data!.totalGroups)
                      : 0,
                  )
                  .map((item, index) => (
                    <CardDefault
                      key={`${index}-${item.name}`}
                      rank={item.rank}
                      name={item.name}
                      point={item.point}
                    />
                  ))}
                <div className="flex w-full justify-center items-center">
                  <p className="font-body text-sm text-[#FFFEFE] font-normal">
                    Total {totalPages} Items
                  </p>
                  <CustomPagination totalPages={totalPages} />
                </div>
              </div>
            )
          }
        />
      </div>
    </main>
  );
}

export default function LeaderBoard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderBoardContent />
    </Suspense>
  );
}
