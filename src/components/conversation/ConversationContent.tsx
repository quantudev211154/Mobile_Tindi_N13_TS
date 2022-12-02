import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  BE_MEDIUM,
  BE_REGULAR,
  BE_SEMIBOLD,
} from '../../constants/FontConstant'
import { ActivityIndicator } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { DANH_SACH_TIN_NHAN } from '../../constants/RoutesName.constant'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import { conversationActions } from '../../redux/slice/ConversationSlice'
import UserAvatar from '../core/UserAvatar'
import { getTeammateInSingleConversation } from '../../utils/ConversationUtils'
import GroupAvatar from '../core/GroupAvatar'
import { BASE_AVATAR } from '../../constants/AvatarConstant'
import { MySocket } from '../../services/TindiSocket'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../../constants/SocketConstant'
import { conversationsControlState } from './../../redux/slice/ConversationSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../types/ConversationTypes'
import {
  loadConversations,
  deleteConversation as deleteConversationThunk,
} from '../../redux/thunks/ConversationThunk'
import { ParticipantRoleEnum } from '../../types/ParticipantTypes'
import { loadMessageOfConversation } from '../../redux/thunks/MessageThunk'
import { MessageTypeEnum } from '../../types/MessageTypes'

type Props = {
  navigation: any
}

export default function ConversationContent({ navigation }: Props) {
  const { currentUser } = useAppSelector(authState)
  const { currentChat, isLoadingChatList, conversationList } = useAppSelector(
    conversationsControlState
  )
  const dispatch = useAppDispatch()
  const {
    changeCurrentChat,
    addNewConversation,
    addMoreMembersToConversation,
    changeRoleOfParticipant,
    changeConversationInfo,
    revokeMessage,
    updateMessageBySocketFlag,
    addNewMessageToCurrentChat,
    deleteConversation,
    updateStatusForParticipant,
    clearMessageList,
  } = conversationActions

  useEffect(() => {
    if (currentUser) dispatch(loadConversations(currentUser.id))
  }, [currentUser])

  useEffect(() => {
    initSocketAction()
  }, [currentChat])

  const initSocketAction = () => {
    MySocket.getTindiSocket()?.on(
      SocketEventEnum.RECEIVE_MSG,
      (data: SendMessageWithSocketPayload) => {
        dispatch(addNewMessageToCurrentChat(data.message))
      }
    )

    MySocket.getTindiSocket()?.on(SocketEventEnum.REVOKE_MSG, (data: any) => {
      dispatch(revokeMessage(data.message))
    })

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_MSG,
      (data: SendMessageWithSocketPayload) => {
        dispatch(updateMessageBySocketFlag(data.message))
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_MEMBERS,
      (data: any) => {
        dispatch(
          addMoreMembersToConversation([data.conversation, data.participants])
        )
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVERLIST_AFTER_CREATE,
      (data: any) => {
        dispatch(addNewConversation(data.newConver))
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVERLIST_AFTER_DELETE,
      (data: any) => {
        dispatch(deleteConversation(data.conversation))
        dispatch(deleteConversationThunk(data.conversation.id))

        const deleteConverAdmin = (
          data.conversation as ConversationType
        ).participantResponse.find(
          (parti) => parti.role === ParticipantRoleEnum.ADMIN
        )
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_STATUS_FOR_PARTICIPANT,
      (data: any) => {
        dispatch(
          updateStatusForParticipant([data.conversation, data.to, data.status])
        )
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVERLIST_AFTER_CHANGE_ROLE,
      (data: any) => {
        dispatch(
          changeRoleOfParticipant([
            data.conversation,
            data.participant,
            data.role,
          ])
        )
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVER_AFTER_CHANGE_INFO,
      (data: any) => {
        dispatch(
          changeConversationInfo([
            data.conversation,
            data.avatar,
            data.groupName,
          ])
        )
      }
    )
  }

  if (isLoadingChatList)
    return (
      <View className='flex-1 justify-center items-center'>
        <View>
          <ActivityIndicator size={'large'} animating={true} color='#517da2' />
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='italic text-md mt-3'
          >
            Đang tải tin nhắn của {currentUser && currentUser.fullName}
          </Text>
        </View>
      </View>
    )

  return (
    <ScrollView className='flex-1 flex flex-col'>
      {conversationList.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            dispatch(clearMessageList())
            dispatch(changeCurrentChat(item))
            dispatch(loadMessageOfConversation(item.id))
            navigation.navigate(DANH_SACH_TIN_NHAN)
          }}
          className='w-full px-2 py-1 h-[73px]'
        >
          <View className='w-full h-full flex flex-row justify-start items-center'>
            {currentUser && item.type === ConversationTypeEnum.SINGLE ? (
              <UserAvatar
                name={
                  getTeammateInSingleConversation(currentUser, item).user
                    .fullName
                }
                avatar={
                  getTeammateInSingleConversation(currentUser, item).user.avatar
                }
                size={BASE_AVATAR}
              />
            ) : (
              <GroupAvatar
                groupName={item.title}
                groupAvatar={item.avatar}
                participants={item.participantResponse}
              />
            )}
            <View className='flex-1 flex flex-col justify-between py-1 h-full border-b-[0.2px] border-gray-400 ml-3'>
              <Text style={{ fontFamily: BE_SEMIBOLD }} className='text-[16px]'>
                {item.title}
              </Text>
              <View className='flex flex-row justify-start items-center'>
                <Text
                  style={{ fontFamily: BE_REGULAR }}
                  className='text-gray-500'
                >
                  {item.messageLatest?.sender.id === currentUser?.id
                    ? 'Bạn: '
                    : `${item.messageLatest?.sender.fullName}: `}
                </Text>
                <Text
                  style={{ fontFamily: BE_REGULAR }}
                  className='text-gray-500'
                >
                  {item.messageLatest
                    ? item.messageLatest.type === MessageTypeEnum.TEXT
                      ? item.messageLatest.message
                      : item.messageLatest.type === MessageTypeEnum.IMAGE
                      ? 'Ảnh'
                      : 'File'
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
