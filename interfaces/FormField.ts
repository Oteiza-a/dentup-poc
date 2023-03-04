import { FormFieldOption } from "./FormFieldOption"
import { IPatient } from "./IPatient"

type formFieldType = 'input' | 'select'  | 'date' | 'time' | 'search-select'
export interface FormField {
  type: formFieldType
  label: string
  placeholder?: string
  options?: FormFieldOption[]
}

export interface PatientFormField extends FormField {
  name: keyof IPatient // :o
}

export interface AppointmentFormField extends FormField {
  name: any
}