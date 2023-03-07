import Layout from '@/components/layout/Layout';
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { v4 as uuid } from 'uuid';
import Header from '@/components/header/Header';
import { GetServerSideProps } from 'next';
import { IPatient } from '@/interfaces/IPatient';
import { toCleanObject } from '@/utils/object';
import { PatientForm } from '@/components/patient-form/PatientForm'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { getPatient } from '@/clients/patients';

interface Props extends React.PropsWithChildren {
  isNewPatient: boolean
  patient?: IPatient,
}

const Patient: React.FC<Props> = () => {
  const router = useRouter()
  const patientId = router.query?.id;
  const isNewPatient = patientId === 'new' || patientId === undefined;

  const { data: patient, error, isLoading } = useSWR(
    isNewPatient ? null : `/api/patient/${patientId}`,
    () => getPatient(patientId as string)
  )
  const tabs: { key: string, text: string, component: JSX.Element }[] = [
    {
      key: uuid(),
      text: 'Información de paciente',
      component: <PatientForm patientData={patient} isNewPatient={!!patientId} isLoading={isLoading}/>
    },
    { key: uuid(), text: 'Archivos', component: <>Archivos!</> },
    { key: uuid(), text: 'Evolución', component: <>Evolución!</> },
  ]

  return (
    <Layout navbar>
      <Header backButtonText='Volver' />
      <Card p='4'>
        <Tabs variant='enclosed-colored' colorScheme='blue'>

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


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { id } = ctx.query;
//   const isNewPatient = id === 'new'

//   const props: Props = { isNewPatient }

//   if (!isNewPatient) {
//     const patient = await getPatient(id as string);
//     props.patient = toCleanObject(patient);
//   }

//   return { props }
// }

export default Patient;