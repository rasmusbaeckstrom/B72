Hello and welcome! This is my Wordle clone game. 


### RUN THE APPLICATION: 


- Clone the repository
- Navigate to /backend
- Run `npm install`
- Run `npm start`
- App running @ [http://localhost:5080]

At the moment, the server only connects to a local MongoDB database: `mongodb://127.0.0.1:27017/highscores`


---


### API DOCUMENTATION: 


### Retrive words:
Route: `/api/words`
Method: GET
Description: Retrieves a list of words
Response: An array of word objects

Example response:

{
    "5": [
        "hello"
    ]
}


### Retrive highscores:
Route: `/highscore` 
Method: GET
Description: Retrieves a list of highscores sorted by time elapsed
Response: An array of highscore objects

Example response:

{
  settings: { numLetters: 5, allowRepetition: true },
  _id: new ObjectId('6618dcf1703dd8014beed07a'),
  playerName: 'Rasmus',
  timeElapsed: 51,
  guesses: [ 'WORLD', 'LEAVE', 'LEGAL' ],
   __v: 0
}


### Submit highscore: 
Route: `/api/highscores`
Method: POST
Description: Submits a new highscore
Request: JSON object
Response: `201 Created` if the highscore is successfully saved
Response: `500 Internal Server Error` if there's an issue saving the highscore

Example request:

{
  "playerName": "Rasmus",
  "timeElapsed": 51,
  "guesses": ["WORLD", "LEAVE", "LEGAL"],
  "settings": {
    "numLetters": 5,
    "allowRepetition": true
  }
}