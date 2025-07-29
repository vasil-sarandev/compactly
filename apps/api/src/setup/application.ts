import { seedDatabase } from './seed-database';
import { setupAppServices } from './services';

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
