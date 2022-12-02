import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ContactHeader from '../components/contact/ContactHeader'
import ContactContent from '../components/contact/ContactContent'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { useAppSelector } from '../redux/redux_hook'
import { authState } from '../redux/slice/AuthSlice'
import { useQuery } from '@tanstack/react-query'
import { loadContacts } from '../apis/Contact.api'
import { BE_MEDIUM } from '../constants/FontConstant'
import UserAvatar from '../components/core/UserAvatar'

type Props = {}

const Contacts = (props: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { data, isLoading } = useQuery({
    queryKey: [currentUser],
    queryFn: () => loadContacts(currentUser),
  })

  return (
    <View className='flex-1'>
      <View>
        <TextInput
          mode='flat'
          autoFocus
          placeholder='Tìm kiếm liên hệ...'
          style={{ backgroundColor: 'white' }}
        />
      </View>
      <View
        className={`flex-1 flex items-center ${
          isLoading ? 'justify-center' : 'justify-start'
        }`}
      >
        {isLoading ? (
          <View>
            <ActivityIndicator
              size={'large'}
              animating={true}
              color='#517da2'
            />
            <Text
              style={{ fontFamily: BE_MEDIUM }}
              className='italic text-md mt-3'
            >
              Đang tải danh bạ của {currentUser && currentUser.fullName}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {data && data.data.length === 0 ? (
          <View className='text-center'>
            <Text
              style={{ fontFamily: BE_MEDIUM }}
              className='italic text-md mt-3'
            >
              Bạn chưa có người quen nào cả. Kết bạn mới thôi nào!
            </Text>
          </View>
        ) : (
          <></>
        )}
        {data && data.data.length !== 0 ? (
          <>
            {data.data.map((contact) => (
              <View
                key={contact.id}
                className='w-full rounded-md flex flex-row justify-start items-center px-3 py-2'
              >
                <UserAvatar
                  name={contact.fullName}
                  avatar={contact.avatar as string}
                  size={50}
                />
                <Text
                  style={{ fontFamily: BE_MEDIUM }}
                  className='text-md ml-3'
                >
                  {contact.fullName}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

export default Contacts
