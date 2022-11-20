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
import RegisterHeader from '../components/register/RegisterHeader'
import RegisterForm from '../components/register/RegisterForm'
import RegisterFooter from '../components/register/RegisterFooter'

type Props = {}

const Register = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className='relative w-full h-full flex flex-col'>
        <ImageBackground
          source={LoginBgr}
          resizeMode='cover'
          className='flex-1 h-full'
        />
        <View className='w-full h-[60%] bg-white flex-1 justify-center items-center px-[20] pt-[60] absolute bottom-0 left-0 rounded-tl-3xl rounded-tr-3xl'>
          <RegisterHeader />
          <RegisterForm/>
          <RegisterFooter/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({})
