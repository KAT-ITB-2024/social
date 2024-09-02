'use client';
import { type Event } from '@katitb2024/database';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEffect, useState, type ReactNode } from 'react';
import CloseIcon from 'public/icons/close-icon.svg';

import Image from 'next/image';
import { type OpenedDays } from '~/types/payloads/map';
import Link from 'next/link';

interface DayModalProps {
  event: OpenedDays;
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
}

export function DayModal({ event, isOpen, setIsOpen }: DayModalProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  useEffect(() => {
    switch (event.day) {
      case 'Day 1':
        setBackgroundImage('/images/home/modal/bg-day-1.png');
        break;
      case 'Day 2':
        setBackgroundImage('/images/home/modal/bg-day-2.png');
        break;
      case 'Day 3':
        setBackgroundImage('/images/home/modal/bg-day-3.png');
        break;
      case 'Day 4':
        setBackgroundImage('/images/home/modal/bg-day-4.png');
        break;
      default:
        break;
    }
  }, [event.day]);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent
        className="max-h-[80vh] max-w-[370px] overflow-y-auto px-9 py-12"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {' '}
        <div
          className="absolute right-4 top-4 cursor-pointer text-2xl text-yellow"
          onClick={() => setIsOpen(false)}
        >
          <Image src={CloseIcon} alt="Close Icon" width={32} height={32} />
        </div>
        <div
          className="cursor-pointer text-2xl text-blue-500"
          onClick={() => setIsOpen(false)}
        >
          <AlertDialogTitle className="flex flex-col items-center gap-y-4">
            <p className="text-center text-h3 font-normal">{event.day}</p>

            <Image
              src={event.characterImage ?? ''}
              alt={event.day}
              width={200}
              height={200}
            />
          </AlertDialogTitle>
          <div className="flex flex-col gap-y-4">
            <AlertDialogDescription className="flex flex-col gap-y-4">
              <p className="text-left text-b4 font-normal text-blue-500">
                {event.lore}
              </p>
            </AlertDialogDescription>
            <span className="text-sh5 font-bold text-blue-500">Video</span>{' '}
            <Link
              href={event.youtubeVideo ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full truncate text-b4 text-pink-400"
            >
              {event.youtubeVideo}
            </Link>
            <span className="text-sh5 font-bold text-blue-500">Guidebook</span>
            <Link
              href={event.guidebookLink ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-b4 text-pink-400"
            >
              {event.guidebookLink}
            </Link>
            <span className="text-sh5 font-bold text-blue-500">Post Test</span>
            <Link
              href={event.googleFormLink ?? ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-b4 text-pink-400"
            >
              {event.googleFormLink}
            </Link>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
