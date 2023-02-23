// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatient } from '@/interfaces/IPatient';
import Patient from '@/models/Patient'
import connectMongo from '@/utils/connectMongo';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  patients: IPatient[]
}
// export default async function addTest(req: any, res: any) {
//   try {
//     console.log('CONNECTING TO MONGO');
//     await connectMongo();
//     console.log('CONNECTED TO MONGO');

//     console.log('CREATING DOCUMENT');
//     const test = await Patient.create({ name: 'jUNANITO' });
//     console.log('CREATED DOCUMENT');

//     res.json({ test });
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectMongo();
    const patients: IPatient[] = await Patient.find();  
    res.status(200).json({ patients })
  } catch (error) {
    console.log('error', error);
    res.status(500).json({patients: []})
  }
}
