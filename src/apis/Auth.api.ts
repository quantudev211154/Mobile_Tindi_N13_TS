import axios from 'axios'
import { API_LOGIN } from '../constants/APIConstant'
import { LoginThunkReturnType } from '../types/AuthTypes'
import http from '../utils/Http'

export const login = async (phone: string, pwd: string) => {
  const formData = new FormData()
  formData.append('phone', phone)
  formData.append('password', pwd)

  const response = await axios.get('http://192.168.1.47:8100/')

  console.log(response.data)

  return response
}
