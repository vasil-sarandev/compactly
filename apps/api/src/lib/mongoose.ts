import mongoose from 'mongoose';

// const MONGOOSE_CONNECTION_STRING = process.env.MONGOOSE_CONNECTION_STRING as string;
// const MONGOOSE_CONNECTION_STRING = 'mongodb://host.docker.internal:27017/test';
const MONGOOSE_CONNECTION_STRING = 'mongodb://mongo:27017/test';

export const connectMongoose = async () => {
  return mongoose.connect(MONGOOSE_CONNECTION_STRING);
};

export const setupWithMongoose = async (callback: () => void) => {
  await connectMongoose();
  callback();
};
