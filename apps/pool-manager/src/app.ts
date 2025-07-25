import { setupApplication } from '@/setup';

const startApplication = async () => {
  await setupApplication();

  console.log('Pool manager is running and waiting for messages.');
};

startApplication();
