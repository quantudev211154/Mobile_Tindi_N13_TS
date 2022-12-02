import { View } from 'react-native'
import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import { conversationsControlState } from '../../redux/slice/ConversationSlice'
import Message from '../message/Message'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator, Text } from 'react-native-paper'
import { BE_MEDIUM } from '../../constants/FontConstant'

type Props = {
  navigation: any
}

export default function ChatContent({ navigation }: Props) {
  const { currentChat, messageList, isLoadingMessageList } = useAppSelector(
    conversationsControlState
  )
  const dispatch = useAppDispatch()
  const scrollViewRef = useRef<ScrollView>(null)

  if (isLoadingMessageList) {
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
