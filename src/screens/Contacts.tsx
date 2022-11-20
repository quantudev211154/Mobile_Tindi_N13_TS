import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ContactHeader from '../components/contact/ContactHeader'
import ContactContent from '../components/contact/ContactContent'
import { TextInput } from 'react-native-paper'

type Props = {}

const Contacts = (props: Props) => {
  return (
    <View className='flex-1'>
      <View>
        <TextInput
          mode='flat'
          autoFocus
          placeholder='Tìm kiếm liên hệ...'
          style={{ backgroundColor: 'white' }}
        />
      </View>
    </View>
  )
}

export default Contacts
