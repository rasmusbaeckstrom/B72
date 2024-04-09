// Function that takes chosen and guessed word as parameters
export default function FeedbackAlgorithm(chosenWord, guessWord) {
  
  // Declare a feedback array
  const feedbackArray = [];

  // Declare two maps, one for chosen word and one for guessed
  const chosenWordMap = new Map();
  const guessWordMap = new Map();

  // Fills the map for chosen word
  for (let i = 0; i < chosenWord.length; i++) {
    const letter = chosenWord[i];
    if (!chosenWordMap.has(letter)) {
      chosenWordMap.set(letter, []);
    }
    chosenWordMap.get(letter).push(i);
  }

  // Fills the map for guessed word
  for (let i = 0; i < guessWord.length; i++) {
    const letter = guessWord[i];
    if (!guessWordMap.has(letter)) {
      guessWordMap.set(letter, []);
    }
    guessWordMap.get(letter).push(i);
  }

  // Keep track of misplaced counts
  const misplacedCount = new Map();

  // Loops through guessed word to provide feedback
  for (let i = 0; i < guessWord.length; i++) {
    const letter = guessWord[i];
    if (chosenWordMap.has(letter)) {
      const positionsInChosenWord = chosenWordMap.get(letter);
      const positionsInGuessWord = guessWordMap.get(letter);
      if (positionsInChosenWord.includes(i)) {
        feedbackArray.push({ letter: letter, result: "correct" });
      } else if (
        positionsInChosenWord.some((pos) => !positionsInGuessWord.includes(pos))
      ) {
        if (!misplacedCount.has(letter)) {
          misplacedCount.set(letter, 0);
        }
        if (misplacedCount.get(letter) < positionsInChosenWord.length) {
          feedbackArray.push({ letter: letter, result: "misplaced" });
          misplacedCount.set(letter, misplacedCount.get(letter) + 1);
        } else {
          feedbackArray.push({ letter: letter, result: "incorrect" });
        }
      } else {
        feedbackArray.push({ letter: letter, result: "incorrect" });
      }
    } else {
      feedbackArray.push({ letter: letter, result: "incorrect" });
    }
  }
  return feedbackArray;
}
