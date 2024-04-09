import React from "react";

function FeedbackResult({ guesses }) {
  return (
    <div>
      <h2>Feedback</h2>
      <ul>
        {guesses.map((guess, guessIndex) => (
          <li key={guessIndex}>
            {guess.guess.split("").map((letter, letterIndex) => {
              let className;
              switch (guess.feedback[letterIndex].result) {
                case "correct":
                  className = "correct";
                  break;
                case "misplaced":
                  className = "misplaced";
                  break;
                default:
                  className = "incorrect";
              }
              return (
                <span key={letterIndex} className={className}>
                  {letter}
                </span>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackResult;
