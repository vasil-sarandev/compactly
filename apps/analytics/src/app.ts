import express from 'express';

const PORT = 3001;

const app = express();

// parse jsons
app.use(express.json());
// parse forms
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, '0.0.0.0', () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from Analytics');
});
