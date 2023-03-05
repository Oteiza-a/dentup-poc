import { IPatient } from "./IPatient"

export interface IAppointment {
  _id: string
  patient: IPatient
  
  day: string
  start: string
  end: string

  treatment: string
  name: string
}