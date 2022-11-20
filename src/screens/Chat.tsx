import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChatHeader from '../components/chat/ChatHeader'
import ChatContent from '../components/chat/ChatContent'

export default function Chat() {
  return (
    <View>
        <ChatHeader />
        <ChatContent/>
    </View>
  )
}
