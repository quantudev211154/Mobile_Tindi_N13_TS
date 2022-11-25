import { ConversationDetailTypes } from '../types/ConversationDetailTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CONVERSATION_DETAIL_NAME } from '../constants/ReduxConstant'
import { MessageType } from '../types/MessageTypes'
import { RootState } from '../redux/redux_store'

const initialState: ConversationDetailTypes = {
  isLoadingMessageList: false,
  messageList: [],
}

const conversationDetailSlice = createSlice({
  name: CONVERSATION_DETAIL_NAME,
  initialState,
  reducers: {
    setMessageList: (state, action: PayloadAction<MessageType[]>) => {
      state.messageList = action.payload
    },
    addNewMessageToCurrentChat: (state, action: PayloadAction<MessageType>) => {
      const existingMsg = state.messageList.find(
        (msg) => msg.socketFlag === action.payload.socketFlag
      )

      if (existingMsg === undefined)
        state.messageList = [...state.messageList, action.payload]
    },
    updateMessageBySocketFlag: (state, action: PayloadAction<MessageType>) => {
      for (let iterator of state.messageList) {
        if (iterator.socketFlag === action.payload.socketFlag) {
          iterator.id = action.payload.id
          iterator.attachmentResponseList =
            action.payload.attachmentResponseList
          iterator.isLoading = false
        }
      }
    },
    revokeMessage: (state, action: PayloadAction<MessageType>) => {
      for (let message of state.messageList) {
        if (message.id === action.payload.id) message.revoke = true
      }
    },
    deleteMessage: (state, action: PayloadAction<MessageType>) => {
      for (let iterator of state.messageList) {
        if (iterator.id === action.payload.id) iterator.delete = true
      }
    },
  },
  extraReducers: (builder) => {
    //   builder.addCase(loadMessageOfConversation.pending, (state) => {
    //     state.isLoadingMessageList = true
    //   })
    //   builder.addCase(loadMessageOfConversation.fulfilled, (state, action) => {
    //     state.messageList = action.payload
    //     state.isLoadingMessageList = false
    //   })
    //   builder.addCase(saveMessage.fulfilled, (state, action) => {
    //     for (let iterator of state.messageList) {
    //       if (iterator.socketFlag === action.payload.message.socketFlag) {
    //         const latestMsg = action.payload.message
    //         iterator.id = latestMsg.id
    //         iterator.attachmentResponseList = latestMsg.attachmentResponseList
    //         iterator.isLoading = false
    //       }
    //     }
    //   })
  },
})

export const conversationDetailState = (state: RootState) => state.converDetail
export const conversationDetailActions = conversationDetailSlice.actions
export default conversationDetailSlice.reducer
