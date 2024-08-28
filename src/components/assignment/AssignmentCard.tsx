'use client';

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
  status: string;
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
    <Card className="w-full px-6 py-4 bg-card-radial border-turquoise-300 border-2 rounded-[12px]">
      <CardContent className="p-0 flex justify-between items-center">
        <div className="flex gap-[30px] items-center w-full">
          <div className="w-full flex flex-col gap-2">
            <h1 className="font-subheading font-bold text-b3 text-blue-500">
              {title}
            </h1>
            <h2 className="font-subheading font-normal text-b4 text-blue-500">
              <b>Deadline : </b>{' '}
              {format(deadline, 'PPPP', {
                locale: idLocale,
              })}
            </h2>
            {status === 'KUMPUL' && <Chip label="terkumpul" variant="GREEN" />}
            {status === 'BELUM KUMPUL' && !isLate() && (
              <Chip label="belum kumpul" variant="YELLOW" />
            )}
            {status === 'BELUM KUMPUL' && isLate() && (
              <Chip label="terlambat" variant="RED" />
            )}
          </div>
          <Button variant={'blue'} className="py-2 px-5">
            <Link href={`/assignment/${id}`}>Open</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
