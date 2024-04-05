import express from "express";
import fs from 'fs/promises';
import words from './src/words.js'
import mongoose from "mongoose";
import { Result } from "./src/models.js";

mongoose.connect('mongodb://localhost:27017/highscores');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');
  res.type('html').send(html);
});

app.get('/api/words', (req, res) => {
  res.json(words);
});

app.get('/api/highscores', async (req, res) => {
  const results = await Result.find();
  res.json({ results });
});

app.post('/api/highscores', async (req, res) => {
  const highscoreData = req.body
  console.log(req.body);

  const highscoreModel = new Result(highscoreData);
  await highscoreModel.save();

  res.status(201).json(highscoreData);
});

app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
