import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BE_MEDIUM, BE_REGULAR } from '../../constants/FontConstant'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function ContactHeader() {
  return (
    <View>
      <View style={styles.container}>
      </View>
      <View style={{alignContent:'center'}}>
        <TextInput
          style={styles.textInput}
          label='Search'
          mode='outlined'
          secureTextEntry={true}
          // onChangeText={handleChange('pwd')}
          // value={values.pwd}
        />
      </View>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container:{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:50},
  textInput: {
    height: 50,
    width: '95%',
    color: 'red',
    fontFamily: BE_MEDIUM,
    margin: 10,
    backgroundColor: 'white',
  },
})
