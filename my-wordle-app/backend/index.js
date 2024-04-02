import express from "express";

const app = express();

app.use(express.json());

const words = [];
const highscore = [];

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/words', (req, res) => {
  res.json({ words });
});

app.get('/api/highscore', (req, res) => {
  res.json({ highscore });
});

app.post('/api/highscore', (req, res) => {
  const newScore = req.body;
  highscore.push(newScore);
  res.status(201).send("Highscore added :)");
});

app.listen(5080);
