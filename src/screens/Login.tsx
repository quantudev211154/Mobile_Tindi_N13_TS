import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'
import LoginBgr from '../assets/images/login-bgr.jpg'
import LoginHeader from '../components/login/LoginHeader'
import LoginForm from '../components/login/LoginForm'
import LoginFooter from '../components/login/LoginFooter'

const Login = (props: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='relative w-full h-full flex flex-col flex-1'>
        <ImageBackground
          source={LoginBgr}
          resizeMode='cover'
          className='flex-1 h-full'
        />
        <View className='w-full min-h-[60%] bg-white flex-1 justify-center items-center px-[20] pt-[60] absolute bottom-0 left-0 rounded-tl-3xl rounded-tr-3xl'>
          <LoginHeader />
          <LoginForm navigation={props.navigation} />
          <LoginFooter navigation={props.navigation} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({})
