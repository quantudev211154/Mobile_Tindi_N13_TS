import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'

type Props = {}

const LoginHeader = (props: Props) => {
  return (
    <View className='mb-10'>
      <Text style={{ fontFamily: BE_MEDIUM }} className='text-3xl uppercase'>
        <Text className='text-slate-600'>Đăng nhập với</Text>
        <Text className='text-blue-600'> Tindi</Text>
      </Text>
    </View>
  )
}

export default LoginHeader

const styles = StyleSheet.create({})
