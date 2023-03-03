import { getPatients } from '@/clients/patients';
import { IPatient } from '@/interfaces/IPatient';
import useSWR from 'swr'

const fetcher = async (): Promise<IPatient[]> => {
  const res = await getPatients();
  return res?.data?.patients
}

export function usePatients () {
  const { data: patients, error, isLoading } = useSWR('/api/patients', fetcher)
 
  return {
    patients,
    isLoading,
    isError: error
  }
}