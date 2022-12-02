import { useFonts } from 'expo-font'
import { customFonts } from './src/config/FontsConfig'
import { Provider } from 'react-native-paper'
import { theme } from './src/config/ThemeConfig'
import MainRoute from './src/navigation/MainRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './src/redux/redux_store'

const queryClient = new QueryClient()

export default function App() {
  let [fontsLoaded] = useFonts(customFonts)

  if (!fontsLoaded) return null

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Provider theme={theme}>
          <MainRoute />
        </Provider>
      </QueryClientProvider>
    </ReduxProvider>
  )
}
