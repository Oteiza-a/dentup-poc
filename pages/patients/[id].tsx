import Layout from '@/components/layout/Layout';
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

const tabs: { key: string, text: string, component: JSX.Element }[] = [
  { key: uuid(), text: 'Información de paciente', component: <>Info</> },
  { key: uuid(), text: 'Archivos', component: <>Archivos!</> },
  { key: uuid(), text: 'Evolucionar', component: <>Evolucionar!</> },
]

const Patient = () => {

  return (
    <Layout navbar>
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