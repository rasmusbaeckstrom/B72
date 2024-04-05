import mongoose from "mongoose";

const highscoreResult = mongoose.model('highscoreResult', {
  playerName: String,
  timeElapsed: Number,
  guesses: Array,
  settings: {
    numLetters: Number,
    allowRepetition: Boolean,
  }
});

export { highscoreResult };
