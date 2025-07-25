import express from 'express';
import { PORT } from './env-constants';
import { setupApplication } from '@/lib/setup';

const startServer = async () => {
  await setupApplication();

  const app = express();

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    return console.log(`Pool Manager is listening at http://localhost:${PORT}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello from Pool Manager');
  });
};

startServer();
