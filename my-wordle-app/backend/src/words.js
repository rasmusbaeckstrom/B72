import fs from 'fs';

//https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/
const wordList = fs.readFileSync('./src/words.txt', 'utf8').split('\n');

const words = {
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
  "9": [],
  "10": []
};

for (const word of wordList) {
  const length = word.length;
  if (length >= 3 && length <= 10) {
    words[length].push(word.trim());
  }
}

export default words;
