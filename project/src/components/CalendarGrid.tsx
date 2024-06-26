import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Text, Button } from '@kuma-ui/core';
import { format, addDays, subDays, isToday, differenceInDays } from 'date-fns';
import useScreenSize from '@/customHooks/useScreenSize';

interface CalendarGridProps {
  children: ReactNode;
  onDateChange: (date: Date) => void;
}

const CalendarGrid = ({ children, onDateChange }: CalendarGridProps) => {
  const today = new Date();
  const [start, setStart] = useState(subDays(today, 3));
  const [selectedDate, setSelectedDate] = useState(today);
  const isSmallScreen = useScreenSize();

  const handlePrevClick = () => {
    setStart(subDays(start, 1));
  };

  const handleNextClick = () => {
    setStart(addDays(start, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(new Date(date));
    onDateChange(date);
  };

  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    days.push({
      dayOfWeek: format(date, 'EEE'),
      date: format(date, 'd.M'),
      fullDate: date,
      isToday: isToday(date),
      isSelected: date.toDateString() === selectedDate.toDateString(),
    });
  }

  const spacerPosition = differenceInDays(selectedDate, start) * (isSmallScreen ? (100 / 7.5) : (100 / 8.2));


  return (
    <Box
      display="grid"
      width={isSmallScreen ? '100vw' : '50%'}
      minWidth="350px"
      margin={isSmallScreen ? '0' : '40px'}
      borderRadius={isSmallScreen ? '0' : '16px'}
      bg="var(--surface-1)"
      overflowY="auto"
      position={isSmallScreen ? 'sticky' : 'static'}
      top={isSmallScreen ? '0' : 'auto'}
      zIndex={isSmallScreen ? '1' : 'auto'}
    >
      <Box
        p={2}
        height="48px"
        bg="var(--primary-variant)"
        color="var(--surface-1)"
        display="flex"
        alignItems="center"
        top="0"
        position="sticky"
        zIndex="1"
      >
        <Button onClick={handlePrevClick} aria-label="Previous day">
          &#9664;
        </Button>
        {days.map(({ dayOfWeek, date, fullDate, isToday, isSelected }, index) => (
          <Box
            key={index}
            textAlign="center"
            cursor="pointer"
            onClick={() => handleDateClick(fullDate)}
            width="14.28%" // 100% / 7
          >
            <Text fontSize="12px" fontWeight={isToday ? 'bold' : 'normal'}>
              {isToday ? 'Today' : dayOfWeek}
            </Text>
            <Text fontSize="12px" fontWeight={isSelected ? 'bold' : 'normal'}>
              {date}
            </Text>
          </Box>
        ))}
        <Button onClick={handleNextClick} aria-label="Next day">
          &#9654;
        </Button>
        <Box
          position="absolute"
          bottom="0"
          left={`${spacerPosition}%`}
          width="15%"
          m="0 20px 0 20px"
          height="4px"
          bg="var(--surface-1)"
          borderRadius="2px"
          transition="left 0.3s ease"
        />
      </Box>
      <Box p={3}>{children}</Box>
    </Box>
  );
};

export default CalendarGrid;
