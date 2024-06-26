import React, { useEffect, useState } from 'react'
import { Box, Flex } from '@kuma-ui/core'
import Head from 'next/head'
import CalendarGrid from '@/components/CalendarGrid'
import MatchDetails from './match-details/[id]'
import TournamentDetails from './tournament-details/[id]'
import EventsBySportAndDate from './eventsBySportAndDate'
import useScreenSize from '@/customHooks/useScreenSize'

interface HomeProps {
  selectedSport: string
}

export default function Home({ selectedSport }: HomeProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null)
  const isSmallScreen = useScreenSize()

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId)
  }

  const handleCloseMatchDetails = () => {
    setSelectedEvent(null)
  }

  return (
    <>
      <Head>
        <title>Mini Sofa</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Box as="main">
        <Flex maxWidth='1440px'>
          <CalendarGrid onDateChange={handleDateChange}>
            <EventsBySportAndDate
              selectedSport={selectedSport}
              selectedDate={selectedDate}
              onEventClick={handleEventClick}
            />
          </CalendarGrid>
          <Box flex="1">
            {!isSmallScreen && selectedEvent && !selectedTournamentId && <MatchDetails eventId={selectedEvent} />}
            {selectedTournamentId && <TournamentDetails />}
          </Box>
        </Flex>
        {isSmallScreen && selectedEvent && !selectedTournamentId && (
          <Box
            position="fixed"
            width="100vw"
            top="0"
            left="0"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            zIndex="9999"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleCloseMatchDetails}
          >
            <MatchDetails eventId={selectedEvent} />
          </Box>
        )}
      </Box>
    </>
  )
}
