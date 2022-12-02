import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { IconButton } from 'react-native-paper'
import { BE_REGULAR } from '../../constants/FontConstant'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import {
  AttachFileTypeEnum,
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
} from '../../types/MessageTypes'
import {
  conversationActions,
  conversationsControlState,
} from './../../redux/slice/ConversationSlice'
import { authState } from '../../redux/slice/AuthSlice'
import { UserType } from '../../types/UserTypes'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../../types/ParticipantTypes'
import { MySocket } from '../../services/TindiSocket'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../types/ConversationTypes'
import { saveMessage } from '../../redux/thunks/MessageThunk'

type Props = {}

const ChatFooter = (props: Props) => {
  const [msg, setMsg] = useState('')

  const { currentChat, replyingMessage } = useAppSelector(
    conversationsControlState
  )
  const { currentUser } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const [files, setFiles] = useState<FileList | null>(null)
  const [attachFileType, setAttachFileType] = useState<
    AttachFileTypeEnum | undefined
  >(undefined)
  const { addNewMessageToCurrentChat } = conversationActions
  const [status, setStatus] = useState(ParticipantStatusEnum.STABLE)

  useEffect(() => {
    if (currentChat && currentUser) {
      let currentParti = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (currentParti !== undefined) setStatus(currentParti.status)
    }
  }, [currentChat])

  const onSendMsg = (caption?: string) => {
    if (currentChat && (files || msg !== '')) {
      const message: MessageType = {
        id: new Date().getTime(),
        conversation: currentChat as ConversationType,
        createdAt: new Date().toISOString(),
        delete: false,
        message: caption !== undefined ? caption : msg,
        sender: currentUser as UserType,
        status: MessageStatusEnum.SENT,
        type: files
          ? attachFileType === AttachFileTypeEnum.IMAGE
            ? MessageTypeEnum.IMAGE
            : MessageTypeEnum.FILE
          : MessageTypeEnum.TEXT,
        attachmentResponseList: null,
        socketFlag: new Date().getTime().toString(),
        isLoading: files ? true : undefined,
        replyTo: replyingMessage,
        participantDeleted: [],
      }

      const receiver: UserType[] = currentChat.participantResponse.map(
        (parti) => parti.user
      )

      MySocket.sendMessage({
        message,
        to: receiver,
      })

      dispatch(addNewMessageToCurrentChat(message))

      const formData = new FormData()
      formData.append('conversationId', message.conversation.id.toString())
      formData.append('senderId', message.sender.id.toString())
      formData.append('messageType', message.type.toString())
      formData.append('message', message.message)

      if (replyingMessage) {
        formData.append('replyTo', replyingMessage.id as string)
      }

      // if (files) {
      //   for (const iterator of files) formData.append('file', iterator)
      // }

      dispatch(
        saveMessage({
          formData,
          socketFlag: message.socketFlag as string,
          to: receiver,
        })
      )

      setMsg('')

      // dispatch(setReplyingMessage(null))

      setFiles(null)
    }
  }

  return (
    <View className='flex-initial flex flex-row bg-white justify-between items-center'>
      <TextInput
        multiline
        placeholder='Viết tin nhắn...'
        value={msg}
        onChangeText={(newText) => setMsg(newText)}
        style={{ fontFamily: BE_REGULAR }}
        className='flex-1 pl-3 bg-white text-[17px]'
      />
      <View
        style={{ display: msg === '' ? 'flex' : 'none' }}
        className='flex-initial flex flex-row justify-end items-center'
      >
        <IconButton
          icon='file-image-outline'
          size={30}
          color='#363738'
          onPress={() => {}}
        />
        <IconButton
          icon='attachment'
          size={30}
          color='#363738'
          onPress={() => {}}
        />
      </View>
      <View
        style={{ display: msg === '' ? 'none' : 'flex' }}
        className='flex-initial'
      >
        <IconButton
          icon='send'
          size={30}
          color='#2383cc'
          onPress={() => {
            onSendMsg()
          }}
        />
      </View>
    </View>
  )
}

export default ChatFooter

const styles = StyleSheet.create({})
