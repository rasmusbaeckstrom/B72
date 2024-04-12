import React, { useState, useEffect } from "react";
import LetterCountSelector from "./components/LetterCountSelector";
import RepetitionSelector from "./components/RepetitionSelector";
import FeedbackAlgorithm from "./components/FeedbackAlgorithm";
import FeedbackResult from "./components/FeedbackResult";
import handleHighscoreSubmit from "./components/HandleHighscoreSubmit";
import "./components/styles.css";

function App() {
  const [numLetters, setNumLetters] = useState("5");
  const [allowRepetition, setAllowRepetition] = useState(true);
  const [allowSameWordGuess, setAllowSameWordGuess] = useState(false);
  const [guess, setGuess] = useState("");
  const [words, setWords] = useState({});
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [randomWord, setRandomWord] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [highscoreSubmitted, setHighscoreSubmitted] = useState(false);

  useEffect(() => {
    async function loadItems() {
      const response = await fetch("/api/words");
      const payload = await response.json();
      setWords(payload);
    }

    loadItems();
  }, []);

  function handleLettersChange(letters) {
    setNumLetters(letters);
    setGameStarted(false);
    setPreviousGuesses([]);
  }

  function handleRepetitionChange(allow) {
    setAllowRepetition(allow);
    setGameStarted(false);
    setPreviousGuesses([]);
  }

  function getRandomWord() {
    const wordList = words[numLetters] || [];
    const filteredWords = allowRepetition
      ? wordList
      : wordList.filter((word) => new Set(word).size === word.length);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  }

  function handleStartGame() {
    const newRandomWord = getRandomWord();
    setRandomWord(newRandomWord);
    setGameStarted(true);
    setTimer(0);
    setPreviousGuesses([]);
    setGameWon(false);
    setGuess("");
    setHighscoreSubmitted(false);
    setPlayerName("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !allowSameWordGuess &&
      previousGuesses.some(
        (previousGuess) => previousGuess.guess === guess.toUpperCase()
      )
    ) {
      alert("You've already guessed this word.");
      return;
    }

    if (guess.length !== parseInt(numLetters)) {
      alert(`Please enter a ${numLetters}-letter word.`);
      return;
    }

    const result = FeedbackAlgorithm(
      randomWord?.toUpperCase(),
      guess.toUpperCase()
    );

    if (result.every((feedback) => feedback.result === "correct")) {
      setGameWon(true);
    }

    setPreviousGuesses((prevGuesses) => [
      ...prevGuesses,
      { guess: guess.toUpperCase(), feedback: result },
    ]);
    setGuess("");
  }

  function handleGuessChange(e) {
    setGuess(e.target.value);
  }

  useEffect(() => {
    let intervalId;
    if (gameStarted && !gameWon) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [gameStarted, gameWon]);

  return (
    <div className="container d-flex justify-content-center vh-100">
      <div className="App text-center">
        <div className="mb-3">
          <LetterCountSelector
            value={numLetters}
            onChange={handleLettersChange}
          />
          <RepetitionSelector
            value={allowRepetition}
            onChange={handleRepetitionChange}
          />
        </div>
        <div className="row">
          <div className="col mb-3">
            <button
              className={`btn mb-3 ${
                gameStarted ? "btn-secondary" : "btn-success"
              }`}
              onClick={handleStartGame}
            >
              Start the game!
            </button>
          </div>
          {gameStarted && (
            <div className="col mb-3">
              <p>{timer} seconds</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            value={guess}
            onChange={handleGuessChange}
            placeholder={`Enter a ${numLetters}-letter word`}
            disabled={!gameStarted}
          />
          <button
            type="submit"
            className={`btn ${gameStarted ? "btn-success" : "btn-danger"} mb-3`}
            disabled={!gameStarted || gameWon}
          >
            Guess
          </button>
        </form>
        <FeedbackResult guesses={previousGuesses} />
        {gameWon && !highscoreSubmitted && (
          <div>
            <h2>Correct answer!</h2>
            <form
              onSubmit={(e) =>
                handleHighscoreSubmit(
                  e,
                  playerName,
                  timer,
                  previousGuesses,
                  numLetters,
                  allowRepetition,
                  setHighscoreSubmitted,
                  setGameStarted,
                  setPreviousGuesses
                )
              }
            >
              <input
                required
                type="text"
                className="form-control mb-3"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
              />
              <button type="submit" className="btn btn-primary mb-3">
                Submit Highscore
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
