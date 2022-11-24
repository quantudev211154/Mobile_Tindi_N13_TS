import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ConversationList from '../screens/ConversationList'
import Contacts from '../screens/Contacts'
import NewGroup from '../screens/NewGroup'
import Setting from '../screens/Setting'
import DrawerContents from '../components/drawer_contents/DrawerContents'
import { BE_MEDIUM } from '../constants/FontConstant'
import { IconButton } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Chat from '../screens/Chat'
import {
  CAI_DAT,
  DANG_XUAT,
  DANH_BA,
  DANH_SACH_TIN_NHAN,
  TAO_NHOM,
  TIN_NHAN,
  THEM_DANH_BA
} from '../constants/RoutesName.constant'
import Logout from '../screens/Logout'

type Props = {}

const Drawer = createDrawerNavigator()

const DrawerRoute = (props: any) => {
  const name = 'Current Chat'

  return (
    <Drawer.Navigator
      initialRouteName={TIN_NHAN}
      drawerContent={(props) => <DrawerContents {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#517da2',
        },
        headerTitleStyle: {
          color: 'white',
        },
        drawerLabel: '',
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 17,
          fontFamily: BE_MEDIUM,
          color: 'black',
        },
      }}
    >
      <Drawer.Screen
        name={TIN_NHAN}
        component={ConversationList}
        options={({ navigation }) => ({
          drawerItemStyle: {
            display: 'none',
          },
          title: TIN_NHAN,
          drawerLabel: () => null,
          drawerIcon: () => null,
          headerLeft: () => (
            <IconButton
              icon='menu'
              color='white'
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <IconButton icon='magnify' color='white' onPress={() => {}} />
          ),
        })}
      />
      <Drawer.Screen
        name={DANH_SACH_TIN_NHAN}
        component={Chat}
        options={({ navigation }) => ({
          drawerItemStyle: {
            display: 'none',
          },
          title: DANH_SACH_TIN_NHAN,
          drawerLabel: () => null,
          drawerIcon: () => null,
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              color='white'
              onPress={() => navigation.goBack()}
            />
          ),
          // headerRight: () => <IconButton icon='magnify' onPress={() => {}} />,
        })}
      />
      <Drawer.Screen
        name={DANH_BA}
        component={Contacts}
        options={({ navigation }) => ({
          title: DANH_BA,
          drawerIcon: () => <IconButton icon='contacts-outline' />,
          drawerLabel: DANH_BA,
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              color='white'
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.push(THEM_DANH_BA)}
              style={{ marginRight: 20 }}
            >
              <AntDesign name='plus' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={TAO_NHOM}
        component={NewGroup}
        options={({ navigation }) => ({
          title: TAO_NHOM,
          drawerIcon: () => <IconButton icon='account-group-outline' />,
          drawerLabel: TAO_NHOM,
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              color='white'
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={CAI_DAT}
        component={Setting}
        options={({ navigation }) => ({
          title: CAI_DAT,
          drawerIcon: () => <IconButton icon='cog-outline' />,
          drawerLabel: CAI_DAT,
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              color='white'
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={DANG_XUAT}
        component={Logout}
        options={({ navigation }) => ({
          title: DANG_XUAT,
          drawerIcon: () => <IconButton icon='logout-variant' />,
          drawerLabel: DANG_XUAT,
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              color='white'
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  )
}

export default DrawerRoute

const styles = StyleSheet.create({})
