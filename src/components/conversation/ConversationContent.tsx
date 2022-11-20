import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { Avatar } from '@react-native-material/core'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-b1d96-145571e29d72",
      title: "Third Item",
    },
    {
        id: "58694a0f-3da1-4712f-bd96-145571e29d72",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-4731f-bd96-145571e29d72",
        title: "Third Item",
    }, 
  ];
  

export default function ConversationContent() {
  const navigation = useNavigation()

  const Item = ({item}) =>(
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <View style={styles.itemContact}>
            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
            <View style={{flexDirection:'column'}}>
                <Text style={styles.textName}>{item.title}</Text>
                <Text style={{marginLeft:5}}>2 3 con muc</Text>
            </View>
            <Text style={{margin:20, position:'absolute', left:320}}>21:23</Text>
        </View>
    </TouchableOpacity>
);
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
  return (
    <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    // extraData={selectedId}
    />
  )
}

const styles = StyleSheet.create({
    itemContact: {
        backgroundColor:'#BCECF3',
        margin: 5,
        borderRadius:30,
        flexDirection:'row'
    },
    textName:{
        fontSize:17,
        fontWeight:'bold',
        margin:10,
    }
  })
  
