import React from 'react'
import { Box, Grid } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/utils/useScreenSize'

const SmallSettingsContainer = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()
  return (
    <Box
    width={isSmallScreen ? '90%' : '433px'}
      height="auto"
      padding="16px 0"
      borderRadius="8px"
      backgroundColor="var(--secondary-highlight)"
      margin={isSmallScreen ? '20px auto' : '20px 8px'}
    >
      {children}
    </Box>
  )
}

export default SmallSettingsContainer
