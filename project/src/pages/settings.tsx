import React from 'react'
import { Image, Box, Text } from '@kuma-ui/core'
import SmallSettingsContainer from '@/components/SmallSettingsContainer'
import { useThemeContext } from '@/context/ThemeContext'
import SettingsGrid from '@/components/SettingsGrid'
import useScreenSize from '@/utils/useScreenSize'
import { Divider, SettingsText1, SettingsText2 } from '@/styles/styledComponents'

const Settings = () => {
  const { setIsDark, isDark } = useThemeContext()
  const isSmallScreen = useScreenSize()

  const handleSetLightTheme = () => setIsDark(false)
  const handleSetDarkTheme = () => setIsDark(true)

  return (
    <SettingsGrid>
      <Text
        mt="20px"
        color="var(--on-surface-lv1)"
        ml="15px"
        fontSize="20px"
        textAlign={isSmallScreen ? 'center' : 'left'}
      >
        <b>Settings</b>
      </Text>
      <SmallSettingsContainer>
        <Text color="var(--primary-default)" ml="10px" fontSize="12px">
          <b>Theme</b>
        </Text>
        <Box display="flex" flexDirection="column" gap="10px" ml="10px" mt="20px">
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="15px" mr="10px">
            <Text color="var(--on-surface-lv1)" fontSize="12px">
              Light
            </Text>
            <input type="radio" name="theme" checked={!isDark} onChange={handleSetLightTheme} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mr="10px">
            <Text color="var(--on-surface-lv1)" fontSize="12px">
              Dark
            </Text>
            <input type="radio" name="theme" checked={isDark} onChange={handleSetDarkTheme} />
          </Box>
        </Box>
      </SmallSettingsContainer>
      <SmallSettingsContainer>
        <Text color="var(--on-surface-lv1)" ml="10px" fontSize="20px">
          <b>About</b>
        </Text>
        <Text color="var(--on-surface-lv1)" ml="10px" mt="15px" fontSize="16px">
          <b>Sofascore Frontend Academy</b>
        </Text>
        <SettingsText1>Class 2024</SettingsText1>
        
        <Divider />

        <Text color="var(--on-surface-lv2)" ml="10px" mt="10px" fontSize="12px">
          App name
        </Text>
        <SettingsText1>Mini Sofascore App</SettingsText1>
        <Divider />
        <SettingsText2>API Credit</SettingsText2>
        <SettingsText1>Sofascore</SettingsText1>
        <SettingsText2>Developer</SettingsText2>
        <SettingsText1>Iva Burić</SettingsText1>
        <Box borderBottom="1px solid var(--on-surface-lv2)" mt="20px" ml="10px" mr="10px" />
        <Box display="flex" justifyContent="center" mt="20px" mb="20px">
          <Image src={'/sofascore-blue.svg'} width="132px" height="20px" />
        </Box>
      </SmallSettingsContainer>
    </SettingsGrid>
  )
}

export default Settings
