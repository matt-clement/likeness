import React from 'react';
import _ from 'lodash';

const previousGuesses = (guesses) => {
  return (
    <ul id="previous-guesses" className="guess-list">
      {_.map(guesses, (guessData) => {
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

export default GuessList;
