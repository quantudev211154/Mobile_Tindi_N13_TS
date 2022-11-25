import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  BE_MEDIUM,
  BE_REGULAR,
  BE_SEMIBOLD,
} from '../../constants/FontConstant'
import { ActivityIndicator, Avatar, TextInput } from 'react-native-paper'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { DANH_SACH_TIN_NHAN } from '../../constants/RoutesName.constant'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import { useQuery } from '@tanstack/react-query'
import { loadConversationsListByCurrentUserId } from '../../apis/Conversation.api'
import { conversationActions } from '../../redux/slice/ConversationSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../types/ConversationTypes'
import UserAvatar from '../core/UserAvatar'
import { getTeammateInSingleConversation } from '../../utils/ConversationUtils'
import GroupAvatar from '../core/GroupAvatar'
import { BASE_AVATAR } from '../../constants/AvatarConstant'
import { conversationDetailActions } from '../../apis/ConversationDetail'
import { MySocket } from '../../services/TindiSocket'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../../constants/SocketConstant'
import { conversationsControlState } from './../../redux/slice/ConversationSlice'

type Props = {
  navigation: any
}

export default function ConversationContent({ navigation }: Props) {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const dispatch = useAppDispatch()
  const { loadConversation, changeCurrentChat } = conversationActions
  const { addNewMessageToCurrentChat } = conversationDetailActions

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['loadConvers', currentUser],
    queryFn: () =>
      currentUser && loadConversationsListByCurrentUserId(currentUser.id),
  })

  if (isSuccess && data) dispatch(loadConversation(data.data))

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
  }

  if (isLoading)
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
      {data?.data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            dispatch(changeCurrentChat(item))
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
              <Text
                style={{ fontFamily: BE_REGULAR }}
                className='text-gray-500'
              >
                {item.messageLatest ? item.messageLatest.message : ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
