import { IAppointment } from "@/interfaces/IAppointment";
import axios from "axios"

// const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL

export const getAppointments = async () => {
  const res = await axios.get(`/api/appointments`)
  return res;
}

export const createAppointment = async (data: IAppointment) => {
  const res = await axios.post(`/api/appointments/create`, data)
  return res;
}

export const updateAppointment = async (appointmentId: string, data: IAppointment) => {
  const res = await axios.put(`/api/appointments/${appointmentId}`, data)
  return res;
}


export const deleteAppointment = async (appointmentId: string) => {
  const res = await axios.delete(`/api/appointments/${appointmentId}`)
  return res;
}

