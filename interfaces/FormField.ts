import { FormFieldOption } from "./FormFieldOption"
import { IAppointment } from "./IAppointment"
import { IPatient } from "./IPatient"

interface FormField {
  type: 'input' | 'select' 
  label: string
  placeholder?: string
  options?: FormFieldOption[]
}

export interface PatientFormField extends FormField {
  name: keyof IPatient // :O
}

export interface AppointmentFormField extends FormField {
  name: keyof IAppointment // :O
}