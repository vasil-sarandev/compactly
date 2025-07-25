import { connectMongoose } from '../services/mongoose';

export const setupAppServices = async () => {
  try {
    // add additional services here
    await Promise.all([connectMongoose()]);
    console.log('Connected Mongo successfully.');
  } catch (err) {
    console.error('failed to setup app services.');
    throw err;
  }
};
