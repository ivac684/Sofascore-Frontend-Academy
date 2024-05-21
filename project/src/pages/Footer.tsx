import React from 'react';
import IconButton from '../components/IconButton'; 
import { Box, Flex, Spacer } from '@kuma-ui/core';

const Footer = () => {
  return (
    <Box as="footer" bg="white" p={4} height="95px" pt='24px' position="fixed" bottom="0" left="0" right="0">
        <Flex justifyContent="center" alignItems="center">
            <IconButton
            iconSrc="sofascore-lockup-dark.svg"
            altText=""
            onClick={() => console.log('Icon 1 clicked')}
            />
        </Flex>
      <Flex justifyContent="center" alignItems="center" pt='13px' color='rgba(18, 18, 18, 0.4)' fontSize='12px'>
       © 2024 Sofascore – All Rights Reserved.
      </Flex>
    </Box>
  );
};

export default Footer;
