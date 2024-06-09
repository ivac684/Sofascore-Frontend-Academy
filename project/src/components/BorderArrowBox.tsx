import React from 'react';
import { Box } from '@kuma-ui/core';
import { ChildrenProps } from '@/types/ChildrenProps';
import useScreenSize from '@/utils/useScreenSize';

const BorderArrowBox = ({ children }: ChildrenProps) => {

  const isSmallScreen = useScreenSize();
  
  return (
    <Box
        width="56px"
        height="40px"
        display="flex"
        ml="15px"
        mt='15px'
        mr={isSmallScreen ? "20px" : "15px"}
        mb='15px'
        p='6px 15px'
        border="solid 2px #374df5"
    >
      {children}
    </Box>
  );
};

export default BorderArrowBox;
