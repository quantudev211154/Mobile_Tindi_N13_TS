import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH_CHECK_AUTH_THUNK } from '../../constants/ReduxConstant'
import { CheckAuthPayload } from '../../types/AuthTypes'
import { JWT } from '../../utils/JWT'

export const checkAuth = createAsyncThunk(
  AUTH_CHECK_AUTH_THUNK,
  async (payload: CheckAuthPayload) => {
    const { dispatch, reloadUser } = payload

    const token = JWT.getToken()

    if (token) return true
    else {
      const user = await JWT.getRefreshToken()

      dispatch(reloadUser(user))

      if (user) return true
    }

    return false
  }
)
