import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton, TextInput } from 'react-native-paper'

type Props = {}

const NewGroup = (props: Props) => {
  return (
    <View className='w-full flex-1 relative'>
      <View>
        <TextInput
          mode='flat'
          placeholder='Bạn muốn thêm ai vào nhóm mới'
          style={{ backgroundColor: 'white' }}
        />
      </View>
      <View className='absolute right-4 bottom-4'>
        <IconButton
          size={35}
          icon='arrow-right'
          color='white'
          onPress={() => {}}
          style={{ backgroundColor: '#517da2' }}
        />
      </View>
    </View>
  )
}

export default NewGroup

const styles = StyleSheet.create({})
