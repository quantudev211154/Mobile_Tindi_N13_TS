import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import MyButton from '../core/MyButton'
import { BE_MEDIUM } from '../../constants/FontConstant'
import * as yup from 'yup'


interface IRegisterForm {
    phone: string
    pwd: string
    pwdReplay: string
  }
const initialValue: IRegisterForm = {
    phone: '',
    pwd: '',
    pwdReplay:''
  }
  const onFormSubmit = async (values: IRegisterForm) => {

  }
export default function RegisterForm() {

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
    {({ handleChange, handleBlur, handleSubmit, values }) => (
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
        <TextInput
          style={styles.textInput}
          label='Mật khẩu'
          mode='outlined'
          secureTextEntry={true}
          onChangeText={handleChange('pwd')}
          value={values.pwd}
        />
        <TextInput
          style={styles.textInput}
          label='Nhập lại mật khẩu'
          mode='outlined'
          secureTextEntry={true}
          onChangeText={handleChange('pwd')}
          value={values.pwdReplay}
        />
        <View className='mt-2'>
          <MyButton
            title='Đăng kí'
            classNameStyle='bg-blue-600 py-4 rounded-lg'
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
  