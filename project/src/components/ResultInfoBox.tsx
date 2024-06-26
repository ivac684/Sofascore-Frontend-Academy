import React, { useEffect, useState } from 'react'
import { Box } from '@kuma-ui/core'
import { ChildrenProps } from '@/types/ChildrenProps'
import useScreenSize from '@/customHooks/useScreenSize'

const ResultInfoBox = ({ children }: ChildrenProps) => {
  const isSmallScreen = useScreenSize()

  return (
    <Box
      width='calc(100% - 40px)'
      max-height="450px"
      height="52px"
      margin="0 0 16px"
      mt="10px"
      borderRadius="8px"
      bg="var(--surface-2)"
    >
      {children}
    </Box>
  )
}

export default ResultInfoBox
