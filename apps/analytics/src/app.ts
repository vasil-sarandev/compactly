import express from 'express';

const PORT = 3000;

const app = express();

// parse jsons
app.use(express.json());
// parse forms
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  return console.log(`Analytics is listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from Analytics');
});
