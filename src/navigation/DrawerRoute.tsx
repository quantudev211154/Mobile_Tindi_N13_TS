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

type Props = {}

const Drawer = createDrawerNavigator()

const DrawerRoute = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName='Tindi'
      drawerContent={(props) => <DrawerContents {...props} />}
      screenOptions={{
        headerShown: true,
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
        name='Tindi'
        component={ConversationList}
        options={({ navigation }) => ({
          drawerItemStyle: {
            display: 'none',
          },
          title: 'Tin nhắn',
          drawerLabel: () => null,
          drawerIcon: () => null,
          headerLeft: () => (
            <IconButton icon='menu' onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => <IconButton icon='magnify' onPress={() => {}} />,
        })}
      />
      <Drawer.Screen
        name='Danh bạ'
        component={Contacts}
        options={({ navigation }) => ({
          title: 'Danh bạ',
          drawerIcon: () => <IconButton icon='contacts-outline' />,
          drawerLabel: 'Danh bạ',
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name='Tạo nhóm'
        component={NewGroup}
        options={({ navigation }) => ({
          title: 'Tạo nhóm',
          drawerIcon: () => <IconButton icon='account-group-outline' />,
          drawerLabel: 'Tạo nhóm',
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name='Cài đặt'
        component={Setting}
        options={({ navigation }) => ({
          title: 'Cài đặt',
          drawerIcon: () => <IconButton icon='cog-outline' />,
          drawerLabel: 'Cài đặt',
          headerLeft: () => (
            <IconButton
              icon='keyboard-backspace'
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
