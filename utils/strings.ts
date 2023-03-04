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