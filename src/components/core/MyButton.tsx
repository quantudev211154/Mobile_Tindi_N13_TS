import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BE_SEMIBOLD } from '../../constants/FontConstant'
import { IconButton } from 'react-native-paper'

type Props = {
  icon?: string
  iconSize?: number
  title: string
  onPress: Function
  classNameStyle: string
  textColor?: string
}

const MyButton = ({
  icon,
  iconSize,
  title,
  onPress,
  classNameStyle,
  textColor,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
      }}
      style={{
        flexDirection: icon !== undefined ? 'row' : 'column',
      }}
      className={'justify-center items-center '.concat(' ', classNameStyle)}
    >
      {icon !== undefined ? (
        <IconButton size={iconSize} icon={icon} color='black' />
      ) : (
        <></>
      )}
      <Text
        style={{
          color: textColor !== undefined ? textColor : 'white',
          fontFamily: BE_SEMIBOLD,
          marginLeft: icon !== undefined ? 10 : 0,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({})
