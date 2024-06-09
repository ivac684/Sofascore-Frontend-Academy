import React, { useState, useEffect } from 'react'
import { Box, Text, Image } from '@kuma-ui/core'
import useSWR from 'swr'
import { Event } from '@/types/Event'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IconButton from '@/components/IconButton'
import LeaguesGrid from '@/components/LeaguesGrid'
import { EventIncident } from '@/types/EventIncident'
import { format, parseISO } from 'date-fns'
import ResultInfoBox from '@/components/ResultInfoBox'

interface MatchDetailsProps {
  eventId: number
}

const MatchDetails = ({ eventId }: MatchDetailsProps) => {

  const { data, error } = useSWR<Event>(`/api/event/${eventId}`)
  const { data: incidentsData, error: incidentsError } = useSWR<{ incidents: EventIncident[] }>(
    `/api/event/${eventId}/incidents`
  )
  const [isOpen, setIsOpen] = useState<boolean>(true)

  useEffect(() => {
    setIsOpen(true)
  }, [eventId])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (error || incidentsError) {
    return <div>Error fetching data: {error?.message || incidentsError?.message}</div>
  }
  if (!data) {
    return <div>Loading match details...</div>
  }
  if (!incidentsData) {
    return <div>Loading incidents...</div>
  }

  const matchDate = format(parseISO(data.startDate), 'dd.MM.yyyy')
  const matchTime = format(parseISO(data.startDate), 'HH:mm')

  const Divider = () => <Box height="1px" backgroundColor="#E7E7E7" width="100%" my="10px" fontWeight="bold" />

  return (
    <>
      {isOpen && (
        <LeaguesGrid>
          <div>
            <Box mt="5px" ml="5px" width={'20%'}>
              <IconButton iconSrc={'/x.svg'} height={20} width={20} onClick={handleClose}></IconButton>
            </Box>
            <Box
              key={data.id}
              width={'100%'}
              padding="0 0 16px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box display="flex" width="100%" alignItems="center" justifyContent="space-between" p={'20px'}>
                <Link href={`/team-details/${data.homeTeam.id}`} passHref>
                  <Box width="fit-content" display="flex" flexDirection="column" alignItems="center">
                    <Image src={`/api/team/${data.homeTeam.id}/image`} width="40px" height="40px" mb="10px" />
                    <Text className="Text-label" fontSize="14px" color="var(--on-surface-lv1)" textAlign="center">
                      <b>{data.homeTeam.name}</b>
                    </Text>
                  </Box>
                </Link>
                {data.status === 'notstarted' ? (
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Text fontSize="12px" color="var(--on-surface-lv1)">
                      {matchDate}
                    </Text>
                    <Text fontSize="12px" color="var(--on-surface-lv1)">
                      {matchTime}
                    </Text>
                  </Box>
                ) : (
                  <Text fontSize="32px" color={data.status === 'inprogress' ? 'red' : 'var(--on-surface-lv1)'}>
                    <b>
                      {data.homeScore.total} - {data.awayScore.total}
                    </b>
                  </Text>
                )}
                <Link href={`/team-details/${data.awayTeam.id}`} passHref>
                  <Box width="fit-content" display="flex" flexDirection="column" alignItems="center">
                    <Image src={`/api/team/${data.awayTeam.id}/image`} width="40px" height="40px" mb="10px" />
                    <Text className="Text-label" fontSize="14px" color="var(--on-surface-lv1)" textAlign="center">
                      <b>{data.awayTeam.name}</b>
                    </Text>
                  </Box>
                </Link>
              </Box>
              <Divider />
              <ResultInfoBox>
                {data.status === 'notstarted' && (
                  <Box mt="16px" textAlign="center">
                    <Text fontSize="14px" color="var(--on-surface-lv2)">
                      No results yet.
                    </Text>
                  </Box>
                )}
                {data.status === 'finished' && (!incidentsData.incidents || incidentsData.incidents.length === 0) && (
                  <Box mt="16px" textAlign="center">
                    <Text fontSize="14px" color="var(--on-surface-lv2)">
                      No incidents reported.
                    </Text>
                  </Box>
                )}
                {incidentsData.incidents &&
                  incidentsData.incidents.map(incident => (
                    <Box key={incident.id} mt="10px" display="flex">
                      <Text fontSize="14px" color="var(--on-surface-lv1)" mr="10px">
                        {incident.time}'
                      </Text>
                      <Text fontSize="14px" color="var(--on-surface-lv1)">
                        {incident.type} - {incident.player.name}
                      </Text>
                    </Box>
                  ))}
              </ResultInfoBox>
              {data.status === 'notstarted' && (
                <Link href={`/tournament-details/${data.tournament.id}`} passHref>
                  <Box
                    textAlign="center"
                    width="100%"
                    height="fit-content"
                    alignItems="center"
                    borderRadius="2px"
                    mt="15px"
                    border="solid 2px var(--primary-default)"
                  >
                    <Text fontSize="16px" fontWeight="bold" color="var(--primary-default)" m="10px">
                      View Tournament Details
                    </Text>
                  </Box>
                </Link>
              )}
            </Box>
          </div>
        </LeaguesGrid>
      )}
    </>
  )
}

export default MatchDetails
