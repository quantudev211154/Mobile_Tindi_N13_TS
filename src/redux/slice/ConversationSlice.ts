import { RootState } from '../redux_store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from '../../types/ParticipantTypes'
import { UserType } from '../../types/UserTypes'
import { MessageType } from '../../types/MessageTypes'
import {
  ConversationControlType,
  ConversationType,
} from '../../types/ConversationTypes'
import {
  forwardOneMessage,
  loadMessageOfConversation,
  saveMessage,
} from '../thunks/MessageThunk'
import {
  addMultiParticipantToConversation,
  addNewConversation,
  grantPermission,
  loadConversations,
  outGroupConversation,
  removeParticipant,
  updateConversationAvatarAndTitle,
  updateStatusOfParticipant,
} from '../thunks/ConversationThunk'
import { updateUserProfile } from '../thunks/UserThunk'

const initialState: ConversationControlType = {
  currentChat: null,
  conversationList: [],
  isLoadingChatList: true,
  findConverKeyword: '',
  isLoadingMessageList: false,
  messageList: [],
  replyingMessage: null,
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {
    resetCurrentChat: (state) => {
      state.currentChat = null
    },
    setFindConverKeyword: (state, action: PayloadAction<string>) => {
      state.findConverKeyword = action.payload
    },
    changeCurrentChat: (state, action: PayloadAction<ConversationType>) => {
      state.currentChat = action.payload
    },
    resetConversationSlice: (state) => {
      state.currentChat = null
      state.isLoadingChatList = true
      state.conversationList = []
    },
    deleteConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversationList = state.conversationList.filter(
        (conver) => conver.id !== action.payload.id
      )

      if (state.currentChat && state.currentChat.id === action.payload.id) {
        state.currentChat = null
      }
    },
    addNewConversation: (state, action: PayloadAction<ConversationType>) => {
      const existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload.id
      )

      if (existingConver === undefined) {
        state.conversationList.push(action.payload)
      }
    },
    addMoreMembersToConversation: (
      state,
      action: PayloadAction<[ConversationType, ParticipantType[]]>
    ) => {
      const existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload[0].id
      )

      if (existingConver === undefined) {
        let newConver = action.payload[0]

        for (let parti of action.payload[1]) {
          newConver.participantResponse.push(parti)
        }

        state.conversationList.push(action.payload[0])
      } else {
        const existingParti = existingConver.participantResponse.find(
          (parti) => parti.id === action.payload[1][0].id
        )

        if (existingParti === undefined) {
          for (let parti of action.payload[1]) {
            existingConver.participantResponse.push(parti)

            if (
              state.currentChat &&
              state.currentChat.id === existingConver.id
            ) {
              state.currentChat.participantResponse.push(parti)
            }
          }
        }
      }
    },
    updateStatusForParticipant: (
      state,
      action: PayloadAction<[ConversationType, UserType, ParticipantStatusEnum]>
    ) => {
      if (state.currentChat) {
        let existingParti = state.currentChat.participantResponse.find(
          (parti) => parti.user.id === action.payload[1].id
        )

        if (
          existingParti !== undefined &&
          existingParti.status !== action.payload[2]
        ) {
          existingParti.status = action.payload[2]
        }
      }

      let existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload[0].id
      )

      if (existingConver !== undefined) {
        let existingParti = existingConver.participantResponse.find(
          (parti) => parti.user.id === action.payload[1].id
        )

        if (
          existingParti !== undefined &&
          existingParti.status !== action.payload[2]
        ) {
          existingParti.status = action.payload[2]
        }
      }
    },
    removeParticipantFromGroup: (
      state,
      action: PayloadAction<[ConversationType, ParticipantType]>
    ) => {
      if (state.currentChat && state.currentChat.id === action.payload[0].id) {
        state.currentChat.participantResponse =
          state.currentChat.participantResponse.filter(
            (parti) => parti.id !== action.payload[1].id
          )
      }

      for (let conver of state.conversationList) {
        if (conver.id === action.payload[0].id) {
          conver.participantResponse = conver.participantResponse.filter(
            (parti) => parti.id !== action.payload[1].id
          )

          return
        }
      }
    },
    changeRoleOfParticipant: (
      state,
      action: PayloadAction<
        [ConversationType, ParticipantType, ParticipantRoleEnum]
      >
    ) => {
      if (state.currentChat && state.currentChat.id === action.payload[0].id) {
        let existingParti = state.currentChat.participantResponse.find(
          (parti) => parti.id === action.payload[1].id
        )

        if (existingParti !== undefined) {
          existingParti.role = action.payload[2]
        }
      }

      const existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload[0].id
      )

      if (existingConver !== undefined) {
        let existingParti = existingConver.participantResponse.find(
          (parti) => parti.id === action.payload[1].id
        )

        if (existingParti !== undefined) {
          existingParti.role = action.payload[2]
        }
      }
    },
    changeConversationInfo: (
      state,
      action: PayloadAction<[ConversationType, string, string]>
    ) => {
      if (state.currentChat && state.currentChat.id === action.payload[0].id) {
        state.currentChat.avatar = action.payload[1]
        state.currentChat.title = action.payload[2]
      }

      const existingConversation = state.conversationList.find(
        (conver) => conver.id === action.payload[0].id
      )

      if (existingConversation !== undefined) {
        existingConversation.avatar = action.payload[1]
        existingConversation.title = action.payload[2]
      }
    },
    clearMessageList: (state) => {
      state.messageList = []
      state.replyingMessage = null
    },
    setLoadingMessageList: (state) => {
      state.isLoadingMessageList = true
    },
    addNewMessageToCurrentChat: (state, action: PayloadAction<MessageType>) => {
      const existingMsg =
        state.messageList &&
        state.messageList.find(
          (msg) => msg.socketFlag === action.payload.socketFlag
        )

      if (existingMsg === undefined)
        state.messageList = state.messageList && [
          ...state.messageList,
          action.payload,
        ]
    },
    setReplyingMessage: (state, action: PayloadAction<MessageType | null>) => {
      state.replyingMessage = action.payload
    },
    updateMessageBySocketFlag: (state, action: PayloadAction<MessageType>) => {
      if (state.messageList) {
        for (let iterator of state.messageList) {
          if (iterator.socketFlag === action.payload.socketFlag) {
            iterator.id = action.payload.id
            iterator.attachmentResponseList =
              action.payload.attachmentResponseList
            iterator.isLoading = false
          }
        }
      }
    },
    revokeMessage: (state, action: PayloadAction<MessageType>) => {
      if (state.messageList) {
        for (let message of state.messageList) {
          if (message.id === action.payload.id) message.delete = true
        }
      }
    },
    deleteMessage: (
      state,
      action: PayloadAction<[MessageType, ParticipantType]>
    ) => {
      for (let iterator of state.messageList) {
        if (iterator.id === action.payload[0].id) {
          iterator.participantDeleted.push(action.payload[1])
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadConversations.pending, (state) => {
      state.isLoadingChatList = true
    })
    builder.addCase(
      loadConversations.fulfilled,
      (state, action: PayloadAction<ConversationType[]>) => {
        state.conversationList = action.payload
        state.isLoadingChatList = false
      }
    )
    builder.addCase(addNewConversation.pending, (state) => {
      state.isLoadingChatList = true
    })
    builder.addCase(addNewConversation.fulfilled, (state, action) => {
      state.conversationList.unshift(action.payload)

      state.currentChat = state.conversationList[0]

      state.isLoadingChatList = false
    })

    builder.addCase(forwardOneMessage.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        if (iterator.id === action.payload?.conversation.id) {
          iterator.messageLatest = action.payload
        }
      }
    })

    builder.addCase(saveMessage.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        if (iterator.id === action.payload.message.conversation.id) {
          const latestMsg = action.payload.message
          iterator.messageLatest = latestMsg
        }
      }

      if (state.messageList) {
        for (let iterator of state.messageList) {
          if (iterator.socketFlag === action.payload.message.socketFlag) {
            const latestMsg = action.payload.message
            iterator.id = latestMsg.id
            iterator.attachmentResponseList = latestMsg.attachmentResponseList
            iterator.isLoading = false
          }
        }
      }
    })

    builder.addCase(
      updateConversationAvatarAndTitle.fulfilled,
      (state, action) => {
        let result = state.conversationList.find(
          (conversation) => conversation.id === action.payload.id
        )
        result!.avatar = action.payload.avatar
        result!.title = action.payload.title

        state.currentChat!.avatar = action.payload.avatar
        state.currentChat!.title = action.payload.title
      }
    )

    builder.addCase(removeParticipant.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        let result = iterator.participantResponse.find(
          (participant) => participant.id === action.payload
        )

        if (result !== undefined) {
          iterator.participantResponse = iterator.participantResponse.filter(
            (participant) => participant.id !== action.payload
          )

          if (state.currentChat) {
            state.currentChat.participantResponse =
              state.currentChat?.participantResponse.filter(
                (participant) => participant.id !== action.payload
              )
          }

          return
        }
      }
    })

    builder.addCase(
      addMultiParticipantToConversation.fulfilled,
      (state, action) => {
        const existingConver = state.conversationList.find(
          (conver) => conver.id === action.payload.converId
        )

        if (state.currentChat && existingConver !== undefined) {
          for (let participant of action.payload.newParticipants) {
            state.currentChat.participantResponse.push(participant)
            existingConver.participantResponse.push(participant)
          }
        }
      }
    )

    builder.addCase(grantPermission.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        let result = iterator.participantResponse.find(
          (participant) => participant.id === action.payload.id
        )

        if (result !== undefined) {
          result.role = action.payload.role
        }
      }

      if (state.currentChat) {
        const result2 = state.currentChat.participantResponse.find(
          (parti) => parti.id === action.payload.id
        )

        if (result2 !== undefined) {
          result2.role = action.payload.role
        }
      }
    })

    builder.addCase(updateStatusOfParticipant.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        let result = iterator.participantResponse.find(
          (participant) => participant.id === action.payload.id
        )

        if (result !== undefined) {
          result.status = action.payload.status
        }
      }

      if (state.currentChat) {
        const result2 = state.currentChat.participantResponse.find(
          (parti) => parti.id === action.payload.id
        )

        if (result2 !== undefined) {
          result2.status = action.payload.status
        }
      }
    })

    builder.addCase(outGroupConversation.fulfilled, (state, action) => {
      state.currentChat = null

      state.conversationList = state.conversationList.filter(
        (conver) => conver.id !== action.payload
      )
    })

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      if (state.currentChat) {
        let currentUser = state.currentChat.participantResponse.find(
          (parti) => parti.user.id === action.payload.id
        )

        if (currentUser !== undefined) {
          currentUser.user.fullName = action.payload.fullName
          currentUser.user.avatar = action.payload.avatar
        }
      }

      for (let i = 0; i < state.conversationList.length; ++i) {
        let currentUser = state.conversationList[i].participantResponse.find(
          (parti) => parti.user.id === action.payload.id
        )

        if (currentUser !== undefined) {
          currentUser.user.fullName = action.payload.fullName
          currentUser.user.avatar = action.payload.avatar
        }
      }
    })

    builder.addCase(loadMessageOfConversation.pending, (state) => {
      state.isLoadingMessageList = true
    })

    builder.addCase(loadMessageOfConversation.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.messageList = []
        state.isLoadingMessageList = false
        return
      }

      if (
        !!state.currentChat &&
        state.currentChat.id === action.payload[0].conversation.id
      ) {
        state.messageList = action.payload
      }
      state.isLoadingMessageList = false
    })

    builder.addCase(loadMessageOfConversation.rejected, (state) => {
      state.isLoadingMessageList = false
    })
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversation
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
