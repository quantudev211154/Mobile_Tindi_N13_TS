import { Fonts } from 'react-native-paper/lib/typescript/types'
import {
  BE_REGULAR,
  BE_BOLD,
  BE_MEDIUM,
  BE_SEMIBOLD,
  BE_LIGHT,
  BE_THIN,
} from '../constants/FontConstant'

export const customFonts = {
  BE_REGULAR: require('../assets/fonts/BeVietnamPro-Regular.ttf'),
  BE_MEDIUM: require('../assets/fonts/BeVietnamPro-Medium.ttf'),
  BE_SEMIBOLD: require('../assets/fonts/BeVietnamPro-SemiBold.ttf'),
  BE_BOLD: require('../assets/fonts/BeVietnamPro-Bold.ttf'),
}

export const _fontConfig: Fonts = {
  light: {
    fontFamily: BE_LIGHT,
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: BE_THIN,
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: BE_REGULAR,
    fontWeight: '400',
  },
  medium: {
    fontFamily: BE_MEDIUM,
    fontWeight: 'bold',
  },
}

export const fontConfigCrossPlatform = {
  ios: _fontConfig,
  android: _fontConfig,
}
