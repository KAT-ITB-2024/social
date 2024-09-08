import { TRPCError } from '@trpc/server';

const getCurrentWIBTime = () => {
  const now = new Date();
  const offset = 7;
  now.setHours(now.getHours() + offset);
  return now;
};

const getPreviousWIBTime = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(date.getHours() + 7);
  return date;
};

const isAllowedToPresence = (
  startTime: string,
  endTime: string,
  eventDate: Date,
): boolean => {
  const now = getCurrentWIBTime();

  const [startHours, startMinutes, startSeconds] = startTime
    .split(':')
    .map(Number);
  if (
    startHours == undefined ||
    startMinutes == undefined ||
    startSeconds == undefined
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid start time format!',
    });
  }

  const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);
  if (
    endHours == undefined ||
    endMinutes == undefined ||
    endSeconds == undefined
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid end time format!',
    });
  }

  // Create a new Date object with WIB time zone
  const start = new Date(
    eventDate.getTime() +
      startHours * 60 * 60 * 1000 +
      startMinutes * 60 * 1000 +
      startSeconds * 1000,
  );

  const end = new Date(
    eventDate.getTime() +
      endHours * 60 * 60 * 1000 +
      endMinutes * 60 * 1000 +
      endSeconds * 1000,
  );

  return now >= start && now <= end;
};

export { getCurrentWIBTime, isAllowedToPresence, getPreviousWIBTime };
