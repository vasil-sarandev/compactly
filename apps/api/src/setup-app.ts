import { connectKafka } from './lib/kafka';
import { connectMongoose } from './lib/mongoose';
import { connectRedis } from './lib/redis';

const setupAppServices = async () => {
  try {
    // add additional services here
    await Promise.all([connectMongoose(), connectKafka(), connectRedis()]);
    console.log('Connected Mongo successfully.');
    console.log('Connected Kafka successfully.');
    console.log('Connected Redis successfully.');
  } catch (err) {
    console.error('failed to setup app services.');
    throw err;
  }
};

export const setupApplication = async () => {
  try {
    await setupAppServices();
    // add more setup steps here if you need to
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
