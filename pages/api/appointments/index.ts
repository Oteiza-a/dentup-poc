import { IPatient } from '@/interfaces/IPatient';
import Appointment from '@/models/appointment'
import connectMongo from '@/helpers/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IAppointment } from '@/interfaces/IAppointment';

type Data = {
  appointments: IAppointment[]
}

export const getAppointments = async () => {
  await connectMongo();
  const appointment: IAppointment[] = await Appointment.find();  
  return appointment;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const appointments = await getAppointments();
    res.status(200).json({ appointments })
    
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ appointments: [] })
  }
}
