import { seedDatabase } from './seed-database';
import { setupAppServices } from './services';

export const setupApplication = async (createServerCallback: () => void) => {
  try {
    await Promise.all([setupAppServices(), seedDatabase()]);
    createServerCallback();
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
