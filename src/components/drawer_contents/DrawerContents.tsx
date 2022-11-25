import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { BE_MEDIUM } from '../../constants/FontConstant'
import { useAppSelector } from '../../redux/redux_hook'
import { authState } from '../../redux/slice/AuthSlice'
import UserAvatar from '../core/UserAvatar'
import { formatPhoneNumber } from '../../utils/FormatUserInfo'
import { BASE_AVATAR } from '../../constants/AvatarConstant'

const DrawerContents = (props: any) => {
  const { currentUser } = useAppSelector(authState)

  return (
    <View className='flex-1'>
      <View className='h-44 px-8 pb-2 bg-[#517da2] flex flex-col justify-end'>
        {currentUser && (
          <UserAvatar
            size={BASE_AVATAR}
            name={currentUser.fullName}
            avatar={currentUser.avatar}
          />
        )}

        <View className='mt-2'>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='text-white text-lg'
          >
            {currentUser && currentUser.fullName}
          </Text>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='text-gray-200 text-[13px]'
          >
            {currentUser && formatPhoneNumber(currentUser.phone)}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View className='-mt-8'>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default DrawerContents

const styles = StyleSheet.create({})
