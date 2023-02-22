export interface Patient {
  id: string
  name: string
  lastNames: string
  treatments: number
  dni: string
  phoneNumber: string
  email?: string
  profileImage?: string
}