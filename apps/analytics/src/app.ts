import { setupApplication } from '@/setup';

const startApplication = async () => {
  await setupApplication();

  console.log('Analytics is running and waiting for messages');
};

startApplication();
