import { connectMongoose } from '../services/mongoose';
import { connectKafka } from '@/services/kafka';

export const setupAppServices = async () => {
  try {
    // add additional services here
    await Promise.all([connectMongoose(), connectKafka()]);
    console.log('Connected Mongo successfully.');
    console.log('Connected Kafka successfully.');
  } catch (err) {
    console.error('failed to setup app services.');
    throw err;
  }
};
