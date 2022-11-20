import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConversationContent from '../components/conversation/ConversationContent'

type Props = {}

const ConversationList = (props: Props) => {
  return (
    <View>
      <ConversationContent/>
    </View>
  )
}

export default ConversationList

const styles = StyleSheet.create({})
