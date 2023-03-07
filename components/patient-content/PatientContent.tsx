import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Header from '@/components/header/Header';
import { PatientForm } from '@/components/patient-form/PatientForm';
import Layout from '@/components/layout/Layout';
import { v4 as uuid } from 'uuid';


const Content = ({ isNewPatient, patient }: any) => {
  const tabs: { key: string, text: string, component: JSX.Element }[] = [
    { key: uuid(), text: 'Información de paciente', component: <PatientForm patientData={patient} isNewPatient={isNewPatient} /> },
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
  )
}

export default Content