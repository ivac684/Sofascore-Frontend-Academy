import React from 'react';
import { Box, Image, Text } from '@kuma-ui/core';
import { Tournament } from '@/types/Tournament';
import useSWR from 'swr';
import { Player } from '@/types/Player';
import IconButton from '@/components/IconButton';
import TeamDetailsGrid from '@/components/TeamDetailsGrid';
import { Match } from '@/types/Match';
import useScreenSize from '@/utils/useScreenSize';

interface TeamInfoProps {
  teamId: number;
}

const TeamInfo = ({ teamId }: TeamInfoProps) => {
  const { data: teamData, error: teamError } = useSWR(`/api/team/${teamId}`);
  const { data: tournamentsData, error: tournamentsError } = useSWR<Tournament[]>(`/api/team/${teamId}/tournaments`);
  const { data: matchData, error: matchError } = useSWR<Match[]>(`/api/team/${teamId}/events/next/1`);
  const { data: playersData, error: playersError } = useSWR<Player[]>(`/api/team/${teamId}/players`);

  const isSmallScreen = useScreenSize();

  if (!matchData) {
    return null;
  }

  const date = new Date(matchData[0].startDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} flexWrap="wrap">
        <Box width={isSmallScreen ? '100%' : '50%'}>
          <TeamDetailsGrid>
            <Box textAlign="center" mt="10px">
              <b style={{ fontSize: '16px', color: 'var(--on-surface-lv1)' }}>Team Info</b>
            </Box>
            <Box mt="10px">
              <Text fontSize="16px" color="var(--on-surface-lv1)" ml="10px">
                Coach: {teamData?.managerName}
              </Text>
            </Box>
            <Box mt="20px" mb="10px" borderTop="1px solid black" pt="20px" textAlign="center">
              <IconButton iconSrc={`/ic-team.svg`} />
              <Text fontSize="16px" color="#374DF5">
                <b> {playersData ? playersData.length : 0} </b>
              </Text>
              <br />
              <Text fontSize="16px" color="#A4A4A4">
                Total Players
              </Text>
            </Box>
          </TeamDetailsGrid>
        </Box>
        <Box width={isSmallScreen ? '100%' : '50%'} textAlign="center">
          <TeamDetailsGrid>
            <Text fontSize="16px" color="var(--on-surface-lv1)" mt="10px">
              <b>Tournaments</b>
            </Text>
            {tournamentsData &&
              tournamentsData.map(tournament => (
                <Box key={tournament.id} display="flex" flexDirection="column" alignItems="center">
                  <Image
                    src={`/api/tournament/${tournament.id}/image`}
                    alt={`${tournament.name} logo`}
                    width="40px"
                    height="40px"
                    bg="#FFFFFF"
                    mt="10px"
                  />
                  <Text fontSize="16px" color="grey" mt="10px" mb="10px">
                    {tournament.name}
                  </Text>
                </Box>
              ))}
          </TeamDetailsGrid>
        </Box>
      </Box>
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} flexWrap="wrap">
        <Box width={isSmallScreen ? '100%' : '50%'}>
          <TeamDetailsGrid>
            <Box textAlign="center">
              <Text fontSize="16px" color="var(--on-surface-lv1)">
                <b>Venue</b>
              </Text>
            </Box>
            <Box display="flex" m="10px 10px 20px 10px">
              <Box flexGrow={1} textAlign="left">
                <Text fontSize="16px" color="var(--on-surface-lv1)">
                  Stadium
                </Text>
              </Box>
              <Box flexGrow={1} textAlign="right">
                <Text fontSize="16px" color="var(--on-surface-lv1)">
                  {teamData?.venue}
                </Text>
              </Box>
            </Box>
          </TeamDetailsGrid>
        </Box>
        <Box width={isSmallScreen ? '100%' : '50%'} mt={isSmallScreen ? '0px' : '-90px'}>
          <TeamDetailsGrid>
            <Box textAlign="center" mt="10px">
              <Text fontSize="16px" color="var(--on-surface-lv1)">
                <b>Next match</b>
              </Text>
            </Box>
            {matchData && matchData.length > 0 ? (
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="center" mt="30px" mb="20px">
                  <Image
                    src={`/api/tournament/${matchData[0].tournament.id}/image`}
                    alt={`${matchData[0].tournament.name} logo`}
                    width="30px"
                    height="30px"
                    bg="#FFFFFF"
                    ml="15px"
                    mr="15px"
                  />
                  <Text fontSize="14px" color="var(--on-surface-lv1)" mt="10px" mr="5px">
                    <b>{matchData[0].homeTeam.country.name}</b>
                  </Text>
                  <Image src={`/ic-pointer-right.svg`} mt="10px" ml="-5px" />
                  <Box display="flex" alignItems="center">
                    <Text fontSize="14px" color="var(--on-surface-lv2)" mt="10px">
                      {matchData[0].tournament.name}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" ml="15px">
                  <Box>{`${day} ${month}`}</Box>
                  <Box display="flex" flexDirection="column" ml="10px" mb="20px">
                    <Box fontSize="14px" color="var(--on-surface-lv1)" mt="10px" display="flex" alignItems="center">
                      <Image src={`/api/team/${matchData[0].homeTeam.id}/image`} width="16px" height="16px"></Image>
                      <Text ml="5px">{matchData[0].homeTeam.name}</Text>
                    </Box>
                    <Box fontSize="14px" color="var(--on-surface-lv1)" mt="10px" display="flex" alignItems="center">
                      <Image src={`/api/team/${matchData[0].awayTeam.id}/image`} width="16px" height="16px"></Image>
                      <Text ml="5px">{matchData[0].awayTeam.name}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Text fontSize="14px" color="var(--on-surface-lv1)" mt="10px">
                No upcoming matches
              </Text>
            )}
          </TeamDetailsGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamInfo;
