import React from 'react';
import { GetServerSideProps } from 'next';
import { getPatient } from '../api/patients/[patientId]';
import { IPatient } from '@/interfaces/IPatient';
import { toCleanObject } from '@/utils/object';
import dynamic from 'next/dynamic';

interface Props extends React.PropsWithChildren {
  isNewPatient: boolean
  patient?: IPatient,
}

const PatientContent = dynamic(() => import('@/components/patient-content/PatientContent'));

const Patient: React.FC<Props> = ({ isNewPatient, patient }) => {

  return (
    <PatientContent isNewPatient={isNewPatient} patient={patient}/>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const isNewPatient = id === 'new'

  const props: Props = { isNewPatient }

  if (!isNewPatient) {
    const patient = await getPatient(id as string);
    props.patient = toCleanObject(patient);
  }

  return { props }
}

export default Patient;