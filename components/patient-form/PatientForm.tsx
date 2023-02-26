import { 
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, 
  AlertDialogOverlay, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, 
  useToast, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from '@/interfaces/FormField';
import { IPatient } from '@/interfaces/IPatient';
import axios from 'axios';
import { ToastMessages } from '@/enums/ToastMessages';
import { getToastMessage } from '@/helpers/toast';
import { FiCheckSquare, FiUserX } from 'react-icons/fi'
import { useRouter } from 'next/router';
interface Props extends React.PropsWithChildren {
  isNewPatient: boolean
  patientData?: IPatient
}

export const PatientForm: React.FC<Props> = ({ isNewPatient, patientData }) => {
  const { isOpen: isDeleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure()
  const toast = useToast();
  const router = useRouter()

  const cancelRef = React.useRef(null)
  const schema = yup.object().shape({
    name: yup.string().required('El nombre del paciente es obligatorio'),
    lastNames: yup.string().required('Los apellidos del paciente es obligatorio'),
    dni: yup.string().required('El DNI/RUT del paciente es obligatorio'),
    phoneNumber: yup.string().required('El número de contacto del paciente es obligatorio'),
    email: yup.string().email(),
  })
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IPatient>({ resolver: yupResolver(schema), defaultValues: patientData || {} })

  const onSubmit = async (data: IPatient) => {
    try {
      if (isNewPatient) {
        const res = await axios.post('http://localhost:3000/api/patients/create', data)
        if (res.status === 200) {
          toast(getToastMessage(ToastMessages.createPatientSuccess))
        }
        
      } else {
        const res = await axios.put(`http://localhost:3000/api/patients/${patientData?._id}`, data)
        if (res.status === 200) {
          toast(getToastMessage(ToastMessages.updatePatientSuccess))
        }
      }
      
    } catch (error) {
      toast(getToastMessage(ToastMessages.createPatientError))
      console.error(error)
    }
  }

  const onDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/patients/${patientData?._id}`)
      if (res.status === 200) {
        toast(getToastMessage(ToastMessages.deletePatientSuccess))
      }
    } catch (error) {
      toast(getToastMessage(ToastMessages.createPatientError))
      console.error(error)
    }
    onDeleteDialogClose()
    router.push('/patients/')
  }

  const fields: FormField[] = [
    {
      type: 'input',
      name: 'name',
      label: 'Nombre',
      placeholder: 'Nombre del paciente',
    },
    {
      type: 'input',
      name: 'lastNames',
      label: 'Apellidos',
      placeholder: 'Apellidos del paciente',
    },
    {
      type: 'input',
      name: 'dni',
      label: 'DNI/RUT',
      placeholder: 'DNI/RUT del paciente',
    },
    {
      type: 'input',
      name: 'phoneNumber',
      label: 'Número de contacto',
      placeholder: 'Número de contacto',
    },
    {
      type: 'input',
      name: 'email',
      label: 'Correo electrónico',
      placeholder: 'Correo electrónico',
    },

    // {
    //   type: 'select',
    //   name: 'lastNames',
    //   label: 'lastNamessssss',
    //   placeholder: 'lastNamesssssssssssss',
    //   options: [
    //     { value: 'option1', text: 'Oteizzza' },
    //     { value: 'option2', text: 'Oteizzzo' },
    //     { value: 'option3', text: 'Oteizzze' },
    //   ]
    // },
  ]

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        {fields.map(({ type, name, label, placeholder, options }) => (
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
                {Boolean(options?.length) && options?.map(({ value, text }) => (
                  <option key={value} value={value}>{text}</option>
                ))}
              </Select>
            }

            <FormErrorMessage>
              {String(errors?.[name]?.message)}
            </FormErrorMessage>
          </FormControl>
        ))}

        <Box display='flex' justifyContent='space-between'>
          <Button mt='6' minWidth='175px' colorScheme='blue' isLoading={isSubmitting} type='submit' rightIcon={<FiCheckSquare/>}>
            Guardar
          </Button>

          {!isNewPatient && 
            <Button onClick={onDeleteDialogOpen} mt='6' minWidth='175px' colorScheme='red' variant='outline' rightIcon={<FiUserX />}>
              Eliminar Paciente
            </Button>
          }
        </Box>
      </form>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar Paciente
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar el registro del paciente? Se perderán sus datos, agenda e historial.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteDialogClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}