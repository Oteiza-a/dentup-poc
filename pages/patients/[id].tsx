import Layout from '@/components/layout/Layout';
import { Button, Card, FormControl, FormErrorMessage, FormLabel, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormField } from '@/interfaces/FormField';
import Header from '@/components/header/Header';

const PatientInfoModule = () => {

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
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: any) => {
    console.log('submit data:', data);
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

      <Button mt='6' colorScheme='purple' isLoading={isSubmitting} type='submit'>
        Guardar
      </Button>
    </form>
  )
}

const tabs: { key: string, text: string, component: JSX.Element }[] = [
  { key: uuid(), text: 'Información de paciente', component: <PatientInfoModule /> },
  { key: uuid(), text: 'Archivos', component: <>Archivos!</> },
  { key: uuid(), text: 'Evolución', component: <>Evolución!</> },
]

const Patient = () => {

  return (
    <Layout navbar>
      <Header backButtonText='Volver' />
      <Card p='4'>
        <Tabs variant='enclosed-colored' colorScheme='purple'>

          <TabList>
            {tabs.map(({ text }) => <Tab key={text} style={{ borderRadius: '6px 6px 0px 0px' }}>{text}</Tab>)}
          </TabList>

          <TabPanels>
            {tabs.map(({ key, component }) => <TabPanel key={key}>{component}</TabPanel>)}
          </TabPanels>

        </Tabs>
      </Card>
    </Layout>
  );
};

export default Patient;