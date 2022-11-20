import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

export default function SettingContent() {
  return (
    <View style={styles.container}>
        <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} size={100} />
        <Text style={{fontSize:40}}>Quan Tu</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.phoneNumberText}>+84 091231231</Text>
            <Text style={styles.phoneNumberText}>@quantu2001</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:30,
        flexDirection:'column',
        backgroundColor:'#BCECF3',
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    avatar: {
        
    },
    phoneNumberText:{
        fontSize:15,
        margin:10
    }
})