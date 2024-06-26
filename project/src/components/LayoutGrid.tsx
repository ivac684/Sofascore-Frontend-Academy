import React, { useState, useEffect } from 'react'
import { Box } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/customHooks/useScreenSize'

const TournamentGrid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()

  return (
    <Box
      width={isSmallScreen ? '100vw' : 'calc(100% - 20px)'}
      p="15px"
      margin={isSmallScreen ? '0px 0px' : '15px 15px'}
      borderRadius={isSmallScreen ? '0' : '16px'}
      boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.08)"
      bg="var(--surface-1)"
      display="grid"
    >
      {children}
    </Box>
  )
}

export default TournamentGrid
