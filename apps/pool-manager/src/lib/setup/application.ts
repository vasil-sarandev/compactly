import { seedDatabase } from './seed-database';
import { setupAppServices } from './services';

export const setupApplication = async () => {
  try {
    await Promise.all([setupAppServices(), seedDatabase()]);
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
