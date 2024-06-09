import { parseISO, differenceInMinutes, isAfter, isBefore, addMinutes } from 'date-fns';
import { Event } from '@/types/Event';

export const getStatus = (event: Event) => {
  const now = new Date();
  const eventStartDate = parseISO(event.startDate);
  const eventEndDate = addMinutes(eventStartDate, 120);

  if (isBefore(now, eventStartDate)) {
    return '-';
  }

  if (isAfter(now, eventEndDate)) {
    return 'FT';
  }

  const minutes = differenceInMinutes(now, eventStartDate);
  return `${minutes} min`;
};