import { IPatient } from "./IPatient"

export interface IAppointment {
  _id: string
  patient: IPatient
  start: string
  end: string
  treatment: string
}