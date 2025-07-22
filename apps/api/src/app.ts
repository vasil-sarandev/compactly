import express from 'express';
import { setupWithMongoose } from './lib/mongoose';

const port = process.env.PORT as string;

const setupServer = () => {
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

setupWithMongoose(setupServer);
