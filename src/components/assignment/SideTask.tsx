'use client';

import { AssignmentCard } from './AssignmentCard';

const dummy = [
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'BELUM KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'TERLAMBAT',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'BELUM KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'TERLAMBAT',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'BELUM KUMPUL',
  },
  {
    id: 'IDSDSDSDSD',
    title: 'Tugas Tiktok Side',
    deadline: '13 September 2024',
    status: 'TERLAMBAT',
  },
];

export const SideTask = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      {dummy.map((task, idx) => (
        <AssignmentCard key={idx} {...task} />
      ))}
    </div>
  );
};
