import React from 'react'
import { Box } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/customHooks/useScreenSize'

const TeamDetailsGrid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()

  return (
    <Box
      width={isSmallScreen ? '100%' : 'auto'}
      height="auto"
      max-height="450px"
      ml={isSmallScreen ? '0px' : '15px'}
      mr="15px"
      mb={isSmallScreen ? '0px' : '20px'}
      borderRadius={isSmallScreen ? '0px' : '16px'}
      bg="var(--surface-1)"
      p={3}
      overflow="auto"
    >
      {children}
    </Box>
  )
}

export default TeamDetailsGrid
