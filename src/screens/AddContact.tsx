import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddContactHeader from '../components/addcontact/AddContactHeader'
import AddContactForm from '../components/addcontact/AddContactForm'
export default function AddContact() {
  return (
    <View>
        <AddContactHeader/>
        <AddContactForm/>
    </View>
  )
}
