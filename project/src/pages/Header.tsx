import React, { useState } from 'react';
import IconButton from '../components/IconButton'; 
import { Box, Flex } from '@kuma-ui/core';
import useSWR from 'swr';
import { Sport } from '@/types/Sport';

const Header = () => {
  const [selectedSport, setSelectedSport] = useState<string>('Football');
  const { data, error } = useSWR('/api/sports');

  console.log("data", data, error);

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName);
  };

  const calculateSpacerPosition = () => {
    if (!data) return '0px';
    const index = data.findIndex((sport: Sport) => sport.name === selectedSport);
    const iconWidth = 105; 
    return `${index * iconWidth}px`;
  };

  return (
    <Box as="header" bg="blue" p={4} height="90px">
      <Flex justifyContent="center" alignItems="center" mb="32px">
        <IconButton
          iconSrc="sofascore-lockup.svg"
          altText=""
          width={132}
          height={20}
          onClick={() => console.log('Icon 1 clicked')}
        />
      </Flex>
      <Box position="relative" width="100%">
        <Flex justifyContent="center" alignItems="center">
          <Flex as="ul" listStyleType="none" alignItems="center" position="relative" >
            {data && data.map((sport: Sport) => (
              <Box key={sport.id} as="li" mx={6} cursor="pointer" onClick={() => handleSportClick(sport.name)}>
                <IconButton
                  iconSrc={`icon-${sport.slug}.svg`} 
                  altText={sport.name}
                  width={18}
                  height={18}
                  onClick={() => handleSportClick(sport.name)}
                  isSelected={selectedSport === sport.name} 
                />
                <span style={{ marginLeft: '5px' }}>{sport.name}</span>
              </Box>
            ))}
            <Box 
              bg="white" 
              height="4px" 
              borderRadius="15px" 
              mt="5px" 
              width={selectedSport === 'American Football' ? '160px' : '100px'}
              style={{
                position: 'absolute',
                bottom: '-10px', 
                left: calculateSpacerPosition(), 
                transition: 'left 0.3s ease',
              }}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
