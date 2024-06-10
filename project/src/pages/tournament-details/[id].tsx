import React, { useEffect, useState } from 'react'
import { Box, Text, Image } from '@kuma-ui/core'
import useSWR from 'swr'
import { Tournament } from '@/types/Tournament'
import TournamentGrid from '@/components/LayoutGrid'
import IconButton from '@/components/IconButton'
import TextButton from '@/components/TextButton'
import Matches from '../../modules/tournament-details/Matches'
import Standings from '../../modules/tournament-details/Standings'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useScreenSize from '@/customHooks/useScreenSize'

const TournamentDetails = () => {
  const router = useRouter()
  const tournamentId: number = router.query.id ? +router.query.id : 0
  const { data, error } = useSWR<Tournament>(`/api/tournament/${router.query.id}`)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<'matches' | 'standings'>('matches')
  const isSmallScreen = useScreenSize()

  const handleButtonClick = (buttonType: 'matches' | 'standings') => {
    setSelectedComponent(buttonType)
    setSelectedEvent(null)
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId)
  }
  if (error) {
    return <div>Error fetching tournament details: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Box display="flex" flexDirection="column" width={isSmallScreen ? '100vw' : 'calc(100% - 40px)'}  m={'0 20px'}>
      {!isSmallScreen && (
        <Box mt="10px" position="relative" right='30%' display="flex" flexDirection="row">
          <Link href="/">
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {data.sport.name}
            </Text>
          </Link>
        </Box>
      )}
      {isSmallScreen && (
        <TournamentGrid>
          <Box ml="15px" mb="6px">
            <Link href="/">
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {data.sport.name}
              </Text>
            </Link>
          </Box>
        </TournamentGrid>
      )}
      <TournamentGrid>
        <Box display="flex" alignItems="center" justifyContent="flex-start" ml="15px">
          <Box
            width="80px"
            height="80px"
            margin="0 24px 0 0"
            padding="11.4px"
            borderRadius="4px"
            overflow="hidden"
            border="1px solid #e0e0e0"
            bg="#FFFFFF"
          >
            <Image src={`/api/tournament/${data.id}/image`} alt={`${data.name} logo`} width="100%" height="100%" />
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
        <Box
          display="flex"
          justifyContent={isSmallScreen ? 'space-between' : 'flex-start'}
          ml={isSmallScreen ? '50px' : '15px'}
          mr={isSmallScreen ? '50px' : '15px'}
          mt="10px"
        >
          <TextButton width={20} onClick={() => handleButtonClick('matches')}>
            Matches
          </TextButton>
          <TextButton width={20} onClick={() => handleButtonClick('standings')}>
            Standings
          </TextButton>
        </Box>
      </TournamentGrid>
      <Box display="flex">
        <Box flex={1}>
          {selectedComponent === 'matches' && <Matches tournamentId={tournamentId} onEventClick={handleEventClick} />}
          {selectedComponent === 'standings' && <Standings tournamentId={tournamentId} />}
        </Box>
      </Box>
    </Box>
  )
}

export default TournamentDetails
