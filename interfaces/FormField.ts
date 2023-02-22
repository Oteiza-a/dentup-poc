import { FormFieldOption } from "./FormFieldOption"

export interface FormField { 
  type: 'input' | 'select' 
  name: string
  label: string
  placeholder?: string
  options?: FormFieldOption[]
}