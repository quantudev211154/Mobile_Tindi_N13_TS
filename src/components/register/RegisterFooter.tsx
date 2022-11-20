import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_REGULAR, BE_SEMIBOLD } from '../../constants/FontConstant'

export default function RegisterFooter() {
    return (
        <View className='w-full mt-2'>
          <Text className='text-center' style={{ fontFamily: BE_REGULAR }}>
            <Text>Bạn đã có tài khoản Tindi? </Text>
            <Text
              style={{ fontFamily: BE_SEMIBOLD }}
              className='text-pink-700'
            //   onPress={() => {
            //     props.navigation.push('Đăng ký')
            //   }}
            >
              Đăng nhập ngay nào?
            </Text>
          </Text>
        </View>
      )
}
