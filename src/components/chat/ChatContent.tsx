import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import LoginBgr from '../../assets/images/login-bgr.jpg';
import { GiftedChat } from 'react-native-gifted-chat'
export default function ChatContent() {
  
    const imgUrl = require('../../assets/images/login-bgr.jpg')
    const [messages, setMessages] = useState([]);

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  return (
    <View>
        <ImageBackground
          source={imgUrl}
          resizeMode='cover'
        //   className='flex-1 h-full'
            style={styles.image}
        >
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />

        </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:50,
        flexDirection:'row',
        backgroundColor:'#BCECF3',
        width:'100%',
        height:'100%'
    },
    image: {
        flex: 1,
        // justifyContent: "center",
        width:500,
        height:1000
    },

})