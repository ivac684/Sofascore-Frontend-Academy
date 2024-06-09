import React, { useState } from 'react'
import { Box, Text, Image } from '@kuma-ui/core'
import useSWR from 'swr'
import { Match } from '@/types/Match'
import Grid from '@/components/Grid'
import IconButton from '@/components/IconButton'
import BorderArrowBox from '@/components/BorderArrowBox'
import MatchDetails from '@/pages/match-details/[id]'
import useScreenSize from '@/utils/useScreenSize'
import { groupMatchesByRound } from '@/utils/groupMatchesByRound'

interface MatchesProps {
  tournamentId: number
  onEventClick: (eventId: number) => void
}

const Matches = ({ tournamentId, onEventClick }: MatchesProps) => {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR<Match[]>(`/api/tournament/${tournamentId}/events/next/${page}`)
  const { data: lastPageData } = useSWR<Match[]>(`/api/team/${tournamentId}/events/last/${page}`);
  const isLastPage = lastPageData && lastPageData.length === 0;
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const isSmallScreen = useScreenSize()
  const [isVisible, setIsVisible] = useState(true)
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const groupedByRound = data ? groupMatchesByRound(data) : {};

  const handlePrevClick = () => {
      setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      setPage(prevPage => prevPage + 1);
    } else {
      setButtonDisabled(true);
    }
    setButtonDisabled(false);
  };

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId)
    onEventClick(eventId)
    if (isSmallScreen) {
      setIsVisible(false)
    }
  }

  if (error) {
    return <div>Error fetching matches: {error.message}</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Box display="flex" flexDirection="row">
      {isVisible && (
        <Box flex={1}>
          <Box display="flex" flexDirection="column">
            {isSmallScreen && (
              <Box display="flex" justifyContent="space-between">
                <BorderArrowBox>
                  <IconButton iconSrc={`/left-arrow.svg`} onClick={handlePrevClick}/>
                </BorderArrowBox>
                <BorderArrowBox>
                  <IconButton iconSrc={`/right-arrow.svg`} onClick={handleNextClick} disabled={isButtonDisabled}/>
                </BorderArrowBox>
              </Box>
            )}
            <Grid>
              {!isSmallScreen && (
                <Box display="flex" justifyContent="space-between">
                  <BorderArrowBox>
                    <IconButton iconSrc={`/left-arrow.svg`} onClick={handlePrevClick}/>
                  </BorderArrowBox>
                  <Text fontSize="16px" fontWeight="bold" left="47%" color="var(--on-surface-lv1)" mt="25px">
                    Matches
                  </Text>
                  <BorderArrowBox>
                    <IconButton iconSrc={`/right-arrow.svg`} onClick={handleNextClick} disabled={isButtonDisabled}/>
                  </BorderArrowBox>
                </Box>
              )}
              {Object.entries(groupedByRound).map(([round, matches]) => (
                <Box key={round} mb={4}>
                  <Text fontSize="12px" fontWeight="bold" ml="15px" color="var(--on-surface-lv1)">
                    {round}
                  </Text>
                  {matches.map(match => (
                    <Box
                      key={match.id}
                      mt="15px"
                      mb="20px"
                      display="flex"
                      cursor="pointer"
                      onClick={() => handleEventClick(match.id)}
                      _hover={{ backgroundColor: 'var(--primary-highlight)' }}
                    >
                      <Text fontSize="12px" color="grey" ml="15px" mr="15px" mt="10px" textAlign="center">
                        {new Date(match.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                        <br />
                        {match.status === 'notstarted'
                          ? '-'
                          : match.status === 'finished'
                          ? 'FT'
                          : `${Math.floor((new Date().getTime() - new Date(match.startDate).getTime()) / 60000)} min`}
                      </Text>
                      <Text fontSize="14px" color="grey" mx={1}>
                        |
                      </Text>
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center" mb="5px">
                            <Image
                              src={`/api/team/${match.homeTeam.id}/image`}
                              alt={match.homeTeam.name}
                              width="18px"
                              height="18px"
                            />
                            <Text fontSize="14px" color="var(--on-surface-lv1)" ml="5px">
                              {match.homeTeam.name}
                            </Text>
                          </Box>
                          <Text fontSize="14px" mt={1} mr="10px" color="var(--on-surface-lv1)">
                            {match.homeScore.total}
                          </Text>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center">
                            <Image
                              src={`/api/team/${match.awayTeam.id}/image`}
                              alt={match.awayTeam.name}
                              width="18px"
                              height="18px"
                              mr={1}
                            />
                            <Text fontSize="14px" mt={1} color="var(--on-surface-lv1)" ml="5px">
                              {match.awayTeam.name}
                            </Text>
                          </Box>
                          <Text fontSize="14px" mt={1} mr="10px" color="var(--on-surface-lv1)">
                            {match.awayScore.total}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                  {!isSmallScreen && <hr style={{ height: '1px', backgroundColor: 'white' }} />}
                </Box>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      <Box>
        {selectedEvent && !isVisible && (
          <Box>
            <MatchDetails eventId={selectedEvent} />
          </Box>
        )}
      </Box>
      {isVisible && !isSmallScreen && (
        <Box flex={1}>
          {selectedEvent && (
            <Box>
              <MatchDetails eventId={selectedEvent} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Matches