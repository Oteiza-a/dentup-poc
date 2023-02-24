// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatient } from '@/interfaces/IPatient';
import Patient from '@/models/patient'
import connectMongo from '@/utils/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  patients: IPatient[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectMongo();
    const patients: IPatient[] = await Patient.find();  
    res.status(200).json({ patients })
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ patients: [] })
  }
}
