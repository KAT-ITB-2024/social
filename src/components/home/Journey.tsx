'use client';

import Day1Image from 'public/images/home/day-1-journey.png';
import HiddenDays from 'public/images/home/hidden-journey.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingSpinnerCustom } from '../ui/loading-spinner';
import { JourneyDay2 } from './days/day-2';
import { JourneyDay3 } from './days/day-3';
import { JourneyDay4 } from './days/day-4';
import { useEffect, useState } from 'react';
import { type Event } from '@katitb2024/database';
import { type OpenedDays } from '~/types/payloads/map';
import { DayModal } from './DayModal';

export default function Journey() {
  const router = useRouter();
  const days = api.map.getDays.useQuery();
  const [events, setEvents] = useState<Map<string, OpenedDays> | null>();
  const [selectedEvent, setSelectedEvent] = useState<OpenedDays | null>();
  const [isOpen, setIsOpen] = useState(false);

  const handleJourneyClicked = (eventDay: string) => {
    const selectedEvent = events?.get(eventDay);
    if (events && selectedEvent) {
      setSelectedEvent(selectedEvent);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (days.data && days.data.length > 0) {
      const eventMap = new Map<string, OpenedDays>();
      days.data.forEach((event: OpenedDays) => {
        eventMap.set(event.day, event);
      });
      setEvents(eventMap);
    }
  }, [days.data]);

  if (days.isLoading) {
    return <LoadingSpinnerCustom />;
  }
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className="relative w-full h-[194px]">
        <div className="absolute w-full top-0 flex flex-col items-center h-full">
          <div className="relative w-full h-[180px] z-10">
            <Image
              src={Day1Image}
              alt="Day 1 Journey"
              width={247}
              height={194}
              onClick={() => handleJourneyClicked('Day 1')}
              className="absolute top-0 right-6"
            />
          </div>
        </div>
      </div>
      {events &&
        events.size > 0 &&
        Array.from(events.values()).map((event) => {
          if (event.day === 'Day 2') {
            return (
              <JourneyDay2
                key={event.eventId}
                handleClick={handleJourneyClicked}
              />
            );
          }
          if (event.day === 'Day 3') {
            return (
              <JourneyDay3
                key={event.eventId}
                handleClick={handleJourneyClicked}
              />
            );
          }
          if (event.day === 'Day 4') {
            return (
              <JourneyDay4
                key={event.eventId}
                handleClick={handleJourneyClicked}
              />
            );
          }
        })}

      {events && events.size < 4 && (
        <div className="relative w-full">
          <Image
            src={HiddenDays}
            alt="Hidden Journeys"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      )}

      {selectedEvent && (
        <DayModal event={selectedEvent} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
