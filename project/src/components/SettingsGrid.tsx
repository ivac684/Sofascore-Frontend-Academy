import React from 'react'
import { Box, Grid } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/utils/useScreenSize'

const SettingsGrid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()
  return (
    <Box
      width={isSmallScreen ? '100vw' : '448px'}
      height="auto"
      padding="16px 0"
      borderRadius="8px"
      bg="var(--surface-1)"
      color="var(--on-surface-lv1)"
      margin={isSmallScreen ? '0' : '20px 8px'}
    >
      {children}
    </Box>
  )
}

export default SettingsGrid
