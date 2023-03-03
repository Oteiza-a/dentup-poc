import {  FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'

export const renderFormFields = (fields: any[], errors: FieldErrors, register: any) => {

  return fields.map(({ type, name, label, placeholder, options }) => (
    <FormControl isInvalid={Boolean(errors?.[name]?.message)} mt='4' key={name}>
      <FormLabel htmlFor='name'>{label}</FormLabel>

      {type === 'input' &&
        <Input
          id={name}
          placeholder={placeholder || ''}
          {...register(name)}
        />
      }

      {type === 'select' &&
        <Select
          id={name}
          placeholder={placeholder}
          {...register(name)}
        >
          {Boolean(options?.length) && options?.map(({ value, text }: any) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </Select>
      }

      <FormErrorMessage>
        {String(errors?.[name]?.message)}
      </FormErrorMessage>
    </FormControl>
  ))
}