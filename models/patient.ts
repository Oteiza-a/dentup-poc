import { Schema, model, models } from 'mongoose';
import { IPatient } from '@/interfaces/IPatient';

const patientSchema = new Schema({
  name: String,
  lastNames: String,
  treatments: String,
  dni: String,
  phoneNumber: String,
  email: String,
  profileImage: String,
});

const Patient = models.patients || model<IPatient>('patients', patientSchema);

export default Patient;