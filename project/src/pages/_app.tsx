// App.js
import { ThemeContextProvider } from '@/context/ThemeContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { useState } from 'react'
import { Flex, Box } from '@kuma-ui/core'
import { ResponsiveBox } from '@/styles/styledComponents'
import Header from './header'
import Tournaments from './tournaments'
import Footer from './footer'
import useScreenSize from '@/customHooks/useScreenSize'

//@ts-ignore
export const fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404')
    }
  })

export default function App({ Component, pageProps }: AppProps) {
  const [selectedSport, setSelectedSport] = useState<string>('Football')
  const isSmallScreen = useScreenSize();

  const handleSportSelect = (sportName: string) => {
    setSelectedSport(sportName)
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeContextProvider>
        <Flex flexDirection="column" minHeight="100vh">
          <Header onSelectSport={handleSportSelect} />
          <Flex justifyContent="center" maxWidth='1800px'>
            <ResponsiveBox>
              <Tournaments selectedSport={selectedSport} />
            </ResponsiveBox>
            <Component {...pageProps} selectedSport={selectedSport} />
          </Flex>
          <Box mt='auto'>
            <Footer />
          </Box>
        </Flex>
      </ThemeContextProvider>
    </SWRConfig>
  )
}
