import { setupApplication } from './setup-app';

const startApplication = async () => {
  await setupApplication();

  console.log('Pool manager is running and waiting for messages.');
};

startApplication();
