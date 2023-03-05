import { Schema, model, models } from 'mongoose';
import { IAppointment } from '@/interfaces/IAppointment';

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'patients' },
  day: String,
  start: String,
  end: String,

  treatment: String,
  name: String,
});

const Apointment = models?.appointments || model<IAppointment>('appointments', appointmentSchema);

export default Apointment;