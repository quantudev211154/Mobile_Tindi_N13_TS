export const formatUserFullname = (userFullName: string): string => {
  const splitedName = userFullName.split(' ')

  return (
    splitedName[splitedName.length - 2][0] +
    splitedName[splitedName.length - 1][0]
  )
}

export const formatPhoneNumber = (phoneNumber: string): string => {
  let formatedPhone = ''
  const splitedPhone = phoneNumber.split('')

  let count = 3
  let tmp = 0
  for (let i = 0; i < splitedPhone.length; ++i) {
    formatedPhone += splitedPhone[i]

    if (tmp === count && formatedPhone.length <= 10) {
      formatedPhone += '.'
      tmp = 0
    }

    ++tmp
  }

  return formatedPhone
}
