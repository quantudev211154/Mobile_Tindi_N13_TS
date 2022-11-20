import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
export default function RegisterHeader() {
  return (
    <View className='mb-10'>
    <Text style={{ fontFamily: BE_MEDIUM }} className='text-3xl uppercase'>
      <Text className='text-slate-600'>Đăng kí với</Text>
      <Text className='text-blue-600'> Tindi</Text>
    </Text>
  </View>
  )
}
