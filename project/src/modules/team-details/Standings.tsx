import React, { useState } from 'react';
import useSWR from 'swr';
import { Box, Text, Select, Image } from '@kuma-ui/core';
import { StandingsData } from '@/types/StandingsData';
import TournamentGrid from '@/components/LayoutGrid';
import { StandingsText, StandingsValuesBox, StandingsValuesText } from '@/styles/styledComponents';
import Link from 'next/link';

interface StandingsProps {
  tournamentId: number;
}

const Standings = ({ tournamentId }: StandingsProps) => {
  const [selectedTournament, setSelectedTournament] = useState<number>(tournamentId);

  const { data: standingsData, error: standingsError } = useSWR<StandingsData[]>(`/api/tournament/${selectedTournament}/standings`);
  const sportSlug = standingsData && standingsData[0] && standingsData[0].tournament.sport.slug;
  const { data: sportSlugData, error: sportSlugError } = useSWR<{ id: number, name: string }[]>(sportSlug ? `/api/sport/${sportSlug}/tournaments` : null);

  const handleTournamentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTournament(Number(event.target.value));
  };

  if (standingsError) {
    return <div>Error fetching standings: {standingsError.message}</div>;
  }
  if (!standingsData) {
    return <div>Loading standings...</div>;
  }
  if (sportSlugError) {
    return <div>Error fetching tournaments: {sportSlugError.message}</div>;
  }
  if (!sportSlugData) {
    return <div>Loading tournaments...</div>;
  }

  const standings = standingsData[0];

  return (
    <TournamentGrid>
      <Box
        bg="var(--surface-2)"
        height="48px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="10px"
        borderRadius="8px"
      >
        <Select
          height="32px"
          ml="10px"
          borderRadius="8px"
          alignItems="center"
          bg="var(--surface-0)"
          color="var(--on-surface-lv1)"
          onChange={handleTournamentChange}
          value={selectedTournament.toString()}
        >
          {sportSlugData.map(tournament => (
            <option key={tournament.id} value={tournament.id}>
              <Image src={`/api/tournament/${tournament.id}/image`} />
              {tournament.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="10px">
        <Text fontSize="14px" color="var(--on-surface-lv1)" flex="1 1 100px" ml="20px">
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
        <Box
          key={teamIndex}
          display="flex"
          p="10px 0"
          transition="all 0.2s ease-in-out"
          justifyContent="space-between"
          mt="15px"
          mb="10px"
          ml="20px"
          cursor="pointer"
          _hover={{ backgroundColor: 'var(--primary-highlight)', padding: '15px 0' }}
        >
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

export default Standings;
