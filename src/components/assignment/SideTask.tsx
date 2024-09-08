'use client';

import { api } from '~/trpc/react';
import { AssignmentCard } from './AssignmentCard';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import { AssignmentSubmission } from '~/types/enums/assignment';

export const SideTask = () => {
  const getSideQuestQuery = api.assignment.getSideQuest.useQuery();
  if (getSideQuestQuery.isLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="flex w-full flex-col gap-5">
      {getSideQuestQuery.data?.map((task, idx) => {
        const status = task.assignmentSubmissions
          ? task.assignmentSubmissions.createdAt > task.assignments.deadline
            ? AssignmentSubmission.TERLAMBAT
            : AssignmentSubmission.TERKUMPUL
          : AssignmentSubmission.BELUM_KUMPUL;
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
