import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import { API_GET_USER_BY_PHONE } from '../constants/APIConstant'
import { AppDispatch } from '../redux/redux_store'
import { ContactType } from '../types/ContactTypes'
import {
  AddNewConversationPayloadType,
  ConversationType,
  ConversationTypeEnum,
} from '../types/ConversationTypes'
import { ParticipantRoleEnum, ParticipantType } from '../types/ParticipantTypes'
import { UserType } from '../types/UserTypes'
import http from './Http'
import { createRandomHEXColor } from './RandomHEXColor'

export const checkExistingSingleConversation = (
  userId1: number,
  userId2: number,
  conversationList: ConversationType[]
): ConversationType | null => {
  for (const item of conversationList) {
    if (item.type === ConversationTypeEnum.SINGLE) {
      const participantResponse = item.participantResponse

      const usersIdToString: string =
        participantResponse[0].user.id + '-' + participantResponse[1].user.id

      if (
        usersIdToString.includes(userId1.toString()) &&
        usersIdToString.includes(userId2.toString())
      )
        return item
    } else continue
  }

  return null
}

//   export const createNewGroup = async (
//     dispatch: AppDispatch,
//     toggleNewGroupOverlay: ActionCreatorWithoutPayload<string>,
//     groupName: string,
//     currentUser: UserType,
//     membersOfGroup: ContactType[],
//     groupAvatar?: string
//   ) => {
//     try {
//       const memberIds = membersOfGroup.map((member) => member.phone)

//       memberIds.push(currentUser.phone)

//       const payload: AddNewConversationPayloadType = {
//         title: groupName,
//         avatar: groupAvatar !== undefined ? groupAvatar : createRandomHEXColor(),
//         user: currentUser as UserType,
//         phones: memberIds,
//       }
//       dispatch(addNewConversation(payload))
//     } catch (error) {}

//     dispatch(toggleNewGroupOverlay())
//   }

//   export const createNewSingleConversation = async (
//     currentUser: UserType,
//     contact: ContactType,
//     conversationList: ConversationType[],
//     dispatch: AppDispatch,
//     changeCurrentChat: ActionCreatorWithPayload<ConversationType, string>,
//     toggleContactOverlay: ActionCreatorWithoutPayload<string>
//   ) => {
//     const response = await http.get(API_GET_USER_BY_PHONE + contact.phone)

//     const existingConver = checkExistingSingleConversation(
//       currentUser?.id as number,
//       (response.data as UserType).id,
//       conversationList
//     )

//     if (existingConver != null) {
//       dispatch(changeCurrentChat(existingConver))
//     } else {
//       try {
//         const payload: AddNewConversationPayloadType = {
//           title: contact.fullName,
//           avatar: createRandomHEXColor(),
//           user: currentUser as UserType,
//           phones: [
//             currentUser?.phone as string,
//             (response.data as UserType).phone,
//           ],
//         }
//         dispatch(addNewConversation(payload))
//       } catch (error) {}
//     }

//     dispatch(toggleContactOverlay())
//   }

export const getTeammateInSingleConversation = (
  currentUser: UserType,
  conversation: ConversationType
): ParticipantType => {
  const teammate = conversation?.participantResponse.find(
    (item) => item.user.id !== currentUser?.id
  )

  return teammate as ParticipantType
}

export const getRoleOfCurrentUserInConversation = (
  currentUser: UserType,
  currentConversation: ConversationType
) => {
  const participant = currentConversation.participantResponse.find(
    (participant) => participant.user.phone === currentUser.phone
  )

  return participant?.role
}

export const isContactExistingInCurrentChatParticipant = (
  contact: ContactType,
  participantsList: ParticipantType[]
) => {
  let existing = participantsList.find(
    (participant) => participant.user.phone === contact.phone
  )

  return existing !== undefined ? true : false
}

export const findConversation = (
  keyword: string,
  currentUser: UserType,
  conversationList: ConversationType[]
): ConversationType[] => {
  if (keyword === '') return []

  let foundConvers: ConversationType[] = []

  for (let iterator of conversationList) {
    let tmp: ConversationType | undefined = undefined

    if (iterator.type === ConversationTypeEnum.GROUP) {
      if (iterator.title.includes(keyword)) {
        tmp = iterator
      }
    } else {
      const teammate = getTeammateInSingleConversation(currentUser, iterator)

      if (teammate.user.fullName.includes(keyword)) {
        tmp = iterator
      }
    }

    if (tmp !== undefined) {
      const existing = foundConvers.find(
        (conver) => conver.id === (tmp as ConversationType).id
      )

      if (existing === undefined) foundConvers.push(tmp)
    }
  }

  return foundConvers
}

export const sortParticipantsByRole = (
  currentChat: ConversationType
): ParticipantType[] => {
  let sorted: ParticipantType[] = []

  for (let parti of currentChat.participantResponse) {
    if (parti.role !== ParticipantRoleEnum.ADMIN) {
      if (parti.role === ParticipantRoleEnum.MOD) {
        sorted.unshift(parti)
      } else sorted.push(parti)
    }
  }

  const uniqueAdmin = currentChat.participantResponse.find(
    (parti) => parti.role === ParticipantRoleEnum.ADMIN
  )

  if (uniqueAdmin !== undefined) sorted.unshift(uniqueAdmin)

  return sorted
}

export const findParticipants = (
  keyword: string,
  participants: ParticipantType[]
): ParticipantType[] => {
  if (participants.length === 0) return []

  let founds: ParticipantType[] = []

  for (let i of participants) {
    if (i.user.fullName.includes(keyword)) {
      const existing = founds.find((parti) => parti.id === i.id)

      if (existing === undefined) {
        founds.push(i)
      }
    }
  }

  return founds
}

export const getRoleOfParticipant = (
  user: UserType,
  participants: ParticipantType[]
): ParticipantRoleEnum => {
  let role: ParticipantRoleEnum = ParticipantRoleEnum.MEM

  let existingParti = participants.find((parti) => parti.user.id === user.id)

  if (existingParti !== undefined) role = existingParti.role

  return role
}

export const getParticipantsByRole = (
  role: ParticipantRoleEnum,
  participants: ParticipantType[]
): ParticipantType[] => {
  if (participants.length === 0) return []

  return participants.filter((parti) => parti.role === role)
}
