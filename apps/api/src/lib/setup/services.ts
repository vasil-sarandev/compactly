import { connectKafka } from '../services/kafka';
import { connectMongoose } from '../services/mongoose';

export const setupAppServices = async () => {
  try {
    await Promise.all([connectMongoose(), connectKafka()]);
    console.log('Connected Mongo successfully.');
    console.log('Connected Kafka successfully.');
  } catch (err) {
    console.error('failed to setup app services.');
    throw err;
  }
};
