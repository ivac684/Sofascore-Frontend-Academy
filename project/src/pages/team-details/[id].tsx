import React, { useEffect, useState } from 'react'
import { Box, Text, Image } from '@kuma-ui/core'
import useSWR from 'swr'
import { Tournament } from '@/types/Tournament'
import TournamentGrid from '@/components/LayoutGrid'
import IconButton from '@/components/IconButton'
import TextButton from '@/components/TextButton'
import Matches from '../../modules/team-details/Matches'
import Standings from '../../modules/team-details/Standings'
import { useRouter } from 'next/router'
import TeamInfo from '@/modules/team-details/TeamInfo'
import { Team } from '@/types/Team'
import Squad from '@/modules/team-details/Squad'
import Link from 'next/link'
import useScreenSize from '@/customHooks/useScreenSize'

const TeamDetails = () => {
  const router = useRouter()
  const teamId: number = router.query.id ? +router.query.id : 0

  const { data, error: teamError } = useSWR<Team>(`/api/team/${teamId}`)
  const { data: tournamentsData, error: tournamentsError } = useSWR<Tournament[]>(`/api/team/${teamId}/tournaments`)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<'team-info' | 'matches' | 'standings' | 'squad'>(
    'team-info'
  )
  const tournamentId = tournamentsData?.[0]?.id
  const isSmallScreen = useScreenSize()

  const handleButtonClick = (buttonType: 'team-info' | 'matches' | 'standings' | 'squad') => {
    setSelectedComponent(buttonType)
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId)
  }

  if (teamError) {
    return <div>Error fetching team details: {teamError.message}</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }
  if (tournamentsError) {
    return <div>Error fetching tournaments: {tournamentsError.message}</div>
  }

  return (
    <Box display="flex" flexDirection="column" width={isSmallScreen ? '100vw' : 'calc(100% - 40px)'}>
      {!isSmallScreen && (
        <Box mt="10px" position="relative" right="28%" display="flex" flexDirection="row">
          <Link href="/">
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentsData?.[0]?.sport.name}
            </Text>
          </Link>
          <Image src={`/ic-pointer-right.svg`} mt="-3px" />
          <Link href={`/tournament-details/${tournamentId}`}>
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentsData?.[0]?.name}
            </Text>
          </Link>
        </Box>
      )}
      <TournamentGrid>
        {isSmallScreen && (
          <Box display="flex" flexDirection="row" mb="10px">
            <Link href="/">
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentsData?.[0]?.sport.name}
              </Text>
            </Link>
            <Image src={`/ic-pointer-right.svg`} mt="-3px" />
            <Link href={`/tournament-details/${tournamentId}`}>
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentsData?.[0]?.name}
              </Text>
            </Link>
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="flex-start" ml="10px">
          <Box
            width="80px"
            height="80px"
            margin="0 24px 0 0"
            padding="11.4px"
            borderRadius="4px"
            overflow="hidden"
            border="1px solid var(--on-surface-lv3)"
            bg="#FFFFFF"
          >
            <Image src={`/api/team/${data.id}/image`} alt={`${data.name} logo`} width="100%" height="100%" />
          </Box>
          <Box>
            <Text as="h2" fontSize="32px" mb={2} color="var(--on-surface-lv1)" mt="5px">
              <b>{data.name}</b>
            </Text>
            <Box display="flex" alignItems="center">
              <IconButton iconSrc={`/${data.country.name}.svg`} altText="" width={20} height={20} />
              <Text fontSize="14px" ml="7px" mb="3px" color="var(--on-surface-lv1)">
                <b>{data.country.name}</b>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box display="flex" ml="15px">
          <Box mt="15px" mr="5px">
            <TextButton width={20} onClick={() => handleButtonClick('team-info')}>
              Details
            </TextButton>
          </Box>
          <Box mt="15px" mr="5px">
            <TextButton width={20} onClick={() => handleButtonClick('matches')}>
              Matches
            </TextButton>
          </Box>
          <Box mt="15px" mr="5px">
            <TextButton width={20} onClick={() => handleButtonClick('standings')}>
              Standings
            </TextButton>
          </Box>
          <Box mt="15px">
            <TextButton width={20} onClick={() => handleButtonClick('squad')}>
              Squad
            </TextButton>
          </Box>
        </Box>
      </TournamentGrid>
      <Box>
        {selectedComponent === 'team-info' && <TeamInfo teamId={teamId} />}
        {selectedComponent === 'matches' && <Matches teamId={teamId} onEventClick={handleEventClick} />}
        {selectedComponent === 'standings' && tournamentId && <Standings tournamentId={tournamentId} />}
        {selectedComponent === 'squad' && tournamentId && <Squad teamId={teamId} onEventClick={() => {}} />}
      </Box>
    </Box>
  )
}

export default TeamDetails
