import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper'
import { BE_REGULAR } from '../../constants/FontConstant'
import { conversationDetailActions } from '../../apis/ConversationDetail'
import { useAppDispatch, useAppSelector } from '../../redux/redux_hook'
import {
  AttachFileTypeEnum,
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
} from '../../types/MessageTypes'
import { conversationsControlState } from './../../redux/slice/ConversationSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../types/ConversationTypes'
import { authState } from '../../redux/slice/AuthSlice'
import { UserType } from '../../types/UserTypes'
import { getTeammateInSingleConversation } from '../../utils/ConversationUtils'
import { ParticipantType } from '../../types/ParticipantTypes'
import { MySocket } from '../../services/TindiSocket'

type Props = {}

const ChatFooter = (props: Props) => {
  const [textMessage, setTextMessage] = useState('')
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const { addNewMessageToCurrentChat } = conversationDetailActions
  const [files, setFiles] = useState<FileList | null>(null)
  const [attachFileType, setAttachFileType] = useState<
    AttachFileTypeEnum | undefined
  >(undefined)

  const onSendMsg = () => {
    if (textMessage !== '') {
      const message: MessageType = {
        id: new Date().getTime(),
        conversation: currentChat as ConversationType,
        createdAt: new Date().toISOString(),
        delete: false,
        revoke: false,
        message: textMessage,
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
      }

      let receiver: UserType[] = []

      if (currentChat?.type === ConversationTypeEnum.SINGLE) {
        receiver.push(
          getTeammateInSingleConversation(
            currentUser as UserType,
            currentChat as ConversationType
          ).user
        )
      } else {
        for (let iterator of currentChat?.participantResponse as ParticipantType[]) {
          receiver.push(iterator.user)
        }
      }

      MySocket.sendMessage({ message, to: receiver })

      dispatch(addNewMessageToCurrentChat(message))
      setTextMessage('')
    }
  }

  return (
    <View className='flex-initial flex flex-row bg-white justify-between items-center'>
      <TextInput
        multiline
        placeholder='Viết tin nhắn...'
        value={textMessage}
        onChangeText={(newText) => setTextMessage(newText)}
        style={{ fontFamily: BE_REGULAR }}
        className='flex-1 pl-3 bg-white text-[17px]'
      />
      <View
        style={{ display: textMessage === '' ? 'flex' : 'none' }}
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
        style={{ display: textMessage === '' ? 'none' : 'flex' }}
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
