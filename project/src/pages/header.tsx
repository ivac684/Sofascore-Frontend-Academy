import React, { useEffect, useState } from 'react';
import IconButton from '../components/IconButton'; 
import { Box, Flex, Image } from '@kuma-ui/core';
import useSWR from 'swr';
import { Sport } from '@/types/Sport';
import { useThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';
import { TrophyDisplay } from '@/styles/styledComponents';
import router from 'next/router';
import useXSScreenSize from '@/customHooks/useXSscreenSize';

interface HeaderProps {
  onSelectSport: (sportName: string) => void;
}

const Header = ({ onSelectSport }: HeaderProps) => {
  const [selectedSport, setSelectedSport] = useState<string>('Football');
  const { data, error } = useSWR('/api/sports');
  const { setIsDark, isDark } = useThemeContext();
  const isXSScreen = useXSScreenSize(); 

  const sofascoreIcon = isDark ? '/sofascore-lockup-dark.svg' : '/sofascore-lockup.svg';
  const settingsIcon = isDark ? '/ic-settings-dark.svg' : '/ic-settings.svg';
  const trophyIcon = isDark ? '/ic-trophy-dark.svg' : '/ic-trophy.svg';

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName);
    onSelectSport(sportName); 
  };

  const calculateSpacerPosition = () => {
    if (!data) return;
    const index = data.findIndex((sport: Sport) => sport.name === selectedSport);
    const iconWidth = 105; 
    return `${index * iconWidth}px`;
  };

  const handleTrophyClick = () => {
    if (router.pathname === '/tournaments') {
      router.push('/');
    } else {
      router.push('/tournaments');
    }
  };

  const displaySportName = (sportName: string) => {
    if (sportName === 'American Football' && isXSScreen) { 
      return 'Am. Football';
    }
    return sportName;
  };

  return (
    <Box as="header" bg="var(--primary-default)" p={4} height="90px" position="relative">
      <Flex justifyContent="center" alignItems="center" mb="32px">
        <Link href="/">
          <IconButton
            iconSrc={sofascoreIcon}
            altText=""
            width={132}
            height={20}
          />
        </Link>
      </Flex>
      <Box width="100vw">
        <Flex justifyContent="center" alignItems="center">
          <Flex as="ul" listStyleType="none" alignItems="center" position="relative" >
            {data && data.map((sport: Sport) => {
              const sportIcon = isDark ? `/icon-${sport.slug}-dark.svg` : `/icon-${sport.slug}.svg`;
              return (
                <Link href={`/`} key={sport.id}>
                  <Box as="li" mx={6} cursor="pointer" color="var(--surface-1)" onClick={() => handleSportClick(sport.name)}>
                    <IconButton
                      iconSrc={sportIcon}
                      altText={sport.name}
                      width={18}
                      height={18}
                      onClick={() => handleSportClick(sport.name)}
                      isSelected={selectedSport === sport.name} 
                    />
                    <span style={{ marginLeft: '5px' }}>{displaySportName(sport.name)}</span>
                  </Box>
                </Link>
              );
            })}
            <Box 
              bg="var(--surface-1)"
              height="4px" 
              borderRadius="15px" 
              mt="5px" 
              width={selectedSport === 'American Football' && isXSScreen ? '160px' : '100px'}
              position='absolute'
              bottom='-10px'
              transition='left 0.3s ease'
              style={{
                left: calculateSpacerPosition(), 
              }}
            />
          </Flex>
        </Flex>
      </Box>
      <TrophyDisplay onClick={handleTrophyClick}>
        <Image
          src={trophyIcon}
          alt="Trophy"
          width="24px"
          height="24px"
          position="absolute"
          top="16px"
          right="64px"
          cursor="pointer"
        />
      </TrophyDisplay>
      <Link href='/settings'>
        <Image
          src={settingsIcon}
          alt="Settings"
          width="24px"
          height="24px"
          position="absolute"
          top="16px"
          right="16px"
          cursor="pointer"
        />
      </Link>
    </Box>
  );
};

export default Header;
