import React, { useEffect, useState } from 'react'
import IconButton from '../components/IconButton'
import { Box, Flex } from '@kuma-ui/core'
import { useThemeContext } from '@/context/ThemeContext'

const Footer = () => {
  const { isDark } = useThemeContext()
  const iconSrc = isDark ? '/sofascore-lockup.svg' : '/sofascore-lockup-dark.svg'
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const footerHeight = document.querySelector('footer')?.offsetHeight || 0
      const bodyHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      setIsSticky(bodyHeight - scrollTop <= windowHeight + footerHeight)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <Box as="footer" width="100%">
      <Flex
        bg="var(--surface-1)"
        p={4}
        height="116px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
        mt='20px'
        bottom="0"
        left="0"
        right="0"
        zIndex="1000"
        width="100%"
      >
        <IconButton iconSrc={iconSrc} />
        <Flex justifyContent="center" alignItems="center" pt="13px" color="var(--on-surface-lv1)" fontSize="12px">
          © 2024 Sofascore – All Rights Reserved.
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
