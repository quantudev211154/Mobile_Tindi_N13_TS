import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BE_SEMIBOLD } from '../../constants/FontConstant'

type Props = {
  title: string
  onPress: Function
  classNameStyle: string
}

const MyButton = ({ title, onPress, classNameStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
      }}
      className={'justify-center items-center '.concat(' ', classNameStyle)}
    >
      <Text
        style={{
          color: 'white',
          fontFamily: BE_SEMIBOLD,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({})
