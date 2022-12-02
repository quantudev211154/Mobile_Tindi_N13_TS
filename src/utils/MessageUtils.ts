import {
  AttachFileTypeEnum,
  AttachmentType,
  MessageType,
} from '../types/MessageTypes'

export const findMessage = (
  keyword: string,
  messageList: MessageType[]
): MessageType[] => {
  if (keyword === '') return []

  const found: MessageType[] = []

  for (let message of messageList) {
    if (message.message.includes(keyword)) found.push(message)
  }

  return found
}

export const findNextMessage = (
  currentMessage: MessageType,
  messageList: MessageType[]
): MessageType | undefined => {
  return messageList.find(
    (message) => message.id > currentMessage.id && !message.delete
  )
}

export const findPreviousMessage = (
  currentMessage: MessageType,
  messageList: MessageType[]
): MessageType | undefined => {
  let result: MessageType | undefined = undefined

  for (let i = 0; i < messageList.length; ++i) {
    if (messageList[i].id === currentMessage.id) {
      return result
    }

    result = messageList[i]
  }

  return undefined
}

export const getTypeOfAttachment = (
  attachment: AttachmentType
): AttachFileTypeEnum => {
  const fileName = attachment.thumbnail
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i

  if (imageRegex.test(fileName)) return AttachFileTypeEnum.IMAGE
  return AttachFileTypeEnum.FILE
}
