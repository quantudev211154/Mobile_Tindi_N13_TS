import axios from 'axios'
import { API_LOGIN } from '../constants/APIConstant'
import { LoginThunkReturnType } from '../types/AuthTypes'
import http from '../utils/Http'

export const login = async (phone: string, pwd: string) => {
  const formData = new FormData()
  formData.append('phone', phone)
  formData.append('password', pwd)
console.log(formData);
  const response = await http.post(API_LOGIN, formData,
   { headers: { 'Content-Type': 'multipart/form-data' } });
  console.log(response);

  return response;
}
