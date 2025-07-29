import { setupApplication } from './setup-app';

const startApplication = async () => {
  await setupApplication();

  console.log('Analytics is running and waiting for messages');
};

startApplication();
