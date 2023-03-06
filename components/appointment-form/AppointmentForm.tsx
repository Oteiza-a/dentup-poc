import { renderFormFields } from '@/helpers/forms';
import { IAppointmentForm } from '@/interfaces/AppointmentForm';
import { AppointmentFormField } from '@/interfaces/FormField';
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
  clickedAppointment?: IAppointmentForm | null
  selectedTime: SelectedCalendarTime | null
  onSubmit: (appointmentData: IAppointmentForm, isEditing: boolean) => any
  onDeleteAppointment: () => any
  onCancel: () => any
}

const AppointmentForm: React.FC<Props> = ({ patients, clickedAppointment, selectedTime, onSubmit, onCancel, onDeleteAppointment }) => {
  const defaultValues: any = (clickedAppointment ? clickedAppointment : selectedTime) || {};

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
  } = useForm<IAppointmentForm>({ resolver: yupResolver(schema), defaultValues: defaultValues || {} })

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
    <form onSubmit={handleSubmit((data) => onSubmit(data, Boolean(clickedAppointment)))}>
      {renderFormFields(fields, errors, register, control)}

      <Box display='flex' mt='3' mb='5' justifyContent='space-between'>
        <Button
          onClick={clickedAppointment ? onDeleteAppointment: onCancel }
          mt='6'
          minWidth='175px'
          colorScheme='red'
          variant='outline'
          rightIcon={<FiXCircle />}
        >
          {clickedAppointment ? 'Eliminar hora' : 'Cancelar'}
        </Button>

        <Button mt='6' minWidth='175px' colorScheme='blue' isLoading={isSubmitting} type='submit' rightIcon={<FiPlusSquare/>}>
          {clickedAppointment ? 'Guardar cambios' : 'Guardar'}
        </Button>

      </Box>
    </form>
  );
};

export default AppointmentForm;