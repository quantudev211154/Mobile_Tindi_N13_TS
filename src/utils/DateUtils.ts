export const parseDateByHourAndMinutes = (dateInString: string): string => {
  const date = new Date(dateInString)

  let hours = '0' + date.getHours()
  let minutes = '0' + date.getMinutes()

  return `${hours.slice(-2)}:${minutes.slice(-2)}`
}

export const parseDateByDayMonthYear = (dateInString: string): string => {
  const targetDate = new Date(dateInString)

  let date = '0' + targetDate.getDate()
  let month = '0' + (targetDate.getMonth() + 1)
  let year = '0' + targetDate.getFullYear()

  return `${date.slice(-2)}-${month.slice(-2)}-${year.slice(-2)}`
}

export const compareDate = (date1: string, date2: string): boolean => {
  const targetDate1 = new Date(date1)
  const targetDate2 = new Date(date2)

  return (
    targetDate1.getDate() === targetDate2.getDate() &&
    targetDate1.getMonth() === targetDate2.getMonth() &&
    targetDate1.getFullYear() === targetDate2.getFullYear()
  )
}
