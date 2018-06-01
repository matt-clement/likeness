import React from 'react';

const previousGuesses = (guesses) => {
  return (
    <ul id="previous-guesses" className="guess-list">
      {guesses.map((guessData) => {
        let guessWord = guessData.word;
        let likeness = guessData.likeness;
        let entry = likeness == guessWord.length ? "Entry accepted." : "Entry denied."
        let numberCorrect = likeness + "/" + guessWord.length + " correct."
        return <li key={guessWord}>{guessWord}<br />{entry}<br />{numberCorrect}</li>
      })}
    </ul>
  );
};

const GuessList = ({ guesses, hovered }) => {
  return (
    <div id="guess-list">
      {previousGuesses(guesses)}
      <ul id="new-entry-list">
        <li id="new-entry" key="new-entry">{hovered}</li>
      </ul>
    </div>
  );
};

GuessList.defaultProps = {
  guesses: []
}

export default GuessList;
