import { ConversationType } from './ConversationTypes'
import { ParticipantType } from './ParticipantTypes'
import { UserType } from './UserTypes'

export enum MessageTypeEnum {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'VIDEO',
  FILE = 'FILE',
}

export enum MessageStatusEnum {
  SENDING = 'SENDING',
  SENT = 'SENT',
  SEEN = 'SEEN',
}

export enum AttachFileTypeEnum {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
}

export type AttachmentType = {
  id: number
  thumbnail: string
  fileUrl: string
  createdAt: string
  updateAt: string | null
  fileName: string
}

export type MessageType = {
  id: number | string
  conversation: ConversationType
  sender: UserType
  type: MessageTypeEnum
  message: string
  createdAt: string
  status: MessageStatusEnum
  delete: boolean
  participantDeleted: ParticipantType[]
  attachmentResponseList: AttachmentType[] | null
  replyTo: MessageType | null
  socketFlag?: string
  isLoading?: boolean
}

export type DeletedMessageType = {
  messageId: number
  participantId: number
  createdAt: string
}

export type LoadMessagesThunkReturnType = {
  converId: number
  data: MessageType[]
}

export type SaveMessagePayload = {
  formData: FormData
  socketFlag: string
  to: UserType[]
}

export type SaveMessageFullfilled = {
  message: MessageType
}

export type ForwardMessagePayloadType = {
  sender: UserType
  messageType: MessageTypeEnum
  message: string
  attachments: AttachmentType[] | null
  converId: number
}
