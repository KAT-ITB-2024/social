'use client';

import { api } from '~/trpc/react';
import { AssignmentCard } from './AssignmentCard';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import { AssignmentSubmission } from '~/types/enums/assignment';

export const MainTask = () => {
  const getMainQuestQuery = api.assignment.getDailyQuest.useQuery();
  if (getMainQuestQuery.isLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="flex w-full flex-col gap-5">
      {getMainQuestQuery.data?.map((task, idx) => {
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
