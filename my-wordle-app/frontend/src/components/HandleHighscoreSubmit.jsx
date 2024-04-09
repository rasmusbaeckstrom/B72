export default function handleHighscoreSubmit(
  e,
  playerName,
  timer,
  previousGuesses,
  numLetters,
  allowRepetition,
  setHighscoreSubmitted,
  setGameStarted,
  setPreviousGuesses
) {
  e.preventDefault();

  const data = {
    playerName: playerName,
    timeElapsed: timer,
    guesses: previousGuesses.map((guess) => guess.guess),
    settings: {
      numLetters: numLetters,
      allowRepetition: allowRepetition,
    },
  };

  fetch("/api/highscores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Highscore submitted");
        setHighscoreSubmitted(true);
        setGameStarted(false);
        setPreviousGuesses([]);
      } else {
        console.error("Failed to submit");
      }
    })
    .catch((error) => {
      console.error("Error submitting highscore:", error);
    });
}
