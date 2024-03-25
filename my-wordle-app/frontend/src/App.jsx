import React, { useState } from 'react';
import LetterCountSelector from './components/LetterCountSelector';
import RepetitionSelector from './components/RepetitionSelector';
import feedback from './components/Feedback';

function App() {
  const [numLetters, setNumLetters] = useState('5'); 
  const [allowRepetition, setAllowRepetition] = useState(true); 
  const [guess, setGuess] = useState(''); 
  const [feedbackResult, setFeedbackResult] = useState([]);

  const words = {
    3: "dog",
    4: "rain",
    5: "cloud",
    6: "banana",
    7: "holiday",
    8: "birthday",
    9: "happiness",
    10: "watermelon"
  };

  const handleLettersChange = (letters) => {
    setNumLetters(letters);
  };

  const handleRepetitionChange = (allow) => {
    setAllowRepetition(allow);
  };

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (guess.length !== parseInt(numLetters)) {
      alert(`Please enter a ${numLetters}-letter word.`);
      return;
    }
  
    if (!allowRepetition) {
      const uniqueLetters = new Set(guess.toUpperCase());
      if (uniqueLetters.size !== guess.length) {
        alert("Please enter a word without repetition of letters.");
        return;
      }
    }
  
    const result = feedback(words[numLetters].toUpperCase(), guess.toUpperCase());
    setFeedbackResult(result);
  };
  
  return (
    <div className="App">
      <h1>Welcome to Wordle!</h1>
      <form onSubmit={handleSubmit}>
        <LetterCountSelector value={numLetters} onChange={handleLettersChange} />
        <RepetitionSelector value={allowRepetition} onChange={handleRepetitionChange} />
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
