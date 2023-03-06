import { Schema, model, models } from 'mongoose';
import { IAppointment } from '@/interfaces/IAppointment';

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'patients' },
  day: String,
  startTime: String,
  endTime: String,

  treatment: String,
  name: String,
});

const Apointment = models?.['dent-appointments'] || model<IAppointment>('dent-appointments', appointmentSchema);

export default Apointment;