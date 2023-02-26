import { IPatient } from "@/interfaces/IPatient";
import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL

console.log(apiUrl);
export const createPatient = async (data: IPatient) => {
  const res = await axios.post(`${apiUrl}/api/patients/create`, data)
  return res;
}

export const updatePatient = async (patientId: string, data: IPatient) => {
  const res = await axios.put(`${apiUrl}/api/patients/${patientId}`, data)
  return res;
}


export const deletePatient = async (patientId: string) => {
  const res = await axios.delete(`${apiUrl}/api/patients/${patientId}`)
  return res;
}

