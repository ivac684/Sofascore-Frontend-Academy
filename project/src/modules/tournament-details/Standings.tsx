import React from 'react'
import useSWR from 'swr'
import { Box, Text } from '@kuma-ui/core'
import { StandingsData } from '@/types/StandingsData'
import TournamentGrid from '@/components/LayoutGrid'
import { StandingsText, StandingsValuesBox, StandingsValuesText } from '@/styles/styledComponents'
import Link from 'next/link'

interface StandingsProps {
  tournamentId: number
}

const Standings = ({ tournamentId }: StandingsProps) => {
  const { data, error } = useSWR<StandingsData[]>(`/api/tournament/${tournamentId}/standings`)

  if (error) {
    return <div>Error fetching standings: {error.message}</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  const standings = data[0]

  return (
    <TournamentGrid>
      <Box display="flex" justifyContent="space-between" mt="10px">
      <Text fontSize="14px" color="var(--on-surface-lv1)" flex="1 1 100px" ml='20px'>
          # Team
        </Text>
        <StandingsText>P</StandingsText>
        <StandingsText>W</StandingsText>
        <StandingsText>D</StandingsText>
        <StandingsText>L</StandingsText>
        <Text fontSize="14px" color="grey" flex="1 1 60px" textAlign="center">
          Goals
        </Text>
        <StandingsText>PTS</StandingsText>
      </Box>
      {standings.sortedStandingsRows.map((team, teamIndex) => (
        <Box key={teamIndex} display="flex" p='10px 0' transition="all 0.2s ease-in-out" justifyContent="space-between" mt="15px" mb="10px" ml="20px" cursor='pointer' _hover={{ backgroundColor: 'var(--primary-highlight)' }}>
          <Box flex="1 1 100px">
            <Link href={`/team-details/${team.team.id}`}>
              <Text fontSize="14px" color="grey" margin="0 10px">
                {teamIndex + 1}. {team.team.name}
              </Text>
            </Link>
          </Box>
          <StandingsValuesBox>
            <StandingsValuesText>{team.played}</StandingsValuesText>
          </StandingsValuesBox>
          <StandingsValuesBox>
            <StandingsValuesText>{team.wins}</StandingsValuesText>
          </StandingsValuesBox>
          <StandingsValuesBox>
            <StandingsValuesText>{team.draws}</StandingsValuesText>
          </StandingsValuesBox>
          <StandingsValuesBox>
            <StandingsValuesText>{team.losses}</StandingsValuesText>
          </StandingsValuesBox>
          <Box flex="1 1 60px" textAlign="center">
            <StandingsValuesText>
              {team.scoresFor} : {team.scoresAgainst}
            </StandingsValuesText>
          </Box>
          <StandingsValuesBox>
            <StandingsValuesText>{team.points}</StandingsValuesText>
          </StandingsValuesBox>
        </Box>
      ))}
    </TournamentGrid>
  )
}

export default Standings
