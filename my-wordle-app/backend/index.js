import express from "express";
import fs from 'fs/promises';
import words from './src/words.js'

const app = express();

app.use(express.json());

const highscore = [];

app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');
  res.type('html').send(html);
});

app.get('/api/words', (req, res) => {
  res.json(words);
});

app.get('/api/highscore', (req, res) => {
  res.json({ highscore });
});

app.post('/api/highscore', (req, res) => {
  const newScore = req.body;
  highscore.push(newScore);
  res.status(201).send("Highscore added :)");
});

app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
