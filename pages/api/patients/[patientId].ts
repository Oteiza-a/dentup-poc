// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatient } from '@/interfaces/IPatient';
import Patient from '@/models/patient'
import connectMongo from '@/utils/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  patient: IPatient
}

type ErrorData = {
  message: string
}

/*
  GET:    /patients/[patientId]
  POST:   /patients/create
  PUT:    /patients/[patientId]
  DELETE: /patients/[patientId]
*/

const getPatient = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { patientId } = req.query
    const patient: IPatient | null = await Patient.findById(patientId);  
      
    if (!patient) return res.status(404).json({ message: 'Patient not found!' })
    res.status(200).json({ patient })
    
  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const postPatient = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body } = req
    const patient: IPatient = await Patient.create(body);  
    res.status(200).json({ patient })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const putPatient = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { body, query: { patientId } } = req
    const patient: IPatient | null = await Patient.findByIdAndUpdate(patientId, body);  
    
    if (!patient) return res.status(404).json({ message: 'Patient not found!' })
    res.status(200).json({ patient })

  } catch (error: any) {
    throw new Error(error?.message)
  }
}

const deletePatient = async (req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) => {
  try {
    const { patientId } = req.query
    const patient: IPatient | null = await Patient.findByIdAndDelete(patientId);  
      
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
        await getPatient(req, res);
        break;

      case 'POST':
        await postPatient(req, res);
        break;
        
      case 'PUT':
      case 'PATCH':
        await putPatient(req, res);
        break;

      case 'DELETE':
        await deletePatient(req, res)
        break;
    
      default:
        break;
    }
    
  } catch (error) {
    console.error('catch error', error);
    res.status(500).json({ message: 'Server error!' })
  }
}
