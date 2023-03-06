export interface IAppointment {
  _id: string
  patient: string

  day: string
  startTime: string
  endTime: string

  treatment: string
  name: string
}