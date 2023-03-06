export const getTimeString = (date: Date): string => {
  try {
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    const hoursStr = hours < 10 ? `0${hours}` : String(hours);
    const minsStr = minutes < 10 ? `0${minutes}` : String(minutes);
    return `${hoursStr}:${minsStr}`

  } catch (error) {
    console.error(error);
    return ''
  }
}

export const dateToYearMonthDay = (date: Date): string => {
  try {
    return date.toISOString().split('T')[0]
  } catch (error) {
    console.error(error)
    return '';
  }
}

export const dateToDayMonthYear = (date: Date): string => {
  try {
    let day: string | number = date.getDate()
    day = day < 10 ? `0${day}` : day

    let month: string | number = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month

    let year: number = date.getFullYear()

    return `${day}-${month}-${year}`

  } catch (error) {
    console.error(error)
    return ''
  }
}