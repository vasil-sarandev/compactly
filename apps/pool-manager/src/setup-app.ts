import { connectKafka } from './lib/kafka/kafka.index';
import { connectMongoose } from './lib/mongoose/mongoose.index';

const setupAppServices = async () => {
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

export const setupApplication = async () => {
  try {
    await setupAppServices();
    // add more setup steps here if you need to
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
