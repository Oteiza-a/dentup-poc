import { FormFieldOption } from "./FormFieldOption"
import { IPatient } from "./IPatient"

export interface FormField { 
  type: 'input' | 'select' 
  name: keyof IPatient // :O
  label: string
  placeholder?: string
  options?: FormFieldOption[]
}