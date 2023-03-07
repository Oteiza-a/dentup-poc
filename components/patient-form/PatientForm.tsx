import { Box, Button, useToast, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { PatientFormField } from '@/interfaces/FormField';
import { IPatient } from '@/interfaces/IPatient';
import { ToastMessages } from '@/enums/ToastMessages';
import { getToastMessage } from '@/helpers/toast';
import { FiCheckSquare, FiUserX } from 'react-icons/fi'
import { useRouter } from 'next/router';
import { createPatient, deletePatient, updatePatient } from '@/clients/patients';
import { renderFormFields } from '@/helpers/forms';
import Dialog from '../dialog/Dialog';
import { PatientFormSkeleton } from '../skeletons/PatientFormSkeleton';
interface Props extends React.PropsWithChildren {
  isNewPatient: boolean
  patientData?: IPatient
  isLoading?: boolean
}

export const PatientForm: React.FC<Props> = ({ isNewPatient, patientData, isLoading }) => {
  const { isOpen: isDeleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure()
  const toast = useToast();
  const router = useRouter();

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
    control,
  } = useForm<IPatient>({ resolver: yupResolver(schema), defaultValues: patientData || {} })

  const onSubmit = async (data: IPatient) => {
    try {
      if (isNewPatient) {
        const res = await createPatient(data)
        if (res.status === 200) {
          toast(getToastMessage(ToastMessages.createPatientSuccess))
        }

      } else {
        const res = await updatePatient(patientData?._id as string, data)
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
      const res = await deletePatient(patientData?._id as string)
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

  const fields: PatientFormField[] = [
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
  ]

  return (
    <>
      {isLoading
      ? <PatientFormSkeleton />
      : <form onSubmit={handleSubmit(onSubmit)}>

        {renderFormFields(fields, errors, register, control)}

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
      </form>}

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={onDeleteDialogClose}
        title='Eliminar Paciente'
        text='¿Estás seguro de que quieres eliminar el registro del paciente? Se perderán sus datos, agenda e historial.'
        acceptButtonText='Eliminar'
        cancelButtonText='Cancelar'
        acceptButtonColorScheme='red'
        onAccept={onDelete}
      />
    </>
  )
}