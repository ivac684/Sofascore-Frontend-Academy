import React, { useState } from 'react';
import useSWR from 'swr';
import { Box, Text, Image } from '@kuma-ui/core';
import { Player } from '@/types/Player';
import TournamentGrid from '@/components/LayoutGrid';
import Link from 'next/link';

interface SquadProps {
  teamId: number;
  onEventClick: (teamId: number) => void;
}

const Divider = () => (
  <Box height="1px" backgroundColor="#E7E7E7" width="100%" my="10px" fontWeight="bold" />
);

const Squad = ({ teamId, onEventClick }: SquadProps) => {
  const { data: playerData, error: playerError } = useSWR<Player[]>(`/api/team/${teamId}/players`);
  const { data: teamData, error: teamError } = useSWR(`/api/team/${teamId}`);
  const [loadedPlayers, setLoadedPlayers] = useState<number[]>([]);

  if (playerError || teamError) {
    return <div>Error fetching squad: {playerError?.message || teamError?.message}</div>;
  }

  if (!playerData || !teamData) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(playerData)) {
    return <div>Invalid data format</div>;
  }

  const handleEventClick = (playerId: number) => {
    onEventClick(playerId);
  };

  const handleLoad = (playerId: number) => {
    setLoadedPlayers(prevState => [...prevState, playerId]);
  };

  return (
    <TournamentGrid>
      <Box mt="15px" mb="10px" ml="20px" display="flex" flexDirection="column">
        <Text fontSize="12px" color="var(--on-surface-lv1)" fontWeight="bold" mb="5px">
          Coach
        </Text>
        <Box display="flex" alignItems="center" ml='-15px'>
          <Image
            src={`/avatar.svg`}
            alt="Placeholder"
            width="40px"
            height="40px"
            borderRadius="50%"
            marginRight="10px"
          />
          <Text fontSize="14px" color="var(--on-surface-lv1)">
            {teamData.managerName}
          </Text>
        </Box>
      </Box>

      <Divider />
      <Box mt="15px" mb="10px" ml="20px">
        <Text fontSize="12px" color="var(--on-surface-lv1)" fontWeight="bold">
          Players
        </Text>
      </Box>
      {playerData.map(player => (
        <Link key={player.id} href={`/player-details/${player.id}?teamId=${teamId}`}>
          <Box key={player.id} mb="10px">
            <Box
              display="flex"
              alignItems="center"
              cursor="pointer"
              onClick={() => handleEventClick(player.id)}
              _hover={{ backgroundColor: 'var(--primary-highlight)', padding: '1px' }}
            >
              <Image
                src={`/api/player/${player.id}/image`}
                alt={`${player.name} image`}
                width="40px"
                height="40px"
                borderRadius="50%"
                marginRight="10px"
                onLoad={() => handleLoad(player.id)}
                style={{ display: loadedPlayers.includes(player.id) ? 'block' : 'none' }}
              />
              {!loadedPlayers.includes(player.id) && (
                <Image
                  src={`/avatar.svg`}
                  alt="Placeholder"
                  width="40px"
                  height="40px"
                  borderRadius="50%"
                  marginRight="10px"
                />
              )}
              <Box>
                <Text fontSize="14px" color="var(--on-surface-lv1)" margin="0 10px">
                  {player.name}
                </Text>
                <Text fontSize="14px" color="var(--on-surface-lv1)" margin="0 10px">
                  {player.country.name}
                </Text>
              </Box>
            </Box>
            <Divider />
          </Box>
        </Link>
      ))}
    </TournamentGrid>
  )
};

export default Squad;
