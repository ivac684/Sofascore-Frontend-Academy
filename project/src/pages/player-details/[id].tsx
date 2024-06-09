import React, { useState } from 'react'
import useSWR from 'swr'
import { Box, Text, Image } from '@kuma-ui/core'
import TournamentGrid from '@/components/LayoutGrid'
import { useRouter } from 'next/router'
import { Player } from '@/types/Player'
import { Team } from '@/types/Team'
import PlayerDetailGrid from '@/components/PlayerDetailGrid'
import Matches from '@/modules/player-details/Matches'
import Link from 'next/link'
import { Tournament } from '@/types/Tournament'
import useScreenSize from '@/utils/useScreenSize'

const PlayerDetails = () => {
  const router = useRouter()
  const playerId: number = router.query.id ? +router.query.id : 0
  const teamId: number = router.query.teamId ? +router.query.teamId : 0
  const { data: playerData, error: playerError } = useSWR<Player>(`/api/player/${playerId}`)
  const { data: teamData, error: teamError } = useSWR<Team>(`/api/team/${teamId}`)
  const { data: tournamentData, error: tournamentError } = useSWR<Tournament[]>(`/api/team/${teamId}/tournaments`)
  const isSmallScreen = useScreenSize()
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  if (playerError) {
    return <div>Error fetching player details: {playerError.message}</div>
  }
  if (!playerData) {
    return <div>Loading...</div>
  }
  if (!teamData) {
    return <div>Loading...</div>
  }
  if (!tournamentData) {
    return <div>Loading...</div>
  }

  const tournamentId = tournamentData?.[0]?.id

  const birthyay = new Date(playerData.dateOfBirth)
  const day = birthyay.getDate()
  const month = birthyay.toLocaleString('default', { month: 'short' })
  const year = birthyay.getFullYear()

  const ageDiffMs = Date.now() - birthyay.getTime()
  const ageDate = new Date(ageDiffMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)

  return (
    <Box display="flex" flexDirection="column" width={isSmallScreen ? '100vw' : 'calc(100% - 40px)'} maxWidth={'1440px'}>
      {!isSmallScreen && (
        <Box mt="5px" position="relative" right='28%' display="flex" flexDirection="row" alignItems="center">
          <Link href="/">
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentData[0].sport.name}
            </Text>
          </Link>
          <Image src={`/ic-pointer-right.svg`}  />
          <Link href={`/tournament-details/${tournamentId}`}>
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentData[0].name}
            </Text>
          </Link>
          <Image src={`/ic-pointer-right.svg`} />
          <Link href={`/team-details/${teamId}`}>
            <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {teamData.name}
            </Text>
          </Link>
        </Box>
      )}
      <TournamentGrid>
        {isSmallScreen && (
          <Box mb="15px" display="flex" flexDirection="row" alignItems="center">
            <Link href="/">
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentData[0].sport.name}
              </Text>
            </Link>
            <Image src={`/ic-pointer-right.svg`} mx="10px" />
            <Link href={`/tournament-details/${tournamentId}`}>
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {tournamentData[0].name}
              </Text>
            </Link>
            <Image src={`/ic-pointer-right.svg`} mx="10px" />
            <Link href={`/team-details/${teamId}`}>
              <Text fontSize="14px" color="var(--primary-default)" cursor="pointer">
              {teamData.name}
              </Text>
            </Link>
          </Box>
        )}
        <Box display="flex" alignItems="center">
          <Box
            border="solid 1px var(--on-surface-lv3)"
            width="80px"
            height="80px"
            borderRadius="4px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginRight="20px"
            backgroundColor="white"
          >
            {!isLoaded && <Image src={`/avatar.svg`} alt="Placeholder" width="57px" height="57px" />}
            <Image
              src={`/api/player/${playerData.id}/image`}
              alt={`${playerData.name} image`}
              width="57px"
              height="57px"
              borderRadius="60px"
              onLoad={handleLoad}
              style={{ display: isLoaded ? 'block' : 'none' }}
            />
          </Box>
          <Text fontSize="32px" fontWeight="bold" color="var(--on-surface-lv1)">
            {playerData.name}
          </Text>
        </Box>
        <Box display="flex" alignItems="center" mt="20px">
          <Image src={`/api/team/${teamData.id}/image`} alt={`${teamData.name} image`} width="40px" height="40px" />
          <Text fontSize="14px" fontWeight="bold" color="var(--on-surface-lv1)" ml="10px">
            {teamData.name}
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" mt="20px">
          <PlayerDetailGrid>
            <Text color="grey" fontSize="12px" fontWeight="bold" textAlign="center">
              Country
            </Text>
            <Text color="var(--on-surface-lv1)" fontSize="12px" fontWeight="bold" textAlign="center" mt="5px">
              {playerData.country.name}
            </Text>
          </PlayerDetailGrid>
          <PlayerDetailGrid>
            <Text color="grey" fontSize="12px" fontWeight="bold" textAlign="center">
              Position
            </Text>
            <Text color="var(--on-surface-lv1)" fontSize="12px" fontWeight="bold" textAlign="center" mt="5px">
              {playerData.position}
            </Text>
          </PlayerDetailGrid>
          <PlayerDetailGrid>
            <Text
              color="grey"
              fontSize="12px"
              fontWeight="bold"
              textAlign="center"
              mt="5px"
            >{`${day} ${month} ${year}`}</Text>
            <Text color="var(--on-surface-lv1)" fontSize="12px" fontWeight="bold" textAlign="center" mt="5px">
              {age} Yrs
            </Text>
          </PlayerDetailGrid>
        </Box>
      </TournamentGrid>
      <Matches teamId={teamId} onEventClick={() => {}} />
    </Box>
  )
}

export default PlayerDetails
