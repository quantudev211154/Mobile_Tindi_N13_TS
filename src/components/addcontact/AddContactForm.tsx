import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from 'react-native-paper'
export default function AddContactForm() {
  return (
    <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            maxLength={10}
            label='Nhập số điện thoại'
            mode='outlined'
            // onChangeText={handleChange('phone')}
            // value={values.phone}
          />
        <TextInput
            style={styles.textInput}
            // keyboardType='numeric'
            maxLength={10}
            label='Nhập tên hiện thị'
            mode='outlined'
            // onChangeText={handleChange('phone')}
            // value={values.phone}
          />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        margin:20,
        flexDirection:'column'
    },
    textInput: {
        height: 55,
        width: '100%',
        color: 'red',
        fontFamily: BE_MEDIUM,
        marginBottom: 5,
        backgroundColor: 'white',
      },
})