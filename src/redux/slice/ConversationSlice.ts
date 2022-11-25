import { RootState } from '../redux_store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ConversationControlType,
  ConversationType,
} from '../../types/ConversationTypes'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from '../../types/ParticipantTypes'
import { UserType } from '../../types/UserTypes'

const initialState: ConversationControlType = {
  currentChat: null,
  conversationList: [],
  isLoadingChatList: true,
  findConverKeyword: '',
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {
    loadConversation: (state, action: PayloadAction<ConversationType[]>) => {
      state.conversationList = action.payload
    },
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
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversation
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
