import React from 'react';

const previousGuess = ({word, likeness}) => {
  const accepted = likeness == word.length ? "Entry accepted." : "Entry denied.";
  const numberCorrect = `${likeness}/${word.length} correct.`;
  return <li key={word}>{word}<br />{accepted}<br />{numberCorrect}</li>;
}

const previousGuesses = (guesses) => {
  return (
    <ul id="previous-guesses" className="guess-list">
      {guesses.map(previousGuess)}
    </ul>
  );
};

const newEntry = (entry) => {
  return (
    <ul id="new-entry-list">
      <li id="new-entry" key="new-entry">{entry}</li>
    </ul>
  );
}

const GuessList = ({ guesses, hovered, renderGuesses, renderNewEntry}) => {
  return (
    <div id="guess-list">
      {renderGuesses(guesses)}
      {renderNewEntry(hovered)}
    </div>
  );
};

GuessList.defaultProps = {
  guesses: [],
  renderGuesses: previousGuesses,
  renderNewEntry: newEntry,
}

export default GuessList;
