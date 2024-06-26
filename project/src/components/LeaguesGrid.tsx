import React from 'react';
import { Box } from '@kuma-ui/core';
import { ChildrenProps } from '@/types/ChildrenProps';
import useScreenSize from '@/customHooks/useScreenSize';

const LeaguesGrid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize();
  
  return (
    <Box
      display="grid"
      width={isSmallScreen ? '100vw' : 'calc(100% - 40px)'}
      max-height="450px"
      height="400px"
      margin={isSmallScreen ? '0' : '40px 20px'}
      borderRadius="16px"
      bg="var(--surface-1)"
      color="var(--on-surface-lv1)"
      p={3}
    >
      {children}
    </Box>
  );
};

export default LeaguesGrid;
