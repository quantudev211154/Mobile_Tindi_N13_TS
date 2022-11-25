import jwtDecode, { JwtPayload } from 'jwt-decode'
import { API_GET_REFRESH_TOKEN } from '../constants/APIConstant'
import {
  LOCAL_LOGOUT_EVENT_NAME,
  LOCAL_REFRESH_TOKEN_NAME,
} from '../constants/AuthConstant'
import { UserType } from '../types/UserTypes'
import http from './Http'
import AsyncStorage from '@react-native-async-storage/async-storage'

class JWTManager {
  inMemoryToken: string | null
  refreshTokenTimeoutId: number | null
  userId: number | null

  constructor() {
    this.inMemoryToken = null
    this.refreshTokenTimeoutId = null
    this.userId = null

    http.defaults.withCredentials = true
  }

  getToken = () => this.inMemoryToken

  getUserId = () => this.userId

  setToken = (accessToken: string) => {
    this.inMemoryToken = accessToken

    const decoded = jwtDecode<
      JwtPayload & { userId: number; phone: string; name: string }
    >(accessToken)
    this.userId = decoded.userId

    this.setRefreshTokenTimeout(
      (decoded.exp as number) - (decoded.iat as number)
    )

    this.pinBearerTokenToCommonHeader(accessToken)

    return true
  }

  getRefreshToken = async () => {
    try {
      const inLocalStorageRefreshToken = await AsyncStorage.getItem(
        LOCAL_REFRESH_TOKEN_NAME
      )

      if (!inLocalStorageRefreshToken) {
        this.deleteToken()
        return false
      }

      const response = await http.post(API_GET_REFRESH_TOKEN, {
        refreshToken: inLocalStorageRefreshToken,
      })

      const data = (await response.data) as {
        accessToken: string
        user: UserType
      }

      this.setToken(data.accessToken)

      return data.user
    } catch (error) {
      console.log(error)
      this.deleteToken()

      return false
    }
  }

  abortRefreshToken = () => {
    if (this.refreshTokenTimeoutId)
      window.clearTimeout(this.refreshTokenTimeoutId)
  }

  deleteToken = async () => {
    this.inMemoryToken = null

    this.abortRefreshToken()

    const setLogoutEvent = AsyncStorage.setItem(
      LOCAL_LOGOUT_EVENT_NAME,
      Date.now().toString()
    )
    const removeLocalRefreskToken = AsyncStorage.removeItem(
      LOCAL_REFRESH_TOKEN_NAME
    )

    await setLogoutEvent
    await removeLocalRefreskToken

    return true
  }

  setRefreshTokenTimeout = (delay: number) => {
    this.refreshTokenTimeoutId = window.setTimeout(
      this.getRefreshToken,
      delay * 10
    )
  }

  private pinBearerTokenToCommonHeader = (accessToken: string) => {
    accessToken
      ? (http.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`)
      : delete http.defaults.headers.common['Authorization']
  }
}

export const JWT = new JWTManager()
