'use client';

import { api } from '~/trpc/react';
import { AssignmentCard } from './AssignmentCard';

export const MainTask = () => {
  const getMainQuestQuery = api.assignment.getDailyQuest.useQuery();
  return (
    <div className="w-full flex flex-col gap-5">
      {getMainQuestQuery.data?.map((task, idx) => {
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
