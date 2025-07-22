import express from 'express';
import { setupAppServices } from './services/setup-services';

const port = process.env.PORT as string;

const createServerCallback = () => {
  const app = express();

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.listen(port, () => {
    return console.log(`API is listening at http://localhost:${port}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello from API');
  });
};

setupAppServices(createServerCallback);
