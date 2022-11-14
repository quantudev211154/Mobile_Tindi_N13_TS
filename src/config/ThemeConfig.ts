import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
  Theme,
} from 'react-native-paper'
import { ERROR, PRIMARY, SECONDARY, TERTIARY } from '../constants/ThemeConstant'
import { fontConfigCrossPlatform } from './FontsConfig'

export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY,
    error: ERROR,
  },
  fonts: configureFonts(fontConfigCrossPlatform),
}
