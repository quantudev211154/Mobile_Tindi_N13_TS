export const HOST = 'http://localhost:8089/api/'
// const HOST = 'https://tindy-app-chat.herokuapp.com/api/'
export const API_LOGIN = 'auth/login'
export const API_REGISTER = 'auth/register'
export const API_GET_REFRESH_TOKEN = 'auth/refresh_token'
export const API_CHECK_EXISTING_PHONE = 'auth/exist?phone='
export const API_FORGOT_PWD = 'auth/forgot/password/'

export const API_LOAD_CONVERS = 'conversations'
export const API_ADD_CONVER = 'conversations'

export const API_LOAD_CONTACTS = 'users/contacts?userId='
export const API_ADD_NEW_CONTACT = 'users/contacts'
export const API_GET_USER_BY_PHONE = 'users?phone='

export const API_CHECK_EXISTING_CONTACT = 'contacts/exist'

export const API_LOAD_MSG_OF_CONVER = 'messages/'
export const API_REVOKE_MSG = 'messages/recall/'
export const API_SAVE_MSG = 'messages'
export const API_DOWLOAD_FILE = 'messages/attachments/'
export const API_FORWARD_MSG = 'messages/forward/' //tmp
