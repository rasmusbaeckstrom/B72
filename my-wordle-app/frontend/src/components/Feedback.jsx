export default function feedback(chosenWord, guessWord, allowRepetition = false) {

  const feedbackArray = [];

  const chosenWordMap = new Map();
  const guessWordMap = new Map();

  for (let i = 0; i < chosenWord.length; i++) {
    const letter = chosenWord[i];
    if (!chosenWordMap.has(letter)) {
      chosenWordMap.set(letter, []);
    }
    chosenWordMap.get(letter).push(i);
  }

  for (let i = 0; i < guessWord.length; i++) {
    const letter = guessWord[i];
    if (!guessWordMap.has(letter)) {
      guessWordMap.set(letter, []);
    }
    guessWordMap.get(letter).push(i);
  }

  for (let i = 0; i < guessWord.length; i++) {
    const letter = guessWord[i];
    if (chosenWordMap.has(letter)) {
      const positionsInchosenWord = chosenWordMap.get(letter);
      const positionsInguessWord = guessWordMap.get(letter);
      if (positionsInchosenWord.includes(i)) {
        feedbackArray.push({ letter: letter, result: "correct" });
      } else if (!allowRepetition && positionsInguessWord.length > 1) 
        {
        feedbackArray.push({ letter: letter, result: "incorrect" });
      } else if (
        positionsInchosenWord.some((pos) => !positionsInguessWord.includes(pos))
      ) {
        feedbackArray.push({ letter: letter, result: "misplaced" });
      } else {
        feedbackArray.push({ letter: letter, result: "incorrect" });
      }
    } else {
      feedbackArray.push({ letter: letter, result: "incorrect" });
    }
  }
  return feedbackArray;
}
