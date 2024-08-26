'use client';

import { api } from '~/trpc/react';
import { AssignmentCard } from './AssignmentCard';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';

export const SideTask = () => {
  const getSideQuestQuery = api.assignment.getSideQuest.useQuery();
  if (getSideQuestQuery.isLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="w-full flex flex-col gap-5">
      {getSideQuestQuery.data?.map((task, idx) => {
        const status = task.assignmentSubmissions ? 'KUMPUL' : 'BELUM KUMPUL';
        const data = {
          id: task.assignments.id,
          title: task.assignments.title,
          deadline: task.assignments.deadline,
          status,
        };
        return <AssignmentCard key={idx} {...data} />;
      })}
    </div>
  );
};
