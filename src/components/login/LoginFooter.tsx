import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_REGULAR, BE_SEMIBOLD } from '../../constants/FontConstant'

const LoginFooter = (props: any) => {
  return (
    <View className='w-full mt-2 mb-2'>
      <Text
        style={{ fontFamily: BE_SEMIBOLD }}
        className='text-center text-slate-700'
      >
        Bạn chưa có tài khoản Tindi?{' '}
      </Text>
      <Text
        style={{ fontFamily: BE_SEMIBOLD }}
        className='text-pink-700 text-center'
        onPress={() => {
          props.navigation.push('Đăng ký')
        }}
      >
        Đăng ký ngay nào?
      </Text>
    </View>
  )
}

export default LoginFooter

const styles = StyleSheet.create({})
