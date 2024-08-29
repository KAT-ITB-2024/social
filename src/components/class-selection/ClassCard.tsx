import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

import Image from 'next/image';
import CoralCard from 'public/images/class-selection/coral-card.png';

type CardVariant = 'default' | 'clicked';

interface CustomCardProps {
  topic: string;
  title: string;
  quota: number;
  reserved: number;
  desc: string;
  variant: CardVariant;
  onClick: () => void;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  topic,
  title,
  quota,
  reserved,
  variant,
  onClick,
}) => {
  const reservedPercentage = (reserved / quota) * 100;

  let borderColor;
  let seatColor;
  let bgroundColor;

  if (reservedPercentage >= 100) {
    bgroundColor = 'bg-red-200';
    borderColor = 'border-red-500';
    seatColor = 'text-red-500';
  } else if (reservedPercentage >= 90) {
    bgroundColor = 'white';
    borderColor = 'border-warning-500';
    seatColor = 'text-warning-500';
  } else {
    borderColor = 'border-green-500';
    bgroundColor = 'white';
    seatColor = 'text-green-500';
  }

  const backgroundGradient =
    variant === 'clicked'
      ? 'bg-gradient-to-r from-orange-400 via-orange-300 to-turquoise-100'
      : 'bg-gradient-to-r from-white via-white to-turquoise-100';

  const themeColor = variant === 'clicked' ? 'text-white' : 'text-orange-400';

  return (
    <Card
      className={`relative flex border-orange-400 shadow-orange-xl rounded-2xl pl-2 py-4 ${backgroundGradient} cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      <CardContent className="flex flex-col justify-center pl-4 w-4/5 -mb-5 -ml-2">
        <CardTitle
          className={`text-sh5 md:text-base font-subheading ${themeColor}`}
        >
          {topic}
        </CardTitle>
        <p className={`${themeColor} text-sm mt-2`}>{title}</p>
        <p
          className={`bg-white inline-block border ${borderColor} ${seatColor} ${bgroundColor} rounded-full px-4 py-1 text-sm w-fit mt-2`}
        >
          {reserved} / {quota}
        </p>
      </CardContent>

      <div className="absolute -bottom-14 -right-10 w-[50%]">
        <Image src={CoralCard} alt="coral-1" className="object-cover h-full" />
      </div>
    </Card>
  );
};
