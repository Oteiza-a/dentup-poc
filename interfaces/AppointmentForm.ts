export interface IAppointmentForm {
  patient: { label: string, value: string }
  day: Date
  startTime: string
  endTime: string
  treatment: string
}