import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ForgotPwd from '../screens/ForgotPwd'
import DrawerRoute from './DrawerRoute'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import Contacts from '../screens/Contacts'
import AddContact from '../screens/AddContact'
import Chat from '../screens/Chat'

type Props = {}


const RootStack = createNativeStackNavigator()

const MainRoute = (props: Props) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName='Main'
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name='Đăng nhập' component={Login} />
        <RootStack.Screen name='Đăng ký' component={Register} />
        <RootStack.Screen name='Quên mật khẩu' component={ForgotPwd} />
        <RootStack.Screen name='AddContact' component={AddContact} />
        <RootStack.Screen name='Chat' component={Chat} />
        <RootStack.Screen name='Main' component={DrawerRoute} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default MainRoute

const styles = StyleSheet.create({})
