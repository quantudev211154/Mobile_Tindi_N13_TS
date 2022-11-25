import { View } from 'react-native'
import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import { conversationsControlState } from '../../redux/slice/ConversationSlice'
import { useQuery } from '@tanstack/react-query'
import { loadMessages } from '../../apis/Message.api'
import Message from '../message/Message'
import { ScrollView } from 'react-native-gesture-handler'
import { conversationDetailActions } from '../../apis/ConversationDetail'
import { ActivityIndicator, Text } from 'react-native-paper'
import { BE_MEDIUM } from '../../constants/FontConstant'
import { conversationDetailState } from './../../apis/ConversationDetail'

type Props = {
  navigation: any
}

export default function ChatContent({ navigation }: Props) {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { messageList } = useAppSelector(conversationDetailState)
  const dispatch = useAppDispatch()
  const { setMessageList } = conversationDetailActions
  const scrollViewRef = useRef<ScrollView>(null)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [currentChat],
    queryFn: () => currentChat && loadMessages(currentChat.id),
  })

  if (isLoading) {
    return (
      <View className='flex-1 bg-gray-200 flex justify-center items-center'>
        <View>
          <ActivityIndicator size={'large'} animating={true} color='#517da2' />
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='italic text-md mt-3'
          >
            Đợi tí nhé...
          </Text>
        </View>
      </View>
    )
  }

  if (isSuccess && data) {
    if (messageList.length === 0) {
      dispatch(setMessageList(data.data))
    }
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current &&
          scrollViewRef.current.scrollToEnd({ animated: true })
      }}
      className='flex-1 px-2 bg-gray-200'
    >
      {messageList.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ScrollView>
  )
}
