import { useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import { View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { BE_MEDIUM } from '../../constants/FontConstant'
import { UserType } from '../../types/UserTypes'
import { formatUserFullname } from './../../utils/FormatUserInfo'

type Props = {
  name: string
  avatar: string
  size: number
}

const UserAvatar = ({ name, avatar, size }: Props) => {
  return (
    <View>
      {avatar && avatar.startsWith('#') ? (
        <Avatar.Text
          size={size}
          label={formatUserFullname(name)}
          color='white'
          labelStyle={{ fontFamily: BE_MEDIUM, fontSize: 30 }}
        />
      ) : (
        <Avatar.Image
          size={size}
          source={{
            uri: avatar,
          }}
        />
      )}
    </View>
  )
}

export default UserAvatar
