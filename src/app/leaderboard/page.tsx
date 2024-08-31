'use client';

import { Suspense } from 'react';
import { CustomPagination } from '~/components/leaderboard/Pagination';
import CardDefault from '~/components/leaderboard/CardDefault';
import TopThreeContainer from '~/components/leaderboard/TopThreeContainer';
import { TabsAssignment } from '~/components/leaderboard/Tabs';
import { api } from '~/trpc/react';
import { useSearchParams } from 'next/navigation';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';

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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div
          className="absolute flex h-screen w-screen flex-col bg-[transparent] p-0"
          style={{
            backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <LoadingSpinnerCustom />
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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div
          className="flex min-h-[100vh] w-[100%] max-w-[450px] flex-col bg-[transparent] p-0"
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
    <main className="flex h-screen flex-col items-center justify-center">
      <div
        className="fixed-width-container flex flex-col p-0"
        style={{
          backgroundImage: "url('/images/leaderboard/bg-leaderboard.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className="mt-24 flex h-full flex-col gap-5 px-7">
          <h2 className="text-center font-heading text-[32px] text-[#000D76] shadow-[#FFBF51BF] [text-shadow:4px_4px_20px_var(--tw-shadow-color)]">
            Leaderboard
          </h2>
          <div className="relative h-full">
            <TabsAssignment
              leftTrigger="Individu"
              rightTrigger="Kelompok"
              classname=""
              leftContent={
                currentContent === 'Individu' && (
                  <div className="mt-2 flex flex-col gap-3">
                    {currentPage === 1 && (
                      <TopThreeContainer
                        isIndividual
                        cards={leaderboardData.data!.leaderboard.slice(
                          0,
                          Math.min(3, leaderboardData.data!.totalProfiles),
                        )}
                      />
                    )}
                    <div className="no-scrollbar flex h-[15vh] flex-col gap-3 overflow-y-scroll [@media(min-height:700px)]:h-[25vh] [@media(min-height:800px)]:h-[30vh] [@media(min-height:900px)]:h-[35vh]">
                      {userData.data?.currentUserProfile && (
                        <CardDefault
                          rank={userData.data.currentUserProfile.rank as number}
                          name={
                            userData.data?.currentUserProfile.name as string
                          }
                          point={Number(userData.data?.currentUserProfile) || 0}
                          isIndividual
                          isUser
                          nim={userData.data?.currentUserProfile.nim as string}
                          profileImage={
                            userData.data?.currentUserProfile.profileImage &&
                            userData.data?.currentUserProfile.profileImage !==
                              ''
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
                    </div>
                    <div className="flex w-full items-center justify-center gap-[10px]">
                      <p className="font-body text-[14px] font-normal text-[#FFFEFE]">
                        Total {totalPages} Items
                      </p>
                      <CustomPagination totalPages={totalPages} />
                    </div>
                  </div>
                )
              }
              rightContent={
                currentContent === 'Kelompok' && (
                  <div className="mt-2 flex flex-col gap-3">
                    {currentPage === 1 && (
                      <TopThreeContainer
                        isIndividual={false}
                        cards={groupLeaderboardData.data!.groupLeaderboard.slice(
                          0,
                          3,
                        )}
                      />
                    )}
                    <div className="no-scrollbar flex h-[20vh] flex-col gap-3 overflow-y-scroll [@media(min-height:700px)]:h-[30vh] [@media(min-height:800px)]:h-[38vh] [@media(min-height:900px)]:h-[40vh]">
                      {groupLeaderboardData
                        .data!.groupLeaderboard.slice(
                          currentPage === 1
                            ? Math.min(
                                3,
                                groupLeaderboardData.data!.totalGroups,
                              )
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
                    </div>
                    <div className="flex w-full items-center justify-center gap-[10px]">
                      <p className="font-body text-sm font-normal text-[#FFFEFE]">
                        Total {totalPages} Items
                      </p>
                      <CustomPagination totalPages={totalPages} />
                    </div>
                  </div>
                )
              }
            />
          </div>
        </div>
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
