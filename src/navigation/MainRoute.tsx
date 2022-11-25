import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../screens/Login'
import Register from '../screens/Register'
import ForgotPwd from '../screens/ForgotPwd'
import DrawerRoute from './DrawerRoute'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Contacts from '../screens/Contacts'
import AddContact from '../screens/AddContact'
import Chat from '../screens/Chat'
import {
  DANG_KY,
  DANG_NHAP,
  MAN_HINH_CHINH,
  QUEN_MAT_KHAU,
  THEM_DANH_BA,
} from '../constants/RoutesName.constant'

type Props = {}

const RootStack = createNativeStackNavigator()

const MainRoute = (props: Props) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={MAN_HINH_CHINH}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name={DANG_NHAP} component={Login} />
        <RootStack.Screen name={DANG_KY} component={Register} />
        <RootStack.Screen name={QUEN_MAT_KHAU} component={ForgotPwd} />
        <RootStack.Screen name={MAN_HINH_CHINH} component={DrawerRoute} />
        <RootStack.Screen name={THEM_DANH_BA} component={AddContact} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default MainRoute

const styles = StyleSheet.create({})
