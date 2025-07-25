import express from 'express';
import { PORT } from './env-constants';
import { appRouter } from './components/app-router';
import { errorMiddleware } from './middlewares/error';
import { loggerMiddleware } from './middlewares/logger';
import { setupApplication } from '@/setup';

const startServer = async () => {
  await setupApplication();

  const app = express();

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.use(loggerMiddleware);
  app.use(appRouter);
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    return console.log(`API is listening at http://localhost:${PORT}`);
  });
};

startServer();
