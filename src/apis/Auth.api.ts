import axios from 'axios'
import { API_LOGIN, HOST } from '../constants/APIConstant'
import { LoginPayloadType, LoginThunkReturnType } from '../types/AuthTypes'
import http from '../utils/Http'

export const login = ({ phone, password }: LoginPayloadType) => {
  const formData = new FormData()
  formData.append('phone', phone)
  formData.append('password', password)

  return http.post<LoginThunkReturnType>(API_LOGIN, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
