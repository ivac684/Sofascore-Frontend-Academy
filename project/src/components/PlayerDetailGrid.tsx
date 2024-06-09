import React from 'react'
import { Box, Grid } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/utils/useScreenSize'

const PlayerDetailGrid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()

  return (
    <Box
      width={isSmallScreen ? '104px' : '90%'}
      height="56px"
      padding="8px 10.2px 12px 10.2px"
      borderRadius="4px"
      backgroundColor="var(--secondary-highlight)"
      mt="20px"
      mr={isSmallScreen ? '35px' : '20px'}
    >
      {children}
    </Box>
  )
}

export default PlayerDetailGrid
