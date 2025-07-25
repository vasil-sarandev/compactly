import { setupAppServices } from './services';

export const setupApplication = async () => {
  try {
    // add more async logic here if needed for application setup.
    await Promise.all([setupAppServices()]);
  } catch (e) {
    console.error('failed to setup application.');
    throw e;
  }
};
