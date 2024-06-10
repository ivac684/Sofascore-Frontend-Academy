import React from 'react'
import useSWR from 'swr'
import { Tournament } from '@/types/Tournament'
import { TournamentProps } from '@/types/TournamentProps'
import { Box, Text, Image } from '@kuma-ui/core'
import Link from 'next/link'
import LeaguesGrid from '@/components/LeaguesGrid'

const Tournaments = ({ selectedSport }: TournamentProps) => {
  const formattedSport = selectedSport.toLowerCase().replace(/\s/g, '-')
  const { data, error } = useSWR<Tournament[]>(`/api/sport/${formattedSport}/tournaments`)

  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <LeaguesGrid>
      <Text fontSize="20px" mt="20px" ml="10px" color="var(--on-surface-lv1)">
        <b>Leagues</b>
      </Text>
      <Box mb="100px">
        {data.map((tournament: Tournament) => (
          <Link key={tournament.id} href={`/tournament-details/${tournament.id}`}>
            <Box
              key={tournament.id}
              width="100%"
              height="56px"
              p="8px 0 8px 16px"
              bg="var(--surface-surface-1)"
              display="flex"
              mt="10px"
              cursor="pointer"
              _hover={{ backgroundColor: 'var(--primary-highlight)' }}
            >
              <Image
                backgroundColor="#FFFFFF"
                src={`/api/tournament/${tournament.id}/image`}
                alt={`${tournament.name} logo`}
                width="40px"
                height="40px"
                m="0 16px 0 0"
              />
              <Box>
                <Text fontSize="14px" color="var(--on-surface-lv1)" mt="10px">
                  {tournament.name}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </LeaguesGrid>
  )
}

export default Tournaments
