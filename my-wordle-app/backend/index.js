import express from "express";
import words from './src/words.js'
import mongoose from "mongoose";
import { highscoreResult } from "./src/models.js";
import { engine } from 'express-handlebars';

mongoose.connect('mongodb://127.0.0.1:27017/highscores').
  catch(error => handleError(error));

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/highscores');
} catch (error) {
  handleError(error);
}

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use(express.json());

app.use((req, res, next) => {
  res.locals.menuItems = [
    { name: 'Game', link: '/', active: req.path === '/' },
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
  try {
    const highscores = await highscoreResult.find().sort({ timeElapsed: 1 });
    res.render('highscore', { highscores });
  } catch (error) {
    console.error("An error occurred while fetching highscores:", error);
    res.render('highscore-error');
  }
});

app.get('/api/words', (req, res) => {
  res.json(words);
});

app.post('/api/highscores', async (req, res) => {
  try {
    const highscoreData = req.body;
    const highscoreModel = new highscoreResult(highscoreData);
    await highscoreModel.save();
    res.sendStatus(201);
  } catch (error) {
    console.error("An error occurred while saving highscore:", error);
    res.sendStatus(500);
  }
});


app.use('/assets', express.static('../frontend/dist/assets'));

app.listen(5080);
