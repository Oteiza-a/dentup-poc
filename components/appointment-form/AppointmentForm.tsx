import { renderFormFields } from '@/helpers/forms';
import { AppointmentFormField } from '@/interfaces/FormField';
import { IAppointment } from '@/interfaces/IAppointment';
import { IPatient } from '@/interfaces/IPatient';
import { SelectedCalendarTime } from '@/interfaces/SelectedCalendarTime';
import { Box, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiPlusSquare, FiXCircle } from 'react-icons/fi';
import * as yup from 'yup'

interface Props extends React.PropsWithChildren {
  patients: IPatient[]
  isNewAppointment: boolean
  appointmentData?: IAppointment
  selectedTime: SelectedCalendarTime | null
  onSubmit: (appointmentData: any) => any
  onCancel: () => any
}

const AppointmentForm: React.FC<Props> = ({ patients, isNewAppointment, appointmentData, selectedTime, onSubmit, onCancel }) => {
  const defaultValues: any = (selectedTime ? selectedTime : appointmentData) || {};
  const schema = yup.object().shape({
    // day: yup.date().required('La fecha es requerida.'),
    day: yup.lazy((value) => (
      value === ""
        ? yup.string().nullable().required('La fecha es requerida.')
        : yup.date().nullable().required('La fecha es requerida.')
    )),
    startTime: yup.string().required('La hora de inicio es requerida.'),
    endTime: yup.string().required('La hora de fin es requerida.'),
    patient: yup.object().shape({
      label: yup.string().required("Is required"),
      value: yup.string().required("Is required")
    }).required('El nombre del paciente es obligatorio'),
    treatment: yup.string().required('El tratamiento es obligatorio'),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ resolver: yupResolver(schema), defaultValues: defaultValues || {} })

  const fields: AppointmentFormField[] = [
    {
      type: 'date',
      name: 'day',
      label: 'Día',
      placeholder: 'Día',
    },
    {
      type: 'time',
      name: 'startTime',
      label: 'Hora inicio',
      placeholder: 'Hora inicio',
    },
    {
      type: 'time',
      name: 'endTime',
      label: 'Hora fin',
      placeholder: 'Hora fin',
    },
    {
      type: 'search-select',
      name: 'patient',
      label: 'Paciente',
      placeholder: 'Seleccionar paciente',
      options: patients.map(({ _id, name, lastNames }) => ({ value: _id, label: `${name} ${lastNames}` })),
    },
    {
      type: 'input',
      name: 'treatment',
      label: 'Tratamiento',
      placeholder: 'Tratamiento',
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderFormFields(fields, errors, register, control)}

      <Box display='flex' mt='3' mb='5' justifyContent='space-between'>
        <Button onClick={onCancel} mt='6' minWidth='175px' colorScheme='red' variant='outline' rightIcon={<FiXCircle />}>
          Cancelar
        </Button>

        <Button mt='6' minWidth='175px' colorScheme='blue' isLoading={isSubmitting} type='submit' rightIcon={<FiPlusSquare/>}>
          Guardar
        </Button>

      </Box>
    </form>
  );
};

export default AppointmentForm;