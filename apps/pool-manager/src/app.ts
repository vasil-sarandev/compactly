import express from 'express';

const port = process.env.PORT as string;

const app = express();

// parse jsons
app.use(express.json());
// parse forms
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  return console.log(`Pool manager is listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello from Pool Manager');
});
