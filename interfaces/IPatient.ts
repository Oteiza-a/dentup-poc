export interface IPatient {
  _id: string
  name: string
  lastNames: string
  treatments: number
  dni: string
  phoneNumber: string
  email?: string
  profileImage?: string
}