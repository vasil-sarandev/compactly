import { connectKafka } from './lib/kafka';
import { connectMongoose } from './lib/mongoose';
import { seedDatabase } from './lib/seed-database';

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
    // run seed first so it doesn't disconnect the mongo service for the application.
    await seedDatabase();
    await setupAppServices();
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
