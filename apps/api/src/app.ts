import express from 'express';
import { setupWithMongoose } from './lib/mongoose';

const PORT = 3000;

const setupServer = () => {
  const app = express();

  // parse jsons
  app.use(express.json());
  // parse forms
  app.use(express.urlencoded({ extended: true }));

  app.listen(PORT, '0.0.0.0', () => {
    return console.log(`API is listening at http://localhost:${PORT}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello from API');
  });
};

setupWithMongoose(setupServer);
