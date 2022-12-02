import { API_LOAD_CONTACTS } from '../constants/APIConstant'
import { ContactType } from '../types/ContactTypes'
import { UserType } from '../types/UserTypes'
import http from '../utils/Http'

export const loadContacts = async (currentUser: UserType | null) => {
  if (!currentUser)
    return Promise.reject(new Error('Current user must not be null'))
  return await http.get<ContactType[]>(API_LOAD_CONTACTS + currentUser.id)
}
