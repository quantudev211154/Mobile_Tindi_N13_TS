import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'
import { customFonts } from './src/config/FontsConfig'
import { Provider } from 'react-native-paper'
import { theme } from './src/config/ThemeConfig'
import MainRoute from './src/navigation/MainRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Register from './src/screens/Register'
import Contacts from './src/screens/Contacts'

const query = new QueryClient()

export default function App() {
  let [fontsLoaded] = useFonts(customFonts)

  if (!fontsLoaded) return null

  return (
    <QueryClientProvider client={query}>
      <Provider theme={theme}>
        <MainRoute />
      </Provider>
    </QueryClientProvider>
    // <Contacts/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
