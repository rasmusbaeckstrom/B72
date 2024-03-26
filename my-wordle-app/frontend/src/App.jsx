import React, { useState, useEffect } from 'react';
import LetterCountSelector from './components/LetterCountSelector';
import RepetitionSelector from './components/RepetitionSelector';
import feedback from './components/Feedback';
import wordsData from './components/words.json';

function App() {
  const [numLetters, setNumLetters] = useState('5'); 
  const [allowRepetition, setAllowRepetition] = useState(true); 
  const [allowSameWordGuess, setAllowSameWordGuess] = useState(false); 
  const [guess, setGuess] = useState(''); 
  const [feedbackResult, setFeedbackResult] = useState([]);
  const [words, setWords] = useState({});
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [randomWord, setRandomWord] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  //api fetch här sen...
  useEffect(() => {
    setWords(wordsData);
  }, []);

  const handleLettersChange = (letters) => {
    setNumLetters(letters);
  };

  const handleRepetitionChange = (allow) => {
    setAllowRepetition(allow);
  };

  const getRandomWord = () => {
    const wordList = words[numLetters] || [];
    const filteredWords = allowRepetition ? wordList : wordList.filter(word => new Set(word).size === word.length);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  };

  const handleStartGame = () => {
    const newRandomWord = getRandomWord();
    setRandomWord(newRandomWord);
    // visa det slumpade ordet, ta bort sen... 
    console.log("Slumpat ord:", newRandomWord);
    setGameStarted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!allowSameWordGuess && previousGuesses.includes(guess.toUpperCase())) {
      alert("You've already guessed this word.");
      return;
    }

    if (guess.length !== parseInt(numLetters)) {
      alert(`Please enter a ${numLetters}-letter word.`);
      return;
    }

    const result = feedback(randomWord?.toUpperCase(), guess.toUpperCase());
    setFeedbackResult(result);

    setPreviousGuesses(prevGuesses => [...prevGuesses, guess.toUpperCase()]);
  };

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };
  
  return (
    <div className="App">
      <h1>Welcome to Wordle!</h1>
        <>
          <LetterCountSelector value={numLetters} onChange={handleLettersChange} />
          <RepetitionSelector value={allowRepetition} onChange={handleRepetitionChange} />
          <button onClick={handleStartGame}>Start the game!</button>
        </>
        <form onSubmit={handleSubmit}>
          <input type="text" value={guess} onChange={handleGuessChange} placeholder={`Enter a ${numLetters}-letter word`} />
          <button type="submit">Guess</button>
        </form>
        <div>
          <h2>Feedback</h2>
          <ul>
            {feedbackResult.map((item, index) => (
              <li key={index}>{item.letter}: {item.result}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default App;
