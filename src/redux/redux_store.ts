import { configureStore } from '@reduxjs/toolkit'
import ConversationDetail from '../apis/ConversationDetail'
import AuthSlice from './slice/AuthSlice'
import ContextMenuSlice from './slice/ContextMenuSlice'
import ConversationSlice from './slice/ConversationSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    conversation: ConversationSlice,
    context: ContextMenuSlice,
    converDetail: ConversationDetail,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
