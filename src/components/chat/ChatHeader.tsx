import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function ChatHeader() {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <IconButton
              icon='keyboard-backspace'
              onPress={() => {
                navigation.navigate('Main')
              }}
        />
        <View style={{alignItems:'center', justifyContent:'center', marginLeft:100}}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>Quan Tu</Text>
        </View>
        <View style={{alignItems:'center', justifyContent:'center', marginLeft:120}}>
            <TouchableOpacity>
                <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:50,
        flexDirection:'row',
        backgroundColor:'#BCECF3'
    }
})