import { FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import { Select as SearchSelect } from 'chakra-react-select'
import { Control, Controller, FieldErrors } from 'react-hook-form'

export const renderFormFields = (fields: any[], errors: FieldErrors, register: any, control: Control<any>) => {

  return fields.map(({ type, name, label, placeholder, options }) => (
    type !== 'search-select'
    ? <FormControl isInvalid={Boolean(errors?.[name]?.message)} mt='4' key={name}>
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

        {type === 'date' &&
          <Input
            type='date'
            id={name}
            placeholder={placeholder || ''}
            {...register(name)}
          />
        }

        {type === 'time' &&
          <Input
            type='time'
            id={name}
            placeholder={placeholder || ''}
            {...register(name)}
          />
        }

        <FormErrorMessage>
          {String(errors?.[name]?.message)}
        </FormErrorMessage>
      </FormControl>
    : <Controller
        name={name}
        control={control}
        key={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error }
        }) => (
          <FormControl isInvalid={Boolean(error?.message)} mt='4'>
            <FormLabel>{label}</FormLabel>

            <SearchSelect
              colorScheme='blue'
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              options={options}
              placeholder={placeholder}
            />

            <FormErrorMessage>
              {String(error?.message)}
            </FormErrorMessage>
          </FormControl>
        )}
      />
  ))
}