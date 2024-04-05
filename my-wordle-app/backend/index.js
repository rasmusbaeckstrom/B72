import express from "express";
//import fs from 'fs/promises';
import words from './src/words.js'
import mongoose from "mongoose";
import { highscoreResult } from "./src/models.js";
import { engine } from 'express-handlebars';

mongoose.connect('mongodb://localhost:27017/highscores');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/highscore', async (req, res) => {
  const highscores = await highscoreResult.find().sort({ timeElapsed: 1 });
    console.log(highscores);
    res.render('highscore', { highscores });
});

/*app.get('/', async (req, res) => {
  const html = await fs.readFile('../frontend/dist/index.html');
  res.type('html').send(html);
});*/

app.get('/api/words', (req, res) => {
  res.json(words);
});

app.post('/api/highscores', async (req, res) => {
  const highscoreData = req.body
  console.log(req.body);

  const highscoreModel = new highscoreResult(highscoreData);
  await highscoreModel.save();

  res.status(201).json(highscoreData);
});

//app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
