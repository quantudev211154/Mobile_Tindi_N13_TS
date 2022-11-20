import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { BE_BOLD, BE_MEDIUM, BE_SEMIBOLD } from '../../constants/FontConstant'
import { Avatar } from 'react-native-paper'

const DrawerContents = (props: any) => {
  return (
    <View className='flex-1'>
      <View className='h-44 px-8 pb-2 bg-[#517da2] flex flex-col justify-end'>
        <Avatar.Image
          size={70}
          source={{
            uri: 'https://cafefcdn.com/thumb_w/650/203337114487263232/2022/3/3/photo1646280815645-1646280816151764748403.jpg',
          }}
        />
        <View className='mt-2'>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='text-white text-lg'
          >
            Quan Tu
          </Text>
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='text-gray-200 text-[13px]'
          >
            0358.434.915
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
