export const toCleanObject = (obj: any) => {
  try {
    return JSON.parse(JSON.stringify(obj))    
  } catch (error) {
    console.error(error)
    return null
  }
}