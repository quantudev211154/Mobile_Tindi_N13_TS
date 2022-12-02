import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slice/AuthSlice'
import ContextMenuSlice from './slice/ContextMenuSlice'
import ConversationSlice from './slice/ConversationSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    conversation: ConversationSlice,
    context: ContextMenuSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
