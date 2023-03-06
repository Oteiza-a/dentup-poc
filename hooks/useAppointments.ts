import { getAppointments } from '@/clients/appointments';
import { IAppointment } from '@/interfaces/IAppointment';
import { dateToYearMonthDay } from '@/utils/date';
import { EventSourceInput } from '@fullcalendar/core';
import useSWR from 'swr'

const fetcher = async (): Promise<IAppointment[]> => {
  const res = await getAppointments();
  return res?.data?.appointments
}

export function useAppointments () {
  const { data: appointments, error, isLoading } = useSWR('/api/appointments', fetcher)

  return {
    appointments,
    isLoading,
    isError: error
  }
}

export function useParsedAppointments () {
  const { data: appointments, error, isLoading, mutate } = useSWR('/api/appointments', fetcher)

  const parsedAppointments: EventSourceInput = appointments?.map(({ _id, name, day, startTime, endTime }: IAppointment) => {

    const startIsoStr = `${day}T${startTime}:00`
    const endIsoStr = `${day}T${endTime}:00`

    return {
      id: _id,
      title: name,
      start: new Date(startIsoStr),
      end: new Date(endIsoStr),
    }
  }) || [];

  return {
    appointments: parsedAppointments,
    isLoading,
    isError: error,
    refetch: mutate,
  }
}