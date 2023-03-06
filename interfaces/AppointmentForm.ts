export interface IAppointmentForm {
  patient: { label: string, value: string }
  day: Date | string
  startTime: string
  endTime: string
  treatment: string
}