// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IAppointment } from '@/interfaces/IAppointment';
import Appointment from '@/models/appointment'
import connectMongo from '@/helpers/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'

connectMongo();

type Data = {
  appointment: IAppointment
}

type ErrorData = {
  message: string
}

export const getAppointment = async (appointmentId: string): Promise<IAppointment | null> => await Appointment.findById(appointmentId);

export const postAppointment = async (body: object): Promise<IAppointment> => await Appointment.create(body);

export const putAppointment = async (appointmentId: string, body: object): Promise<IAppointment | null> => await Appointment.findByIdAndUpdate(appointmentId, body);

export const deleteAppointment = async (appointmentId: string): Promise<IAppointment | null> => await Appointment.findByIdAndDelete(appointmentId);

/*
  GET:    /api/appointments/[appointmentId]
  POST:   /api/appointments/create
  PUT:    /api/appointments/[appointmentId]
  DELETE: /api/appointments/[appointmentId]
*/

const getHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { appointmentId } = req.query
    const appointment = await getAppointment(appointmentId as string)
    if (!appointment) return res.status(404).json({ message: 'Appointment not found!' })
    res.status(200).json({ appointment })
    
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body } = req
    const appointment: IAppointment = await postAppointment(body);
    res.status(200).json({ appointment })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body, query: { appointmentId } } = req
    const appointment: IAppointment | null = await putAppointment(appointmentId as string, body);
    
    if (!appointment) return res.status(404).json({ message: 'Appointment not found!' })
    res.status(200).json({ appointment })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { appointmentId } = req.query
    const appointment: IAppointment | null = await deleteAppointment(appointmentId as string);
      
    if (!appointment) return res.status(404).json({ message: 'Appointment not found!' })
    res.status(200).json({ appointment })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  try {    
    switch (req.method) {
      case 'GET':
        await getHandler(req, res);
        break;

      case 'POST':
        await postHandler(req, res);
        break;
        
      case 'PUT':
      case 'PATCH':
        await putHandler(req, res);
        break;

      case 'DELETE':
        await deleteHandler(req, res)
        break;
    
      default:
        break;
    }
    
  } catch (error) {
    console.error('catch error', error);
    res.status(500).json({ message: 'Server error!' })
  }
}
