import { API_LOGIN } from '../constants/APIConstant'
import { LoginThunkReturnType } from '../types/AuthTypes'
import http from '../utils/Http'

export const login = (phone: string, pwd: string) => {
  const formData = new FormData()
  formData.append('phone', phone)
  formData.append('password', pwd)

  return http.post<LoginThunkReturnType>(API_LOGIN, formData)
}
