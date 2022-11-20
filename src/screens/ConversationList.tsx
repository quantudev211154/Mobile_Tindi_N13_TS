import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConversationContent from '../components/conversation/ConversationContent'

type Props = {
  navigation: any
}

const ConversationList = ({ navigation }: Props) => {
  return (
    <View className='bg-white flex-1'>
      <ConversationContent navigation={navigation} />
    </View>
  )
}

export default ConversationList

const styles = StyleSheet.create({})
