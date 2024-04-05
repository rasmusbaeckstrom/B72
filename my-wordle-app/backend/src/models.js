import mongoose from "mongoose";

const Result = mongoose.model('Result', {
  playerName: String,
  guesses: Array,
});

export { Result };

