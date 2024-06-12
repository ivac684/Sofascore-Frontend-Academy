import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, Image } from '@kuma-ui/core';
import { format, parseISO } from 'date-fns';
import useSWR, { mutate } from 'swr';
import { Event } from '@/types/Event';
import { getStatus } from '@/utils/getMatchStatus';

interface EventsBySportAndDateProps {
  selectedSport: string;
  selectedDate: Date;
  onEventClick: (eventId: number) => void;
}

const EventsBySportAndDate = ({ selectedSport, selectedDate, onEventClick }: EventsBySportAndDateProps) => {
  const [liveEvents, setLiveEvents] = useState<Event[]>([]);
  const formattedSport = selectedSport.toLowerCase().replace(/\s/g, '-');
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const { data, error } = useSWR<Event[]>(`/api/sport/${formattedSport}/events/${formattedDate}`);

  const updateLiveEvents = useCallback(() => {
    if (data) {
      const liveMatches = data.filter(event => getStatus(event) !== 'FT' && getStatus(event) !== '-');
      setLiveEvents(liveMatches);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateLiveEvents();
      if (liveEvents.length > 0) {
        liveEvents.forEach(event => {
          mutate(`/api/sport/${formattedSport}/events/${formattedDate}`);
        });
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [updateLiveEvents, liveEvents, formattedSport, formattedDate]);

  useEffect(() => {
    updateLiveEvents();
  }, [data, updateLiveEvents]);

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  const groupedEvents: { [key: string]: { tournamentId: number, events: Event[] } } = {};

  if (data) {
    for (const event of data) {
      const { name: tournamentName, country, id: tournamentId } = event.tournament;
      const key = `${country.name} - ${tournamentName}`;
      if (!groupedEvents[key]) {
        groupedEvents[key] = { tournamentId, events: [] };
      }
      groupedEvents[key].events.push(event);
    }
  }

  if (Object.keys(groupedEvents).length === 0) {
    return <Box display='flex' height='80px' color='var(--on-surface-lv2)' alignItems='center' justifyContent='center'>Sorry! No matches today.</Box>;
  }

  const handleEventClick = (eventId: number) => {
    onEventClick(eventId);
  };


  return (
    <Box>
      <Text fontSize="12px" mb={3} color='var(--on-surface-lv1)'>
        {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Today'}
      </Text>
      {Object.entries(groupedEvents).map(([group, { tournamentId, events }]) => (
        <Box key={group} mb={4}>
          <Box display="flex" alignItems="center">
            <Image src={`/api/tournament/${tournamentId}/image`} alt={group} width="32px" height="32px" ml='15px' backgroundColor='#FFFFFF' />
            <Text fontSize="14px" fontWeight="bold" color='var(--on-surface-lv1)' ml='15px'>
              {group}
            </Text>
          </Box>
          {events.map(event => (
            <Box
              key={event.id}
              mt='15px'
              mb='20px'
              display="flex"
              cursor='pointer'
              onClick={() => onEventClick(event.id)}
              _hover={{ backgroundColor: 'var(--primary-highlight)' }}
            >
              <Text fontSize="14px" color={getStatus(event) !== 'FT' && getStatus(event) !== '-' ? 'var(--live)' : 'grey'} mr='15px' mt='10px' minWidth='50px' textAlign='right'>
                {format(parseISO(event.startDate), 'hh:mm')} <br />
                {getStatus(event)}
              </Text>
              <Text fontSize="14px" color="grey" mx={1}>|</Text>
              <Box>
                  <Box display="flex" alignItems="center" mb='5px'>
                    <Image src={`api/team/${event.homeTeam.id}/image`} alt={event.homeTeam.name} width="18px" height="18px" />
                    <Text fontSize="14px" color='var(--on-surface-lv1)' ml='5px'>
                      {event.homeTeam.name}
                    </Text>
                  </Box>
                  <Text fontSize="14px" mt={1} mr='10px' color='var(--on-surface-lv1)'>
                    {event.homeScore.total}
                  </Text>
                  <Box display="flex" alignItems="center">
                    <Image src={`api/team/${event.awayTeam.id}/image`} alt={event.awayTeam.name} width="18px" height="18px" mr={1} />
                    <Text fontSize="14px" mt={1} color='var(--on-surface-lv1)' ml='5px'>
                      {event.awayTeam.name}
                    </Text>
                  </Box>
                  <Text fontSize="14px" mt={1} mr='10px' color='var(--on-surface-lv1)'>
                    {event.awayScore.total}
                  </Text>
              </Box>
            </Box>
          ))}
          <hr style={{ height: '1px', backgroundColor: 'white' }} />
        </Box>
      ))}
    </Box>
  );
};

export default EventsBySportAndDate;