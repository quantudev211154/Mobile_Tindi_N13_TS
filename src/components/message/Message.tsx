import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import {
  AttachFileTypeEnum,
  MessageType,
  MessageTypeEnum,
} from '../../types/MessageTypes'
import { useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import { BE_REGULAR } from '../../constants/FontConstant'
import UserAvatar from '../core/UserAvatar'
import { conversationsControlState } from '../../redux/slice/ConversationSlice'
import { parseDateByHourAndMinutes } from '../../utils/DateUtils'
import DateDivider from './DateDivider'
import { findNextMessage, getTypeOfAttachment } from '../../utils/MessageUtils'
import { IconButton } from 'react-native-paper'

type Props = {
  message: MessageType
}

const Message = ({ message }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { messageList } = useAppSelector(conversationsControlState)
  const avatarRef = useRef<View>(null)

  const updateOpacityOfAvatar = () => {
    if (
      avatarRef.current &&
      findNextMessage(message, messageList)?.sender.id === message.sender.id
    ) {
      avatarRef.current.setNativeProps({
        style: {
          opacity: 0,
        },
      })
    }
  }

  useEffect(() => {
    updateOpacityOfAvatar()
  }, [messageList])

  return (
    <>
      <DateDivider item={message} />
      <View
        style={{
          display:
            currentUser &&
            !!message.participantDeleted.find(
              (parti) => parti.user.id === currentUser.id
            )
              ? 'none'
              : 'flex',
          justifyContent:
            currentUser && currentUser.id === message.sender.id
              ? 'flex-end'
              : 'flex-start',
        }}
        className='py-1 flex flex-row justify-end items-end'
      >
        {currentUser && currentUser.id !== message.sender.id ? (
          <View ref={avatarRef}>
            <UserAvatar
              name={message.sender.fullName}
              avatar={message.sender.avatar}
              size={25}
            />
          </View>
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
          {message.attachmentResponseList?.map((item) => {
            if (getTypeOfAttachment(item) === AttachFileTypeEnum.IMAGE) {
              return (
                <Image
                  className='w-28 h-28 object-cover rounded-md'
                  key={item.id}
                  source={{ uri: item.fileUrl }}
                />
              )
            } else {
              return (
                <View
                  key={item.id}
                  className={`flex flex-col justify-center items-center p-3 rounded-2xl bg-slate-500 cursor-pointer ${
                    message.message === '' &&
                    message.attachmentResponseList?.length === 1
                      ? 'pb-3'
                      : 'pb-2'
                  }`}
                >
                  <IconButton icon='file-outline' size={30} color='white' />
                  <Text
                    style={{ fontFamily: BE_REGULAR }}
                    className='text-gray-100 whitespace-pre-wrap overflow-hidden text-ellipsis break-all'
                  >
                    {item.thumbnail}
                  </Text>
                </View>
              )
            }
          })}
          {message.message !== '' ? <Text>{message.message}</Text> : <></>}
          <View className='absolute bottom-[0.05px] right-[2px]'>
            <Text style={{ fontFamily: BE_REGULAR, fontSize: 9 }}>
              {parseDateByHourAndMinutes(message.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default Message

const styles = StyleSheet.create({})
