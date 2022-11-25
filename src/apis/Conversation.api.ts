import { API_LOAD_CONVERS } from '../constants/APIConstant'
import { ConversationType } from '../types/ConversationTypes'
import http from '../utils/Http'

export const loadConversationsListByCurrentUserId = async (
  currentUserId: number
) => {
  return await http.get<ConversationType[]>(
    `${API_LOAD_CONVERS}/${currentUserId}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
