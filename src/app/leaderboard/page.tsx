'use client';

import { Suspense, useEffect, useState } from 'react';
import { CustomPagination } from '~/components/leaderboard/Pagination';
import CardDefault from '~/components/leaderboard/CardDefault';
import TopThreeContainer from '~/components/leaderboard/TopThreeContainer';
import { TabsAssignment } from '~/components/leaderboard/Tabs';
import { useSearchParams } from 'next/navigation';
import { LoadingSpinnerCustom } from '~/components/ui/loading-spinner';
import { api } from '~/trpc/react';

import ProfileFriendModal from '~/components/profile/ModalProfileFriend';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LeaderBoardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTopThree, setIsTopThree] = useState(false);
  const [isGroupTopThree, setIsGroupTopThree] = useState(false);

  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const currentContent = searchParams.get('content') ?? 'Individu';

  const leaderboardData = api.leaderboard.getLeaderboard.useQuery(
    { page: currentPage },
    { enabled: currentContent === 'Individu' },
  );
  const groupLeaderboardData = api.leaderboard.getGroupLeaderboard.useQuery(
    { page: currentPage },
    { enabled: currentContent === 'Kelompok' },
  );

  const userData = api.leaderboard.getMyLeaderboard.useQuery(undefined, {
    enabled: currentContent === 'Individu',
  });

  const userGroupData = api.leaderboard.getMyGroupLeaderboard.useQuery(
    undefined,
    { enabled: currentContent === 'Kelompok' },
  );
  useEffect(() => {
    if (!leaderboardData?.data || !session?.user?.nim) {
      return;
    }

    const { totalProfiles, leaderboard } = leaderboardData.data;

    const topThree = leaderboard.slice(0, Math.min(3, totalProfiles));

    const hasNim = topThree.some((item) => item.nim === session.user.nim);

    setIsTopThree(hasNim);
  }, [leaderboardData, session]);

  useEffect(() => {
    if (!groupLeaderboardData?.data || !session?.user.group) {
      return;
    }

    const { totalGroups, groupLeaderboard } = groupLeaderboardData.data;

    const groupTopThree = groupLeaderboard.slice(0, Math.min(3, totalGroups));

    const isGroupMember = groupTopThree.some(
      (item) => item.name === session.user.group,
    );

    setIsGroupTopThree(isGroupMember);
  }, [groupLeaderboardData, session]);

  if (status === 'loading') {
    return <LoadingSpinnerCustom />;
  }
  if (!session || session.user.role !== 'Peserta') redirect('/login');

  const handleCardClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  if (
    leaderboardData.isLoading ||
    groupLeaderboardData.isLoading ||
    userData.isLoading ||
    userGroupData.isLoading
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

  const totalPages =
    currentContent === 'Individu'
      ? Math.ceil(leaderboardData.data!.totalProfiles / 20)
      : Math.ceil(groupLeaderboardData.data!.totalGroups / 20);

  if (!session || session.user.role !== 'Peserta') {
    redirect('/login');
  }

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
        <div className="mt-24 flex flex-col gap-5 px-7">
          <h2 className="text-center font-heading text-[32px] text-[#000D76] shadow-[#FFBF51BF] [text-shadow:4px_4px_20px_var(--tw-shadow-color)]">
            Leaderboard
          </h2>
          <div className="relative">
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
                        currentUserNim={session.user.nim}
                        currentUserGroup={session.user.group}
                        cards={leaderboardData.data!.leaderboard.slice(
                          0,
                          Math.min(3, leaderboardData.data!.totalProfiles),
                        )}
                      />
                    )}
                    <div
                      className={`no-scrollbar flex flex-col gap-3 overflow-y-scroll ${currentPage === 1 ? 'h-[15vh] [@media(min-height:700px)]:h-[20vh] [@media(min-height:800px)]:h-[30vh]' : 'h-[60vh]'}`}
                    >
                      {userData.data?.currentUserProfile &&
                        (!isTopThree || currentPage !== 1) && (
                          <CardDefault
                            rank={
                              userData.data.currentUserProfile.rank as number
                            }
                            name={
                              userData.data?.currentUserProfile.name as string
                            }
                            point={
                              Number(userData.data?.currentUserProfile) || 0
                            }
                            isIndividual
                            isUser
                            nim={
                              userData.data?.currentUserProfile.nim as string
                            }
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
                        .filter((item) => item.nim !== session.user.nim)
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
                            onClick={() => handleCardClick(item.id)}
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
                        currentUserGroup={session.user.group}
                        currentUserNim={session.user.nim}
                      />
                    )}
                    <div
                      className={`no-scrollbar flex flex-col gap-3 overflow-y-scroll ${currentPage === 1 ? 'h-[15vh] [@media(min-height:700px)]:h-[30vh]' : 'h-[60vh]'}`}
                    >
                      {userGroupData.data?.currentUserGroup &&
                        (!isGroupTopThree || currentPage !== 1) && (
                          <CardDefault
                            rank={
                              userGroupData.data.currentUserGroup.rank as number
                            }
                            name={
                              userGroupData.data.currentUserGroup.name as string
                            }
                            isUser
                            point={
                              Number(userGroupData.data.currentUserGroup) || 0
                            }
                          />
                        )}
                      {groupLeaderboardData
                        .data!.groupLeaderboard.slice(
                          currentPage === 1
                            ? Math.min(
                                3,
                                groupLeaderboardData.data!.totalGroups,
                              )
                            : 0,
                        )
                        .filter((item) => item.name !== session.user.group)
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

        {selectedUserId && (
          <ProfileFriendModal
            userId={selectedUserId}
            isDialogOpen={isModalOpen}
            setIsDialogOpen={setIsModalOpen}
          />
        )}
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
