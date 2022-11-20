import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function AddContactHeader() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <IconButton
              icon='keyboard-backspace'
              onPress={() => {
                navigation.navigate('Danh bạ')
              }}
        />
        <View style={{alignItems:'center', justifyContent:'center', marginLeft:100}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>New Contact</Text>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginLeft:60}}>
            <TouchableOpacity>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Create</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        marginTop:50,
        flexDirection:'row'
    }
})