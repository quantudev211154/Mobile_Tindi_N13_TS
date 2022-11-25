import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatContent from '../components/chat/ChatContent'
import ChatFooter from '../components/chat/ChatFooter'

type Props = {
  navigation: any
}

export default function Chat({ navigation }: Props) {
  return (
    <View className='flex-1'>
      <ChatContent navigation={navigation} />
      <ChatFooter />
    </View>
  )
}
