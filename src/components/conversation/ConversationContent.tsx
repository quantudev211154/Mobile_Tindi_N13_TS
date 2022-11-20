import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  BE_MEDIUM,
  BE_REGULAR,
  BE_SEMIBOLD,
} from '../../constants/FontConstant'
import { Avatar, TextInput } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { DANH_SACH_TIN_NHAN } from '../../constants/RoutesName.constant'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-b1d96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-4712f-bd96-145571e29d72',
    title: 'Fourth Item',
  },
  {
    id: '58694a0f-3da1-4731f-bd96-145571e29d72',
    title: 'Fifth Item',
  },
]

type Props = {
  navigation: any
}

export default function ConversationContent({ navigation }: Props) {
  const renderItem = (item: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(DANH_SACH_TIN_NHAN)
      }}
      className='w-full px-2 py-1 h-[73px]'
    >
      <View className='w-full h-full flex flex-row justify-start items-center'>
        <Avatar.Image
          size={53}
          source={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
        />
        <View className='flex-1 flex flex-col justify-between py-1 h-full border-b-[0.2px] border-gray-400 ml-2'>
          <Text style={{ fontFamily: BE_SEMIBOLD }} className='text-[16px]'>
            {item.item.title}
          </Text>
          <Text style={{ fontFamily: BE_REGULAR }} className='text-gray-500'>
            2 3 con muc
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}
