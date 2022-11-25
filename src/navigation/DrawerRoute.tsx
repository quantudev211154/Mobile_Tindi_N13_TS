import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ConversationList from '../screens/ConversationList'
import Contacts from '../screens/Contacts'
import NewGroup from '../screens/NewGroup'
import Setting from '../screens/Setting'
import DrawerContents from '../components/drawer_contents/DrawerContents'
import { BE_MEDIUM } from '../constants/FontConstant'
import { ActivityIndicator, IconButton } from 'react-native-paper'
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
  THEM_DANH_BA,
  DANG_NHAP,
} from '../constants/RoutesName.constant'
import Logout from '../screens/Logout'
import { useAppDispatch, useAppSelector } from '../redux/redux_hook'
import { authActions, authState } from '../redux/slice/AuthSlice'
import { CheckAuthPayload } from '../types/AuthTypes'
import { JWT } from '../utils/JWT'
import { checkAuth } from '../redux/thunks/AuthThunk'
import {
  conversationActions,
  conversationsControlState,
} from '../redux/slice/ConversationSlice'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { loadConversationsListByCurrentUserId } from '../apis/Conversation.api'
import { ConversationTypeEnum } from '../types/ConversationTypes'
import { getTeammateInSingleConversation } from '../utils/ConversationUtils'
import GroupAvatar from '../components/core/GroupAvatar'
import UserAvatar from '../components/core/UserAvatar'
import { ParticipantType } from '../types/ParticipantTypes'

type Props = {}

type InfoOfCurrentChatType = {
  title: string
  avatar: JSX.Element
}

const Drawer = createDrawerNavigator()

const DrawerRoute = (props: any) => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)
  const { isAuthLoading, isAuth } = useAppSelector(authState)
  const { reloadCurrentUser } = authActions
  const dispatch = useAppDispatch()
  const [infoOfCurrentChat, setInfoForCurrentChat] =
    useState<InfoOfCurrentChatType>({
      title: '',
      avatar: <></>,
    })

  useEffect(() => {
    if (currentChat && currentUser) {
      if (currentChat.type === ConversationTypeEnum.GROUP) {
        setInfoForCurrentChat({
          title: currentChat.title,
          avatar: (
            <GroupAvatar
              groupName={currentChat.title}
              groupAvatar={currentChat.avatar}
              participants={currentChat.participantResponse}
              size={20}
            />
          ),
        })
      }

      if (currentChat.type === ConversationTypeEnum.SINGLE) {
        let teammate = getTeammateInSingleConversation(currentUser, currentChat)

        setInfoForCurrentChat({
          title: teammate.user.fullName,
          avatar: (
            <UserAvatar
              name={teammate.user.fullName}
              avatar={teammate.user.avatar}
              size={25}
            />
          ),
        })
      }
    }
  }, [currentChat])

  useEffect(() => {
    const payload: CheckAuthPayload = {
      dispatch,
      reloadUser: reloadCurrentUser,
    }

    dispatch(checkAuth(payload))
  }, [isAuth])

  if (isAuthLoading) {
    return (
      <View className='flex-1 bg-[#0e6f9c] flex justify-center items-center'>
        <View>
          <ActivityIndicator size={'large'} animating={true} color='white' />
          <Text
            style={{ fontFamily: BE_MEDIUM }}
            className='text-lg text-white mt-3'
          >
            Đang xác thực...
          </Text>
        </View>
      </View>
    )
  }

  if (!isAuth) return props.navigation.navigate(DANG_NHAP)

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
          title: infoOfCurrentChat.title,
          drawerLabel: () => null,
          drawerIcon: () => null,
          headerLeft: () => (
            <View className='flex flex-row justify-start items-center'>
              <IconButton
                icon='keyboard-backspace'
                color='white'
                onPress={() => navigation.goBack()}
              />
              {infoOfCurrentChat.avatar}
            </View>
          ),
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
