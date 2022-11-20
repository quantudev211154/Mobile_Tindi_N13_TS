import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import ChatContent from '../components/chat/ChatContent'

type Props = {
  navigation: any
}

export default function Chat({ navigation }: Props) {
  return (
    <View className='flex-1'>
      <ChatContent navigation={navigation} />
    </View>
  )
}
