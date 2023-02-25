// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatient } from '@/interfaces/IPatient';
import Patient from '@/models/patient'
import connectMongo from '@/helpers/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  patient: IPatient
}

type ErrorData = {
  message: string
}

export const getPatient = async (patientId: string): Promise<IPatient | null> => await Patient.findById(patientId).lean();

export const postPatient = async (body: object): Promise<IPatient> => await Patient.create(body); 

export const putPatient = async (patientId: string, body: object): Promise<IPatient | null> => await Patient.findByIdAndUpdate(patientId, body);

export const deletePatient = async (patientId: string): Promise<IPatient | null> => await Patient.findByIdAndDelete(patientId);  

/*
  GET:    /patients/[patientId]
  POST:   /patients/create
  PUT:    /patients/[patientId]
  DELETE: /patients/[patientId]
*/

const getHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { patientId } = req.query
    const patient = await getPatient(patientId as string)
    if (!patient) return res.status(404).json({ message: 'Patient not found!' })
    res.status(200).json({ patient })
    
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body } = req
    const patient: IPatient = await postPatient(body);
    res.status(200).json({ patient })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const putHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body, query: { patientId } } = req
    const patient: IPatient | null = await putPatient(patientId as string, body);
    
    if (!patient) return res.status(404).json({ message: 'Patient not found!' })
    res.status(200).json({ patient })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { patientId } = req.query
    const patient: IPatient | null = await deletePatient(patientId as string);
      
    if (!patient) return res.status(404).json({ message: 'Patient not found!' })
    res.status(200).json({ patient })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  try {
    await connectMongo();
    
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
