import mongoose from 'mongoose';

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_URI || '')
}

// const connectMongo = async () => mongoose.connect(process.env.MONGO_URI || '');

export default connectMongo;
