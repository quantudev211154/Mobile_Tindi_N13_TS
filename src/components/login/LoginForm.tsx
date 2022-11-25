import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import MyButton from '../core/MyButton'
import { BE_MEDIUM } from '../../constants/FontConstant'
import * as yup from 'yup'
import { login } from '../../apis/Auth.api'
import {
  DANG_KY,
  DANG_NHAP,
  MAN_HINH_CHINH,
  QUEN_MAT_KHAU,
  THEM_DANH_BA,
} from '../../constants/RoutesName.constant'
import { useMutation } from '@tanstack/react-query'
import FormErrorDisplay from '../core/FormErrorDisplay'
import { MySocket } from '../../services/TindiSocket'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOCAL_REFRESH_TOKEN_NAME } from '../../constants/AuthConstant'
import { JWT } from '../../utils/JWT'
import { authActions } from '../../redux/slice/AuthSlice'
import { useAppDispatch } from '../../redux/redux_hook'
interface ILoginForm {
  phone: string
  pwd: string
}

const initialValue: ILoginForm = {
  phone: '',
  pwd: '',
}

const LoginForm = (props: any) => {
  const { loginFullfilled, loginRejected } = authActions
  const dispatch = useAppDispatch()

  const loginMutation = useMutation(login, {
    onSuccess: async ({ data }) => {
      try {
        dispatch(loginFullfilled(data))

        JWT.setToken(data.accessToken)
        await AsyncStorage.setItem(LOCAL_REFRESH_TOKEN_NAME, data.refreshToken)
        MySocket.initTindiSocket(data.userId)
        props.navigation.push(MAN_HINH_CHINH)
      } catch (error) {
        console.log(error)
      }
    },
    onError: () => {
      dispatch(loginRejected())
    },
  })

  const onFormSubmit = (values: ILoginForm) => {
    loginMutation.mutate({
      phone: values.phone,
      password: values.pwd,
    })
  }

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onFormSubmit}
      validationSchema={yup.object({
        phone: yup
          .string()
          .required('Đừng để trống số điện thoại')
          .matches(
            /^(0[3|5|7|8|9])+([0-9]{8})$/,
            'Số điện thoại phải dài đủ 10 kí tự và bắt đầu bằng các đầu số của Việt Nam (03|05|07|08|09)'
          ),
        pwd: yup.string().required('Đừng để trống mật khẩu'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View className='w-full pb-5'>
          <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            maxLength={10}
            label='Số điện thoại'
            mode='outlined'
            autoFocus
            onChangeText={handleChange('phone')}
            value={values.phone}
          />
          <FormErrorDisplay msg={errors.phone} />
          <TextInput
            style={styles.textInput}
            label='Mật khẩu'
            mode='outlined'
            secureTextEntry={true}
            onChangeText={handleChange('pwd')}
            value={values.pwd}
          />
          <FormErrorDisplay msg={errors.pwd} />
          <View className='mt-2'>
            <MyButton
              title={
                loginMutation.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'
              }
              classNameStyle={'py-4 rounded-lg'.concat(
                ' ',
                loginMutation.isLoading ? 'bg-gray-400' : 'bg-blue-600'
              )}
              onPress={() => {
                handleSubmit()
              }}
            />
          </View>
        </View>
      )}
    </Formik>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  textInput: {
    height: 55,
    width: '100%',
    color: 'red',
    fontFamily: BE_MEDIUM,
    marginBottom: 5,
    backgroundColor: 'white',
  },
})
