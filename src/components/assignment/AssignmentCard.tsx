'use client';

import { AssignmentSubmission } from '~/types/enums/assignment';
import { Chip } from '../Chip';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale/id';
import Link from 'next/link';

export interface AssignmentCardProps {
  id: string;
  title: string;
  deadline: Date;
  status: AssignmentSubmission;
}

export const AssignmentCard = ({
  id,
  title,
  deadline,
  status,
}: AssignmentCardProps) => {
  const isLate = () => {
    const currentTime = new Date();
    return deadline.getTime() < currentTime.getTime();
  };

  return (
    <Card className="bg-card-radial w-full rounded-[12px] border-2 border-turquoise-300 px-6 py-4">
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex w-full items-center gap-[30px]">
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-subheading text-b3 font-bold text-blue-500">
              {title}
            </h1>
            <h2 className="font-subheading text-b4 font-normal text-blue-500">
              <b>Deadline : </b>{' '}
              {format(deadline, 'PP - HH:mm', {
                locale: idLocale,
              })}
            </h2>
            {status === AssignmentSubmission.TERKUMPUL && (
              <Chip label="terkumpul" variant="GREEN" />
            )}
            {status === AssignmentSubmission.BELUM_KUMPUL && !isLate() && (
              <Chip label="belum kumpul" variant="YELLOW" />
            )}
            {((status === AssignmentSubmission.BELUM_KUMPUL && isLate()) ||
              status === AssignmentSubmission.TERLAMBAT) && (
              <Chip label="terlambat" variant="RED" />
            )}
          </div>
          <Button variant={'blue'} className="px-5 py-2">
            <Link href={`/assignment/${id}`}>Open</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
