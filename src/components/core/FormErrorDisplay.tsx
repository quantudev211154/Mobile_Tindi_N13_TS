import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM } from '../../constants/FontConstant'

type Props = {
  msg: string | undefined
  className?: string
}

const FormErrorDisplay = ({ msg, className }: Props) => {
  return (
    <View
      style={{ display: msg ? 'flex' : 'none' }}
      className={className === undefined ? 'mb-2' : className}
    >
      <Text
        style={{ fontFamily: BE_MEDIUM }}
        className='text-[13px] text-red-600'
      >
        {msg}
      </Text>
    </View>
  )
}

export default FormErrorDisplay

const styles = StyleSheet.create({})
