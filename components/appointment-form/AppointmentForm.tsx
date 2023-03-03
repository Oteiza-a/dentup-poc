import { renderFormFields } from '@/helpers/forms';
import { AppointmentFormField } from '@/interfaces/FormField';
import { IAppointment } from '@/interfaces/IAppointment';
import { IPatient } from '@/interfaces/IPatient';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

interface Props extends React.PropsWithChildren {
  patients: IPatient[]
  isNewAppointment: boolean
  appointmentData?: IAppointment
}

const AppointmentForm: React.FC<Props> = ({ patients, isNewAppointment, appointmentData }) => {
  const schema = yup.object().shape({
    patient: yup.string().required('El nombre del paciente es obligatorio'),
    start: yup.date().required('La fecha y hora son requeridas.'),
    end: yup.date().required('La fecha y hora son requeridas.'),
    treatment: yup.string().required('El tratamiento es obligatorio'),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), defaultValues: isNewAppointment ? appointmentData : {}  })

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const fields: AppointmentFormField[] = [
    {
      type: 'select',
      name: 'patient',
      label: 'Paciente',
      placeholder: 'Nombre del paciente',
      options: patients.map(({ _id, name, lastNames }) => ({ value: _id, text: `${name} ${lastNames}` })),
    },
    {
      type: 'input',
      name: 'start',
      label: 'Inicio',
      placeholder: 'Inicio',
    },
    {
      type: 'input',
      name: 'end',
      label: 'Fin',
      placeholder: 'Fin',
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
      {renderFormFields(fields, errors, register)}
    </form>
  );
};

export default AppointmentForm;