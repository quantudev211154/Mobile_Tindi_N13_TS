import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContactHeader from '../components/contact/ContactHeader'
import ContactContent from '../components/contact/ContactContent'

type Props = {}

const Contacts = (props: Props) => {
  return (
    <View>
      <ContactHeader/>
      <ContactContent/>
    </View>
  )
}

export default Contacts

const styles = StyleSheet.create({})
