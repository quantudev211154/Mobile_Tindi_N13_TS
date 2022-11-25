import { ParticipantType } from '../../types/ParticipantTypes'
import UserAvatar from './UserAvatar'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { BASE_AVATAR, SMALL_AVATAR } from '../../constants/AvatarConstant'
import { BE_MEDIUM } from '../../constants/FontConstant'

type Props = {
  groupName: string
  groupAvatar: string
  participants: ParticipantType[]
  size?: number
}

const GroupAvatar = ({ groupName, groupAvatar, participants, size }: Props) => {
  if (!groupAvatar.startsWith('#'))
    return (
      <UserAvatar
        name={groupName}
        avatar={groupAvatar}
        size={size && size < BASE_AVATAR ? SMALL_AVATAR : BASE_AVATAR}
      />
    )

  if (participants.length === 2)
    return (
      <View className='relative flex flex-row flex-wrap justify-center items-center'>
        <UserAvatar
          name={participants[0].user.fullName}
          avatar={participants[0].user.avatar}
          size={size ? size : SMALL_AVATAR}
        />
        <UserAvatar
          name={participants[1].user.fullName}
          avatar={participants[1].user.avatar}
          size={size ? size : SMALL_AVATAR}
        />
      </View>
    )
  if (participants.length === 3)
    return (
      <View className='relative flex flex-col flex-wrap justify-center items-center'>
        <View className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[0].user.fullName}
            avatar={participants[0].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
          <UserAvatar
            name={participants[1].user.fullName}
            avatar={participants[1].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
        </View>
        <View className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[2].user.fullName}
            avatar={participants[2].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
        </View>
      </View>
    )

  if (participants.length === 4)
    return (
      <View className='relative flex flex-col flex-wrap justify-center items-center'>
        <View className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[0].user.fullName}
            avatar={participants[0].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
          <UserAvatar
            name={participants[1].user.fullName}
            avatar={participants[1].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
        </View>
        <View className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[2].user.fullName}
            avatar={participants[2].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
          <UserAvatar
            name={participants[3].user.fullName}
            avatar={participants[3].user.avatar}
            size={size ? size : SMALL_AVATAR}
          />
        </View>
      </View>
    )

  return (
    <View className='relative flex flex-col flex-wrap justify-center items-center'>
      <View className='flex flex-row justify-center items-center'>
        <UserAvatar
          name={participants[0].user.fullName}
          avatar={participants[0].user.avatar}
          size={size ? size : SMALL_AVATAR}
        />
        <UserAvatar
          name={participants[1].user.fullName}
          avatar={participants[1].user.avatar}
          size={size ? size : SMALL_AVATAR}
        />
      </View>
      <View className='flex flex-row justify-center items-center'>
        <UserAvatar
          name={participants[2].user.fullName}
          avatar={participants[2].user.avatar}
          size={size ? size : SMALL_AVATAR}
        />
        <View
          style={{
            width: size ? size : SMALL_AVATAR,
            height: size ? size : SMALL_AVATAR,
          }}
          className='relative rounded-full bg-cyan-600 cursor-pointer flex justify-center items-center'
        >
          <Text style={{ fontFamily: BE_MEDIUM }} className='text-white'>
            +{participants.length - 3}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default GroupAvatar
