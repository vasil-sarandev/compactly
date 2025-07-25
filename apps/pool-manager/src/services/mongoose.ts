import mongoose from 'mongoose';
import { MONGOOSE_CONNECTION_STRING } from '@/env-constants';

export const connectMongoose = async () => {
  return mongoose.connect(MONGOOSE_CONNECTION_STRING);
};
