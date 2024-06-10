import React from 'react'
import { Box } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/customHooks/useScreenSize'

const Grid = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()

  return (
    <Box
      width={isSmallScreen ? '100vw' : 'calc(100% - 40px)'}
      max-height="450px"
      height="auto"
      margin={isSmallScreen ? '0' : '40px 20px'}
      borderRadius="16px"
      bg="var(--surface-1)"
      color="var(--on-surface-lv1)"
      p={3}
      overflow="auto"
    >
      {children}
    </Box>
  )
}

export default Grid
