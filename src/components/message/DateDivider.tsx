import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MessageType } from '../../types/MessageTypes'
import { useAppSelector } from '../../redux/redux_hook'
import { conversationsControlState } from './../../redux/slice/ConversationSlice'
import { findPreviousMessage } from '../../utils/MessageUtils'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { compareDate, parseDateByDayMonthYear } from '../../utils/DateUtils'

type Props = {
  item: MessageType
}

const DateDivider = ({ item }: Props) => {
  const { messageList } = useAppSelector(conversationsControlState)

  if (messageList.length === 0) return <></>

  if (
    !findPreviousMessage(item, messageList) ||
    messageList.indexOf(item) === 0
  )
    return (
      <View className='w-full py-2 flex flex-row justify-center items-center'>
        <Text
          style={{ fontFamily: BE_REGULAR }}
          className='px-5 py-1 rounded-2xl text-[13px] bg-gray-400 text-white opacity-80'
        >
          {parseDateByDayMonthYear(item.createdAt)}
        </Text>
      </View>
    )

  return compareDate(
    findPreviousMessage(item, messageList)!.createdAt,
    item.createdAt
  ) ? (
    <></>
  ) : (
    <View className='relative w-full py-2 flex justify-center items-center'>
      <Text
        style={{ fontFamily: BE_MEDIUM }}
        className='px-5 py-1 rounded-2xl text-[13px] bg-gray-400 text-white opacity-80'
      >
        {parseDateByDayMonthYear(item.createdAt)}
      </Text>
    </View>
  )
}

export default DateDivider
