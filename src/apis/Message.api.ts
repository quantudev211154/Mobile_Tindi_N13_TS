import { API_LOAD_MSG_OF_CONVER } from '../constants/APIConstant'
import { MessageType } from '../types/MessageTypes'
import http from '../utils/Http'

export const loadMessages = async (converId: number) => {
  return await http.get<MessageType[]>(API_LOAD_MSG_OF_CONVER + converId, {
    headers: { 'Content-Type': 'application/json' },
  })
}
