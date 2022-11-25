import { AUTH_SLICE_NAME } from '../../constants/ReduxConstant'
import { AuthSliceType, LoginThunkReturnType } from '../../types/AuthTypes'
import { RootState } from '../redux_store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JWT } from '../../utils/JWT'
import { MySocket } from '../../services/TindiSocket'
import { UserType } from '../../types/UserTypes'
import { checkAuth } from '../thunks/AuthThunk'

const initialState: AuthSliceType = {
  isAuthLoading: true,
  isAuth: false,
  currentUser: null,
  loginErrorMsg: null,
}

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    loginFullfilled: (state, action: PayloadAction<LoginThunkReturnType>) => {
      state.isAuth = true
      state.isAuthLoading = false
      state.currentUser = {
        ...state.currentUser,
        id: action.payload.userId,
        phone: action.payload.phone,
        fullName: action.payload.name,
        avatar: action.payload.avatar,
      }
    },
    loginRejected: (state) => {
      state.isAuth = false
      state.currentUser = null
      state.isAuthLoading = false
    },
    reloadCurrentUser: (state, action) => {
      state.currentUser = action.payload as UserType

      if (state.currentUser) {
        MySocket.initTindiSocket(state.currentUser.id)
      }
    },
    logout: (state) => {
      JWT.deleteToken()
      state.isAuth = false
      state.isAuthLoading = true
    },
  },
  extraReducers(builder) {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload
      state.isAuthLoading = false
    })

    builder.addCase(checkAuth.rejected, (state) => {
      state.isAuth = false
      state.isAuthLoading = true
    })
  },
})

export const authState = (state: RootState) => state.auth
export const authActions = authSlice.actions
export default authSlice.reducer
