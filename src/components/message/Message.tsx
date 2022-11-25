import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MessageType, MessageTypeEnum } from '../../types/MessageTypes'
import { useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import { BE_REGULAR } from '../../constants/FontConstant'
import { parseDate } from '../../utils/ParseDate'
import UserAvatar from '../core/UserAvatar'
import { conversationDetailState } from './../../apis/ConversationDetail'

type Props = {
  message: MessageType
}

const Message = ({ message }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { messageList } = useAppSelector(conversationDetailState)
  const [showAvatar, setShowAvatar] = useState(true)

  useEffect(() => {
    const nextMessage = messageList.find(
      (msg) => msg.id > message.id && msg.delete === false
    )

    if (
      nextMessage !== undefined &&
      nextMessage.sender.id === message.sender.id
    ) {
      setShowAvatar(false)
    } else {
      setShowAvatar(true)
    }
  }, [messageList])

  return (
    <View
      style={{
        justifyContent:
          currentUser && currentUser.id === message.sender.id
            ? 'flex-end'
            : 'flex-start',
      }}
      className='py-1 flex flex-row justify-end items-end'
    >
      {currentUser && showAvatar && currentUser.id !== message.sender.id ? (
        <UserAvatar
          name={message.sender.fullName}
          avatar={message.sender.avatar}
          size={25}
        />
      ) : (
        <View style={{ width: 25 }}></View>
      )}
      <View
        style={{
          backgroundColor:
            currentUser && currentUser.id === message.sender.id
              ? '#eeffde'
              : 'white',
          marginLeft:
            currentUser && currentUser.id !== message.sender.id ? 2 : 0,
        }}
        className='w-fix min-w-[20%] max-w-[80%] rounded-md p-2 pb-3 relative'
      >
        {message.type === MessageTypeEnum.TEXT ? (
          <Text>{message.message}</Text>
        ) : (
          <></>
        )}
        {message.type === MessageTypeEnum.IMAGE ? (
          message.attachmentResponseList?.map((item) => (
            <Image key={item.id} source={{ uri: item.fileUrl }} />
          ))
        ) : (
          <></>
        )}
        <View className='absolute bottom-[0.05px] right-[2px]'>
          <Text style={{ fontFamily: BE_REGULAR, fontSize: 9 }}>
            {parseDate(message.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({})
