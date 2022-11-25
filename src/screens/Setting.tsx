import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SettingContent from '../components/setting/SettingContent'
import { Avatar } from 'react-native-paper'
import { BE_MEDIUM } from '../constants/FontConstant'
import * as ImagePicker from 'expo-image-picker'
import MyButton from '../components/core/MyButton'
import { useAppSelector } from '../redux/redux_hook'
import { authState } from '../redux/slice/AuthSlice'
import { UserType } from '../types/UserTypes'
import UserAvatar from '../components/core/UserAvatar'
import { formatPhoneNumber } from '../utils/FormatUserInfo'

type Props = {}

const Setting = (props: Props) => {
  const { currentUser } = useAppSelector(authState)
  const [selectedImage, setSelectedImage] = useState('')

  const changeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    })

    if (!result.cancelled) {
      setSelectedImage(result.uri)
    } else {
      console.log('User outted image picker')
    }
  }

  return (
    <View className='flex-1 bg-gray-200'>
      <View className='w-full px-4 flex flex-row justify-start items-center py-5 bg-[#517da2]'>
        {currentUser && (
          <UserAvatar name={currentUser.fullName} avatar={currentUser.avatar} />
        )}
        <View className='flex flex-col justify-center items-start ml-5'>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='mr-2 text-xl text-white'
          >
            {currentUser && currentUser?.fullName}
          </Text>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='mr-2 text-sm text-white'
          >
            {currentUser && formatPhoneNumber(currentUser.phone)}
          </Text>
        </View>
      </View>
      <View className='w-full'>
        <MyButton
          icon='file-image-plus-outline'
          iconSize={30}
          onPress={() => {
            changeAvatar()
          }}
          classNameStyle='w-full py-1 bg-white text-black justify-start'
          title='Đổi ảnh đại diện'
          textColor='black'
        />
      </View>
      <View className='w-full flex flex-col justify-start items-start bg-white mt-2 px-4 py-2'>
        <Text
          style={{ fontFamily: BE_MEDIUM }}
          className='text-[#517da2] text-[15px]'
        >
          Cài đặt
        </Text>
        <MyButton
          icon='key-outline'
          iconSize={23}
          onPress={() => {
            changeAvatar()
          }}
          classNameStyle='w-full py-1 bg-white text-black justify-start'
          title='Đổi mật khẩu'
          textColor='black'
        />
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({})
