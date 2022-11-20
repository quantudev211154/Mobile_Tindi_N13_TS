import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM } from '../constants/FontConstant'
import MyButton from '../components/core/MyButton'
import {
  DANG_NHAP,
  MAN_HINH_CHINH,
  TIN_NHAN,
} from '../constants/RoutesName.constant'

type Props = {
  navigation: any
}

const Logout = ({ navigation }: Props) => {
  return (
    <View className='flex-1 relative bg-gray-400'>
      <View className='w-full rounded-lg p-5 bg-white absolute bottom-0'>
        <Text
          style={{ fontFamily: BE_MEDIUM }}
          className='text-lg text-center mb-8'
        >
          Bạn chắc chắn muốn đăng xuất chứ?
        </Text>
        <View className='w-full flex flex-row justify-between items-center'>
          <MyButton
            title='Đăng xuất'
            onPress={() => {
              navigation.navigate(DANG_NHAP)
            }}
            classNameStyle='bg-pink-700 w-[48%] py-3 rounded-lg'
          />
          <MyButton
            title='Ở lại'
            onPress={() => {
              navigation.navigate(TIN_NHAN)
            }}
            classNameStyle='bg-blue-600 w-[48%] py-3 rounded-lg'
          />
        </View>
      </View>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})
