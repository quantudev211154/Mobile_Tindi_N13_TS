import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_REGULAR, BE_SEMIBOLD } from '../../constants/FontConstant'

export default function RegisterFooter(props: any) {
  return (
    <View className='w-full mt-2 mb-2'>
      <Text style={{ fontFamily: BE_REGULAR }} className='text-center'>
        Bạn đã có tài khoản Tindi?{' '}
      </Text>
      <Text
        style={{ fontFamily: BE_SEMIBOLD }}
        className='text-blue-700 text-center'
        onPress={() => {
          props.navigation.push('Đăng nhập')
        }}
      >
        Đăng nhập thôi!
      </Text>
    </View>
  )
}
