import { connectKafka } from './lib/kafka/kafka.index';
import { connectMongoose } from './lib/mongoose/mongoose.index';

const setupAppServices = async () => {
  try {
    // add additional services here if needed
    await Promise.all([connectMongoose(), connectKafka()]);
    console.log('Connected Mongo successfully.');
  } catch (err) {
    console.error('failed to setup app services.');
    throw err;
  }
};

export const setupApplication = async () => {
  try {
    // add more async logic here if needed for application setup.
    await Promise.all([setupAppServices()]);
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
