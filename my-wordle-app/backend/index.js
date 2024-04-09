import express from "express";
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

app.use((req, res, next) => {
  res.locals.menuItems = [
    { name: 'Home', link: '/', active: req.path === '/' },
    { name: 'About', link: '/about', active: req.path === '/about' },
    { name: 'Highscores', link: '/highscore', active: req.path === '/highscore' },
  ];
  next();
});

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

app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
