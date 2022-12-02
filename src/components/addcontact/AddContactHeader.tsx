import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

export default function AddContactHeader() {
  return (
    <View style={styles.container}>
      <IconButton icon='keyboard-backspace' />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 100,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>New Contact</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 60,
        }}
      >
        <TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexDirection: 'row',
  },
})
